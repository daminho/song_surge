import { React, useEffect, useState, useRef } from "react";
import { Form, Button, Container, Row, Col  } from "react-bootstrap";
import { rtdb, db } from "../../firebase.js"
import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { update, child, ref, push } from "@firebase/database";
import { getAdditionalUserInfo } from "@firebase/auth";



export default function UserComment(props) {
    const {
        userId,
        userName,
        content, 
        type,
        isReply,
        replyId,
        postId,
    } = props

    const [user, setUser] = useState();

    const { currentUser } = useAuth();

    useEffect(() => {
        const getUser = async () => {
            const data = await getDoc(userRef);
            setUser(data.data());
        }
        getUser();
    }, []);

    return(
        <div style = {{backgroundColor: "transparent"}}>
            <div style = {{fontSize: 12}}>{userName}</div>
            <div style = {{fontSize: 20}}>{content}</div>
        </div>
    );

}