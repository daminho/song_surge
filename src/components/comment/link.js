import { React, useState, useRef, useEffect } from "react";
import { OverlayTrigger, Form } from 'react-bootstrap';
import Popover from 'react-bootstrap/Popover';
import { db } from '../../firebase';
import { useAuth } from "../../context/AuthContext";
import { doc, getDoc, updateDoc, onSnapshot, addDoc, collection } from "@firebase/firestore";




function MusicLink(props) {
  
  const {
    commentId,
    postId,
    isQuestion,
  } = props;

  const [musicLink, setMusicLink] = useState("");
  const { currentUser } = useAuth();
  const [user, setUser] = useState({});
  const userRef = doc(db, "users", currentUser.uid);

  useEffect(() => {
    const getUser = async () => {
      const data = await getDoc(userRef);
      setUser(data.data()); 
    }
    getUser();
  }, []);


  const cmtRef = useRef();
  async function submitLink(event) {
    if(event.keyCode == 13) {
      event.preventDefault();
      cmtRef.current.value = "";
      const commentData = {
          author: user.username,
          type: "link",
          content: musicLink,
          createdAt: Date.now(),
      }
      const commentPath = (isQuestion ? "questions" : "posts") + "/" + postId + "/comments/" + (commentId != undefined ? commentId + "/replies" : "");
      const commentRef = collection(db, commentPath);
      const newCmtRef =  await addDoc(commentRef, commentData);
    } 
  }

  return (
    <OverlayTrigger trigger="click" placement="bottom" overlay={
      <Popover id="popover-basic">
        <Popover.Body>
          <Form.Control placeholder = "reply with music link" 
            ref = {cmtRef}
            onChange = {(event) => {setMusicLink(event.target.value)}}
            onKeyDown = {(event) => {submitLink(event)}}
          />
        </Popover.Body>
    </Popover>
    }>
      <button style = {{backgroundColor: "transparent", border: 0}}>🎵</button>
    </OverlayTrigger>
  );
}

  export default MusicLink;