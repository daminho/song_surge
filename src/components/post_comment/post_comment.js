import { React, useEffect, useState, useRef } from "react";
import './post_comment.css';
import Link from '@material-ui/core/Link';
import { Form } from 'react-bootstrap';
import { useAuth } from "../../context/AuthContext.js";
import { getDoc, addDoc, collection, doc, docs, onSnapshot } from "@firebase/firestore";
import { db } from "../../firebase.js"; 



export default function UserComment(props) {
    const {
        userId,
        userName,
        content, 
        type,
        isReply = false,
        replyId,
        postId,
        createdAt,
        commentId,
        isQuestion,
        cmtId,
    } = props

    const { currentUser } = useAuth();
    const [user, setUser] = useState({});

    const [replyUI, setReplyUI] = useState([]);
    const [isShowReply, setShowReply] = useState(false);
    const [curComment, setCurComment] = useState("");
    const [isChosen, setChose] = useState(false);
    const commentRef = useRef();

    const postRef = postId != undefined ? doc(db, isQuestion ?  "questions" : "posts", postId) : "";
    const userRef = doc(db, "users", currentUser.uid);
    const replyCmtPath =  (isQuestion ? "questions" : "posts") + "/" + postId + "/comments/" + cmtId + "/replies";

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
                if(a.createdAt > b.createdAt) {
                    return 1;
                } else {
                    return -1;
                }
            });
            const lstCmtUI = lstCmt.map((data) => {
                return <UserComment
                    userName = {data.author}
                    content = {data.content}
                    createdAt = {data.createdAt}
                    isReply = {true}
                />
            });
            setReplyUI(lstCmtUI);
        });
        getUser();
    }, [])


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
            console.log("enter", curComment);
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

            console.log(replyCmtPath);
            const postCmtRef = collection(db, replyCmtPath);
            const newCmtRef =  await addDoc(postCmtRef, commentData);
            
        }
    }
    


    var date = new Date(createdAt);
    date = date.toString();
    var hour = date.slice(15,21);
    var strDate = date.slice(3,16);
    strDate = hour + "," + strDate;
    
    

    return(
        <div>
            <div className = "comment_body">
                <div style = {{fontSize: 12, fontWeight: "bold"}}>{userName}</div>
                <div style = {{fontSize: 14}}>{content}</div>
            </div>
            <div style = {{display: "flex", flexDirection: "row", fontSize: 12, paddingLeft: 10, paddingTop: 2}}>
                {isReply ? <div/> : 
                <Link style = {{color: "black", cursor: "pointer", textDecoration: "underline", fontWeight: "bold"}}
                    onClick = {(event) => {setShowReply(true)}}
                >Reply</Link>} {(isReply ? "" : ", ") + strDate}
            </div>
            {
                (isShowReply && isReply == false)
                ? <div style = {{paddingLeft: 30}}>
                    {replyUI}
                    <div className = "comment_text_field" style = {{marginTop: 5}}>
                        <Form.Control
                            placeholder = "replying..."
                            ref = {commentRef}
                            onSelect = {() => {resetComment()}}
                            onKeyDown = {(event) => {keyDown(event)}}
                            onChange = {(event) => {updateComment(event)}}
                        />
                    </div>
                </div> : <div/>
            }
        </div>
    );

}