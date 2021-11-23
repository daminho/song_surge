import {React, useState, useEffect} from "react";
import {useAuth} from "../../context/AuthContext.js";
import {db, auth} from "../../firebase.js";
import { useLocation, useNavigate } from "react-router-dom";
import AppNavBar from "../constant/web_bar.js";
import { getDocs, collection, doc, docs} from "@firebase/firestore";
import PostContent, { EmptyPostWithMessage } from "../posts_content/post_content.js";
import Option from "../side_info/options.js";
import "./song_surge_search.css";
import { MOODY } from "../constant/moods.js";
import Filter from "../side_info/filter.js";
import { DoorBack } from "@mui/icons-material";

export default function SongSurgeSearch(props) {

    const {currentUser} = useAuth();
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const postsRef = collection(db, "questions");
    const [moodyFilter, setMoodyFilter] = useState();
    const [hashtagFilter, setHashtagFilter] = useState();
    const [trendToday, setTrendToday] = useState([]);
    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postsRef);
            var ok = 0;
            var cntHashtag = {};
            const listPostData = data.docs.map((doc) => [doc.data(), doc.id]);
            listPostData.sort((a, b) => {
                if(a.postingTime > b.postingTime) return -1;
                else return 1;
            });
            const listPost = listPostData.map((doc) => {
                const docData = doc;
                for (var i = 0; i < docData.hashTags.length; i++) {
                    var cnt = cntHashtag[docData.hashTags[i]];
                    cnt = cnt == undefined ? 0 : cnt;
                    cntHashtag[docData.hashTags[i]]= cnt + 1;
                }

                var okHashtag = hashtagFilter == undefined;
                for (var i = 0; i < docData.hashTags.length; i++) {
                    if(docData.hashTags[i] == hashtagFilter) {
                        okHashtag = true;
                        break;
                    }
                }
                var okMoody = moodyFilter == undefined;
                if(okMoody == false && moodyFilter == docData.moody) okMoody = true;
                ok += (okHashtag && okMoody) ? 1 : 0;
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
                    isPost = {false}
                    onClickHashtag = {setHashtagFilter}
                    onClickMoody = {setMoodyFilter}/>
                </div> : <div/>;
            });
            if(ok == 0) {
                listPost.push(<div style = {{width: "fit-content", marginRight: 30, marginLeft: 30}}>
                    <EmptyPostWithMessage message = {"There is no post"}/>
                </div>);
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
            <AppNavBar nameAppBar = "iSongSurgeSearch" isShare = {false}/>
            <div className = "feed_content">
                <div style = {{ width: 400}}>
                    <Filter mood = {moodyFilter} hashtag = {hashtagFilter}
                     changeMoody = {setMoodyFilter} changeHashtag = {setHashtagFilter}/>
                </div>
                <div style = {{marginTop: 100}}>
                    {posts}
                </div>
                <div>
                    <Option hashTags = {trendToday} onClickMoody = {setMoodyFilter} search = {true} onClickHashtag = {setHashtagFilter}/>
                </div>
            </div>
        </div>
    );

}