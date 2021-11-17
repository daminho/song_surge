import {React, useState, useEffect} from "react";
import {useAuth} from "../../context/AuthContext.js";
import {db, auth} from "../../firebase.js";
import { useLocation, useNavigate } from "react-router-dom";
import AppNavBar from "../constant/web_bar.js";
import { getDocs, collection, doc, docs} from "@firebase/firestore";
import PostContent from "../posts_content/post_content.js";
import "./song_surge_share.css";

export default function SongSurgeShare(props) {

    const {currentUser} = useAuth();
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const postsRef = collection(db, "posts");
    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postsRef);
            const listPost = data.docs.map((doc) => {
                const docData = doc.data();
                return <PostContent 
                    link = {docData.songLink}
                    backgroundColor = {docData.color}
                    content = {docData.content}
                    hashTags = {docData.hashTags}
                    moodyPart = {docData.moody}
                    userId = {docData.userId}
                    userName = {docData.userName}
                />;
            });
            setPosts(listPost);
        }

        getPosts();
    }, [])

    return (
        <div>
            <AppNavBar nameAppBar = "SongSurgeShare"/>
            <div style = {{display: "flex", flexDirection: "row"}}>
                <div style = {{width: 1200}}>
                    {posts}
                </div>
                <div>

                </div>
            </div>
        </div>
    );

}