import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { setDoc, doc, collection, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router";
import { auth, db } from "../../firebase";
import { useAuth } from '../../context/AuthContext';
import { Form, Button } from "react-bootstrap";
import AppNavBar from "../constant/web_bar";

function SignIn() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerUserName, setRegisterUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorType, setErrorType] = useState(0);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginUserName, setLoginUserName] = useState("");
  const [user, setUser] = useState({});
  const { signup } = useAuth();
  const navigate = useNavigate();

  async function signUp(event) {
    event.preventDefault();

    if(registerPassword.length < 6) {
      setErrorMessage("Password needs to have at least 6 characters");
      setErrorType(2);
      return;
    }
    if(registerPassword != confirmPassword) {
      setErrorMessage("Password doesn't match");
      setErrorType(2);
      return;
    }

    try {
      const user = await signup(registerEmail, registerPassword);
      const docRef = doc(db, "users", user.user.uid);
      const userInfo = {username: registerUserName};
      await setDoc(docRef, userInfo);
      navigate("/song_surge_share");
    } catch {
      setErrorMessage("Invalid email");
      setErrorType(1);
    }
  }

  return(
    <>
      <AppNavBar nameAppBar = "SongSurge" isLogin = {false}/>
      <div className = "container">
          <div>
            <div className = "log_in_container"></div>
              <Form>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type = "text" placeholder = "Enter your email here" onChange = {(event) => {
                    setRegisterEmail(event.target.value)
                  }} required isInvalid = {errorType == 1}></Form.Control>
                  <Form.Control.Feedback type = "invalid">
                    {errorMessage}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control type = "text" placeholder = "How can we call you" onChange = {(event) => {
                    setRegisterUserName(event.target.value)
                  }}></Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type = "password" placeholder = "Password" onChange = {(event) => {
                    setRegisterPassword(event.target.value)
                  }}></Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control type = "password" placeholder = "Confirm Password" onChange = {(event) => {
                    setConfirmPassword(event.target.value)
                  }} required isInvalid = {errorType == 2}></Form.Control>
                  <Form.Control.Feedback type = "invalid">
                    {errorMessage}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button onClick = {(event) => {signUp(event)}}>
                  Sign Up
                </Button>

              </Form>
        </div>
      </div>
    </>
  );

  
}

export default SignIn;