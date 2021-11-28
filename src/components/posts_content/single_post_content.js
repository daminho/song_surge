import React, {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import { db } from "../../firebase.js"
import { doc, getDoc, onSnapshot, addDoc, collection } from "@firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import PostContent from "./post_content.js";
import {MOODY} from "../constant/moods"
import AppNavBar from "../constant/web_bar.js";


export default function SinglePost () {

    const location = useLocation();
    const state = location.state;
    console.log(state);
    const { currentUser } = useAuth();
    const [user, setUser] = useState({});
    const [numGen, setNumGen] = useState(0);
    const [post, setPost] = useState();
    useEffect(() => {
        const userRef = doc(db, "users", currentUser.uid);
        const postRef = doc(db, (state.isQuestion ? "questions" : "posts"), state.postId);
        const getUser = async () => {
            const data = await getDoc(userRef);
            console.log(data.data());
            setUser(data.data());
        }
        const getPost = async () => {
            const data = await getDoc(postRef);
            const postData = data.data();
            const postUI = <PostContent 
                postId = {state.postId}
                link = {postData.songLink}
                backgroundColor = {postData.color}
                content = {postData.content}
                hashTags = {postData.hashTags}
                moodyPart = {MOODY[postData.moody]}
                userId = {postData.userId}
                userName = {postData.userName}
                postingTime = {postData.postingTime}
                isPost = {!state.isQuestion}
            />
            setPost(postUI);
        }
        getUser();
        getPost();
    }, [numGen]);

    return (
        <div>
            <AppNavBar nameAppBar = "SongSurge"/>
            <div style = {{display: "flex", justifyContent: "center", marginTop: 100}}>
                {post}
            </div>
        </div>
    );
}