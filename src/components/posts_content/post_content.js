import "./post_content.css"
import { React, useEffect, useState, useRef } from "react";
import { Form } from "react-bootstrap";
import Link from '@material-ui/core/Link';
import { db } from "../../firebase.js"
import { doc, getDoc, onSnapshot, addDoc, collection } from "@firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import UserComment from "../post_comment/post_comment";
import { HashTag } from '../constant/hash_tag_ui';
import { Moody } from '../constant/moody_ui';
import MusicLink from "../comment/link";
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


function isBrightColor(hexCode) {
    var r = hexCode.slice(1, 3);
    var g = hexCode.slice(3, 5);
    var b = hexCode.slice(5, 7);
    r = parseInt(r, 16);
    g = parseInt(g, 16);
    b = parseInt(b, 16);
    return (((r * 299) + (g * 587) + (b * 114)) / 1000) > 155;
}


function PostContent(props) {
    const {
        link,
        backgroundColor = '',
        postingTime ,
        content,
        hashTags = [],
        moodyPart,
        userId,
        postId,
        userName,
        comment,
        isPreview = false,
        onClickMoody,
        onClickHashtag,
    } = props
    

    const isQuestion = link == undefined;
    const [curComment, setCurComment] = useState("");
    const [isChosen, setChose] = useState(false);
    const [numShownComment, setNumComment] = useState(0);

    const { currentUser } = useAuth();
    const [user, setUser] = useState({});

    const [postCommentUI, setPostCommentUI] = useState([]);
    const [showComment, setShowComment] = useState(false);
    const commentRef = useRef();

    const postRef = postId != undefined ? doc(db, isQuestion ?  "questions" : "posts", postId) : "";
    const userRef = doc(db, "users", currentUser.uid);

    const postCmtPath = ((isQuestion ? "questions" : "posts") + "/" + postId + "/comments");

    
    var date = postingTime != undefined ? new Date(postingTime) : new Date(Date.now());
    date = date.toString();
    var hour = date.slice(15,21);
    var strDate = date.slice(3,16);
    strDate = hour + "," + strDate;

    const isBright = isBrightColor(backgroundColor);
    const textColor = isBright ? "#121212" : '#E5E5E5';

    useEffect(() => {
        const getUser = async () => {
            const data = await getDoc(userRef);
            setUser(data.data());
        }
        const getPost = postRef != "" ? async () => {
            const data = await getDoc(postRef);
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
                    type = {data.data.type}
                    backgroundColor = {backgroundColor}
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
        setNumComment(Math.min(numShownComment + 10, postCommentUI.length));
    }

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

            setNumComment(postCommentUI.length + 1);

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
                <div className="user_id" style = {{color: textColor}}>{userName}</div>
                <div className="date" style = {{color: textColor}}>{strDate}</div>
            </div>
            <div className="post_text" style = {{color: textColor}}>{content}</div>
            {
                isQuestion == false ? <iframe width="560" height="315" src={vidId} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> : <div/>
            }
            <div className="status">
                {
                    moodyPart == undefined ? <div></div>
                    : <Moody moodyPart = {moodyPart} onClick = {onClickMoody}/>
                }
                {hashTags.map(item => (
                    <HashTag hashtag = {item} onClick = {onClickHashtag}/>
                ))}
            </div>

            {
                isPreview != false ? <div/>
                : <div style = {{marginTop: 10}}>
                    <div style = {{marginBottom: 10}}>
                    {
                        postCommentUI.length > 0
                        ? (numShownComment == 0 && showComment == false)
                            ? <Link style = {{color: textColor, cursor: "pointer", textDecoration: "underline"}} onClick = {(event) => {
                                event.preventDefault();
                                onClickComment(true)}}>Show comments</Link>
                            : <div>
                                {postCommentUI.slice(0, numShownComment)}
                                <Link style = {{color: textColor, cursor: "pointer", textDecoration: "underline"}} onClick = {(event) => {
                                    event.preventDefault();
                                    onClickComment(numShownComment == postCommentUI.length ? false : true)
                                }}>{numShownComment == postCommentUI.length ? "Show Less" : "View more"}</Link>
                            </div> 
                        : <div/>
                    }
                    </div>
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
                        <MusicLink isQuestion = {isQuestion} postId = {postId}></MusicLink>
                    </div>
                </div>
            }
        </div>
    )
}

export default PostContent


export function EmptyPostWithMessage(props) {

    const {
        message
    } = props;

    return (
        <div className = "post_content">
            <div style = {{fontWeight: "bold", fontSize: 16}}>{message}</div>
        </div>
    )
}

