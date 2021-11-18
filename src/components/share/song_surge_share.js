import {React, useState, useEffect} from "react";
import {useAuth} from "../../context/AuthContext.js";
import {db, auth} from "../../firebase.js";
import { useLocation, useNavigate } from "react-router-dom";
import AppNavBar from "../constant/web_bar.js";
import { getDocs, collection, doc, docs} from "@firebase/firestore";
import PostContent from "../posts_content/post_content.js";
import Option from "../side_info/options.js";
import "./song_surge_share.css";
import { MOODY } from "../constant/moods.js";

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
                console.log(docData.moody);
                return <div style = {{width: "fit-content", marginLeft: 250}}>
                    <PostContent 
                    link = {docData.songLink}
                    backgroundColor = {docData.color}
                    content = {docData.content}
                    hashTags = {docData.hashTags}
                    moodyPart = {MOODY[docData.moody]}
                    userId = {docData.userId}
                    userName = {docData.userName}
                    isPost = {true}/>
                </div>;
            });
            setPosts(listPost);
        }

        getPosts();
    }, [])

    return (
        <div>
            <AppNavBar nameAppBar = "iSongSurgeShare"/>
            <div style = {{display: "flex", flexDirection: "row"}}>
                <div style = {{width: 1050}}>
                    {posts}
                </div>
                <div>
                    <Option/>
                </div>
            </div>
        </div>
    );

}