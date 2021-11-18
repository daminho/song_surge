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
import Filter from "../side_info/filter.js";

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
                console.log(doc.id);
                console.log(docData.postingTime.seconds);
                return <div style = {{width: "fit-content", marginRight: 50, marginLeft: 30}}>
                    <PostContent 
                    postId = {doc.id}
                    link = {docData.songLink}
                    backgroundColor = {docData.color}
                    content = {docData.content}
                    hashTags = {docData.hashTags}
                    moodyPart = {MOODY[docData.moody]}
                    userId = {docData.userId}
                    userName = {docData.userName}
                    postingTime = {docData.postingTime}
                    isPost = {true}/>
                </div>;
            });
            listPost.reverse();
            setPosts(listPost);
        }

        getPosts();
    }, [])

    return (
        <div>
            <AppNavBar nameAppBar = "iSongSurgeShare"/>
            <div className = "content">
                <div>
                    <Filter/>
                </div>
                <div style = {{width: 680}}>
                    {posts}
                </div>
                <div>
                    <Option/>
                </div>
            </div>
        </div>
    );

}