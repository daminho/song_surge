import {React, useState, useEffect} from "react";
import {useAuth} from "../../context/AuthContext.js";
import {db, auth} from "../../firebase.js";
import { useLocation, useNavigate } from "react-router-dom";
import AppNavBar from "../constant/web_bar.js";
import { getDocs, collection, doc, docs} from "@firebase/firestore";
import PostContent from "../posts_content/post_content.js";
import Option from "../side_info/options.js";
import "./song_surge_search.css";
import { MOODY } from "../constant/moods.js";
import Filter from "../side_info/filter.js";

export default function SongSurgeSearch(props) {

    const {currentUser} = useAuth();
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const postsRef = collection(db, "questions");
    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postsRef);
            const listPost = data.docs.map((doc) => {
                const docData = doc.data();
                console.log(docData.moody);
                return  <div style = {{width: "fit-content", marginRight: 50, marginLeft: 30}}>
                    <PostContent 
                    postId = {doc.id}
                    link = {docData.songLink}
                    backgroundColor = {docData.color}
                    content = {docData.content}
                    hashTags = {docData.hashTags}
                    moodyPart = {MOODY[docData.moody]}
                    userId = {docData.userId}
                    userName = {docData.userName}
                    postingTime = {docData.postingTime.seconds}
                    isPost = {false}/>
                </div>;
            });
            setPosts(listPost);
        }

        getPosts();
    }, [])

    return (
        <div>
            <AppNavBar nameAppBar = "iSongSurgeSearch" isShare = {false}/>
            <div className = "content">
                <div>
                    <Filter/>
                </div>
                <div>
                    {posts}
                </div>
                <div>
                    <Option/>
                </div>
            </div>
        </div>
    );

}