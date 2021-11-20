import "./post_content.css"
import { React, useEffect, useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import Link from '@material-ui/core/Link';
import { rtdb, db } from "../../firebase.js"
import { doc, getDoc, updateDoc, onSnapshot, addDoc, collection } from "@firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { update, child, ref, push, onValue, onChildAdded, query, get } from "@firebase/database";
import UserComment from "../post_comment/post_comment";
/**
 * @author Rvvse
 * @param {{
 *  link: string
 *  backgroundColor: string
 *  postingTime: number
 *  content: string
 *  hashTags: Array<string>
 *  moodyPart: {
 *      symbol: string
 *      string: string
 *  }
 *  userId: string
 * }} props 
 */

function getVidID(link) {
    var vidId = "";
    if(link[13]=='.'){
        for(var index = 17;index<17+11;index++){
            vidId += link[index]
        }
    }
    else{
        for(var index = 32; index<32+11; index++){
            vidId += link[index];
        }
    }
    return vidId;
}


export function writeComment() {

}


function PostContent(props) {
    const {
        link,
        backgroundColor = '',
        postingTime = '',
        content,
        hashTags = [],
        moodyPart,
        userId,
        postId,
        userName,
        comment,
        isPreview = false,
    } = props
    

    const isQuestion = link == undefined;
    const [curComment, setCurComment] = useState("");
    const [isChosen, setChose] = useState(false);
    const [numShownComment, setNumComment] = useState(0);

    const { currentUser } = useAuth();
    const [user, setUser] = useState({});

    const [postComment, setPostComment] = useState([]);
    const [postCommentUI, setPostCommentUI] = useState([]);
    const [showComment, setShowComment] = useState(false);
    const commentRef = useRef();

    const postRef = postId != undefined ? doc(db, isQuestion ?  "questions" : "posts", postId) : "";
    const userRef = doc(db, "users", currentUser.uid);

    const cmtRef = ref(rtdb, 'comments/' + postId);
    const postCmtPath = ((isQuestion ? "questions" : "posts") + "/" + postId + "/comments");

    
    var date = new Date(postingTime);
    date = date.toString();
    var hour = date.slice(15,21);
    var strDate = date.slice(3,16);
    strDate = hour + "," + strDate;

    useEffect(() => {
        const getUser = async () => {
            const data = await getDoc(userRef);
            setUser(data.data());
        }
        const getPost = postRef != "" ? async () => {
            const data = await getDoc(postRef);
            setPostComment(data.data().comment);
        } : () => {}
        const postCmtRef = collection(db, postCmtPath);
        onSnapshot(postCmtRef, (snapshot) => {
            const lstCmt = snapshot.docs.map((doc) => {
                return {id: doc.id, data: doc.data()};
            });
            lstCmt.sort((a,b) => {
                if(a.data.createdAt > b.data.createdAt) {
                    return 1;
                } else {
                    return -1;
                }
            });
            const lstCmtUI = lstCmt.map((data) => {
                return <UserComment
                    userName = {data.data.author}
                    content = {data.data.content}
                    createdAt = {data.data.createdAt}
                    isQuestion = {isQuestion}
                    cmtId = {data.id}
                    postId = {postId}
                />
            });
            setPostCommentUI(lstCmtUI);
        });
        getPost();
        getUser();
    }, [])

    function onClickComment(isShow) {
        if(isShow == false) {
            setShowComment(false);
            setNumComment(0);
            return;
        } 
        setShowComment(true);
        console.log(Math.min(numShownComment + 10, postCommentUI.length));
        setNumComment(Math.min(numShownComment + 10, postCommentUI.length));
    }

    function resetComment() {
        if(isChosen == false) {
            console.log("resetComment");
            setChose(true);
            setCurComment("");
        }
    }

    function updateComment(event) {
        setCurComment(event.target.value);
    }

    async function keyDown(event) {
        if(event.keyCode == 13) {
            console.log("enter");
            event.preventDefault();
            if(curComment == ""){
                return;
            }
            const commentData = {
                author: user.username,
                content: curComment,
                createdAt: Date.now(),
                type: "text",
            }

            commentRef.current.value = "";
            resetComment();

            
            const postCmtRef = collection(db, postCmtPath);
            const newCmtRef =  await addDoc(postCmtRef, commentData);
            
        }
    }





	var vidId = "";
	if(link != undefined) {
        vidId = getVidID(link);
    }
    vidId = "https://www.youtube.com/embed/" + vidId
    return (
        <div className="post_content" style={{ backgroundColor: backgroundColor }}>
            <div className="post_header">
                <div className="user_id">{userName}</div>
                <div className="date">{strDate}</div>
            </div>
            <div className="post_text">{content}</div>
            {
                isQuestion == false ? <iframe width="560" height="315" src={vidId} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> : <div/>
            }
            <div className="status">
                {
                    moodyPart == undefined ? <div></div>
                    : <button className="moody_part" style = {{backgroundColor: moodyPart == null ? "transparent" : moodyPart.moodColor}}>
                        <div className="symbol">{moodyPart?.moodSymbol}</div>
                        <div className="string">{moodyPart?.moodContent}</div>
                    </button>
                }
                {hashTags.map(item => (
                    <button className="hash_tag" key={item}>{"#" + item}</button>
                ))}
            </div>

            {
                isPreview != false ? <div/>
                : <div style = {{marginTop: 10}}>
                    <div style = {{display: "flex", flexDirection: "row"}}>
                        <div className = "comment_text_field">
                            <Form.Control
                                placeholder = "add your comment to the post"
                                ref = {commentRef}
                                onSelect = {() => {resetComment()}}
                                onKeyDown = {(event) => {keyDown(event)}}
                                onChange = {(event) => {updateComment(event)}}
                            />
                        </div>
                    </div>
                    <div style = {{marginTop: 10}}>
                    {
                        postCommentUI.length > 0
                        ? (numShownComment == 0 && showComment == false)
                            ? <Link style = {{color: "black", cursor: "pointer", textDecoration: "underline"}} onClick = {(event) => {
                                event.preventDefault();
                                onClickComment(true)}}>Show comments</Link>
                            : <div>
                                {postCommentUI.slice(0, numShownComment)}
                                <Link style = {{color: "black", cursor: "pointer", textDecoration: "underline"}} onClick = {(event) => {
                                    event.preventDefault();
                                    onClickComment(numShownComment == postCommentUI.length ? false : true)
                                }}>{numShownComment == postCommentUI.length ? "Show Less" : "View more"}</Link>
                            </div> 
                        : <div/>
                    }
                    </div>
                </div>
            }
        </div>
    )
}

export default PostContent

