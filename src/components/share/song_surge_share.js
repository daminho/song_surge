import {React, useState, useEffect} from "react";
import {db} from "../../firebase.js";
import AppNavBar from "../constant/web_bar.js";
import { getDocs, collection} from "@firebase/firestore";
import PostContent, { EmptyPostWithMessage } from "../posts_content/post_content.js";
import Option from "../side_info/options.js";
import "./song_surge_share.css";
import { MOODY } from "../constant/moods.js";
import Filter from "../side_info/filter.js";

export default function SongSurgeShare(props) {

    const [posts, setPosts] = useState([]);
    const postsRef = collection(db, "posts");
    const [moodyFilter, setMoodyFilter] = useState();
    const [hashtagFilter, setHashtagFilter] = useState();
    const [trendToday, setTrendToday] = useState([]);
    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postsRef);
            var ok = 0;
            var cntHashtag = [];
            const listPostData = data.docs.map((doc) => [doc.data(), doc.id]);
            listPostData.sort((a, b) => {
                if(a[0].postingTime > b[0].postingTime) return -1;
                else return 1;
            });

            const today = new Date();
            const listPost = listPostData.map((doc) => {
                const docData = doc[0];
                var postingDate = new Date(docData.postingTime);
                const isToday = (postingDate.getDate() == today.getDate() && postingDate.getMonth() == today.getMonth() && postingDate.getFullYear() == today.getFullYear());

                var okHashtag = hashtagFilter == undefined;
                for (var i = 0; i < docData.hashTags.length; i++) {
                    if(isToday == true) {
                        var cnt = cntHashtag[docData.hashTags[i]] == undefined ? 0 : cntHashtag[docData.hashTags[i]];
                        cntHashtag[docData.hashTags[i]] = cnt + 1;
                    }
                    if(docData.hashTags[i] == hashtagFilter) {
                        okHashtag = true;
                    }
                }
                var okMoody = moodyFilter == undefined;
                if(okMoody == false && moodyFilter == docData.moody) okMoody = true;
                ok += (okMoody && okHashtag) ? 1 : 0;
                return (okHashtag && okMoody) ? <div style = {{width: "fit-content", marginRight: 30, marginLeft: 30}}>
                    <PostContent 
                    postId = {doc[1]}
                    link = {docData.songLink}
                    backgroundColor = {docData.color}
                    content = {docData.content}
                    hashTags = {docData.hashTags}
                    moodyPart = {MOODY[docData.moody]}
                    userId = {docData.userId}
                    userName = {docData.userName}
                    postingTime = {docData.postingTime}
                    isPost = {true}
                    onClickHashtag = {setHashtagFilter}
                    onClickMoody = {setMoodyFilter}/>
                </div> : <div/>;
            });
            if(ok == 0) {
                listPost.push(<div style = {{width: "fit-content", marginRight: 30, marginLeft: 30}}>
                    <EmptyPostWithMessage message = {"There is no post"}/>
                </div>)
            }
            const tmp = Object.entries(cntHashtag).map(([key, value]) => {return {value, key}});
            tmp.sort((a, b) => {
                if(a.value > b.value) return -1;
                else return 1;
            });
            setTrendToday(tmp.slice(0, Math.min(5, tmp.length)).map((item) => item.key));
            setPosts(listPost);
        }

        getPosts();
    }, [moodyFilter, hashtagFilter])

    return (
        <div>
            <AppNavBar nameAppBar = "iSongSurgeShare"/>
            <div className = "feed_content">
                <div style = {{ width: 400}}>
                    <Filter mood = {moodyFilter} hashtag = {hashtagFilter}
                     changeMoody = {setMoodyFilter} changeHashtag = {setHashtagFilter}/>
                </div>
                <div style = {{marginTop: 100}}>
                    {posts}
                </div>
                <div>
                    <Option hashTags = {trendToday} onClickHashtag = {setHashtagFilter} onClickMoody = {setMoodyFilter}/>
                </div>
            </div>
        </div>
    );

}