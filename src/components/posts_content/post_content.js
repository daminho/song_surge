import "./post_content.css"
import { React, useEffect, useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { rtdb, db } from "../../firebase.js"
import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { update, child, ref, push } from "@firebase/database";
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
        isPreview = false,
    } = props
    
    console.log(moodyPart);

    const isQuestion = link == undefined;
    const [curComment, setComment] = useState("");
    const [isChosen, setChose] = useState(false);

    const { currentUser } = useAuth();
    const [user, setUser] = useState({});
    const [postComment, setPostComment] = useState([]);
    const [showComment, setShowComment] = useState(false);

    const commentRef = useRef();

    const postRef = postId != undefined ? doc(db, isQuestion ?  "questions" : "posts", postId) : "";
    const userRef = doc(db, "users", currentUser.uid);


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
            // setPostComment(data.data().comment)
        } : () => {}
        getPost();
        getUser();
    }, [])

    function resetComment() {
        if(isChosen == false) {
            console.log("resetComment");
            setChose(true);
            setComment("");
        }
    }

    function updateCommnet(event) {
        var x = event.target.value;
        setComment(x);
    }

    async function keyDown(event) {
        if(event.keyCode == 13){
            event.preventDefault();
            const commentData = {
                author: user.username,
                content: curComment,
            }
            commentRef.current.value = "";
            resetComment();
            console.log(commentData);
            const newCommentKey = push(child(ref(rtdb), 'comments')).key;
            const postRef = doc(db, "posts", postId);
            var newComment = postComment;
            newComment.push(newCommentKey);
            setPostComment(newComment);

            await updateDoc(postRef, {
                comment: newComment
            })

            const updates = {};
            updates['/comments/' + newCommentKey] = commentData;
            return update(ref(rtdb), updates)
            
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
                                onSelect = {(event) => {resetComment()}}
                                onKeyDown = {(event) => {keyDown(event)}}
                                onChange = {(event) => {updateCommnet(event)}}
                            />
                        </div>
                    </div>
                    {
                        showComment == false
                        ? <a style = {{textDecoration: "underline"}} onClick = {(event) => {setShowComment(true)}}>Show comments</a>
                        : <div/>
                    }
                </div>
            }
        </div>
    )
}

export default PostContent