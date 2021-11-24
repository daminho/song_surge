import { React, useEffect, useState, useRef } from "react";
import './post_comment.css';
import Link from '@material-ui/core/Link';
import { Form } from 'react-bootstrap';
import { useAuth } from "../../context/AuthContext.js";
import { getDoc, addDoc, collection, doc, docs, onSnapshot } from "@firebase/firestore";
import { db } from "../../firebase.js"; 
import MusicLink from "../comment/link";

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


function isBrightColor(hexCode) {
    var r = hexCode.slice(1, 3);
    var g = hexCode.slice(3, 5);
    var b = hexCode.slice(5, 7);
    r = parseInt(r, 16);
    g = parseInt(g, 16);
    b = parseInt(b, 16);
    return (((r * 299) + (g * 587) + (b * 114)) / 1000) > 155;
}

export default function UserComment(props) {
    const {
        userId,
        userName,
        content, 
        type,
        isReply = false,
        postId,
        createdAt,
        isQuestion,
        cmtId,
        backgroundColor
    } = props

    const { currentUser } = useAuth();
    const [user, setUser] = useState({});

    const [replyUI, setReplyUI] = useState([]);
    const [isReplyOnly, setReplyOnly] = useState(false);
    const [isShowReply, setShowReply] = useState(false);
    const [curComment, setCurComment] = useState("");
    const [isChosen, setChose] = useState(false);
    const [stateChange, setStateChange] = useState(false);
    const commentRef = useRef();

    const postRef = postId != undefined ? doc(db, isQuestion ?  "questions" : "posts", postId) : "";
    const userRef = doc(db, "users", currentUser.uid);
    const replyCmtPath =  (isQuestion ? "questions" : "posts") + "/" + postId + "/comments/" + cmtId + "/replies";

    const isBright = isBrightColor(backgroundColor);
    const textColor = isBright ? "#121212" : '#E5E5E5';


    function changeState() {
        setStateChange(true);
    }



    useEffect(() => {
        const getUser = async () => {
            const data = await getDoc(userRef);
            setUser(data.data());
        }
        const replyCmtRef = collection(db, replyCmtPath);
        onSnapshot(replyCmtRef, (snapshot) => {
            const lstCmt = snapshot.docs.map((doc) => {
                return doc.data();
            });
            lstCmt.sort((a,b) => {
                if(a.createdAt < b.createdAt) {
                    return -1;
                } else {
                    return 1;
                }
            });
            const lstCmtUI = lstCmt.map((data) => {
                return <UserComment
                    userName = {data.author}
                    content = {data.content}
                    createdAt = {data.createdAt}
                    isReply = {true}
                    type = {data.type}
                    backgroundColor = {backgroundColor}
                />
            });
            setReplyUI(lstCmtUI);
            setStateChange(false);
        });
        getUser();
    }, [stateChange])


    function resetComment() {
        if(isChosen == false) {
            setChose(true);
            setCurComment("");
        }
    }

    function updateComment(event) {
        setCurComment(event.target.value);
    }

    async function keyDown(event) {
        if(event.keyCode == 13) {
            event.preventDefault();
            if(curComment == ""){
                return;
            }
            const commentData = {
                author: user.username,
                content: curComment,
                createdAt: Date.now(),
                type: "text",
                reply: [],
            }

            commentRef.current.value = "";
            resetComment();

            setReplyOnly(false);
            setShowReply(true);

            const postCmtRef = collection(db, replyCmtPath);
            const newCmtRef =  await addDoc(postCmtRef, commentData);
            
        }
    }
    


    var date = new Date(createdAt);
    date = date.toString();
    var hour = date.slice(15,21);
    var strDate = date.slice(3,16);
    strDate = hour + "," + strDate;
    

    var cmtContent = content;
    var vidId = "";
	if(type == "link") {
        vidId = getVidID(content);
        vidId = "https://www.youtube.com/embed/" + vidId
        cmtContent = <iframe width="444" height="250" src={vidId} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>;
    }

    return(
        <div>
            <div className = "comment_body">
                <div style = {{fontSize: 12, fontWeight: "bold", color: textColor}}>{userName}</div>
                <div style = {{fontSize: 14, color: textColor}}>{cmtContent}</div>
            </div>
            <div style = {{display: "flex", flexDirection: "row", fontSize: 12, paddingLeft: 10, paddingTop: 2, color: textColor}}>
                {isReply ? <div/> : 
                <Link style = {{color: textColor, cursor: "pointer", textDecoration: "underline", fontWeight: "bold"}}
                    onClick = {(event) => {if(isShowReply == false) {setReplyOnly(true)}}}
                >Reply</Link>} {(isReply ? "" : ", ") + strDate}
            </div>
            {
                (isReply == false)
                ? <div style = {{paddingLeft: 30, flexWrap: "nowrap"}}>
                    {
                        (isShowReply || isReplyOnly)
                        ? <div>
                            {isReplyOnly ? <div/> : replyUI}
                            <div style = {{marginTop: 5}}>
                                <div style = {{display: "flex", flexDirection: "row"}}>
                                    <Form.Control
                                        placeholder = "replying..."
                                        ref = {commentRef}
                                        onSelect = {() => {resetComment()}}
                                        onKeyDown = {(event) => {keyDown(event)}}
                                        onChange = {(event) => {updateComment(event)}}
                                    />
                                    <MusicLink isQuestion = {isQuestion} postId = {postId} commentId = {cmtId} onEnter = {changeState}></MusicLink>
                                </div>
                            </div>
                        </div>
                        : (replyUI.length != 0) ? <Link style = {{color: textColor, cursor: "pointer", textDecoration: "underline", fontWeight: "bold", fontSize: 12}}
                        onClick = {(event) => {setShowReply(true)}}> {replyUI.length} {replyUI.length > 1 ? "replies" : "reply"}
                        </Link> : <div/>
                    }
                </div> : <div/>
            }
        </div>
    );

}