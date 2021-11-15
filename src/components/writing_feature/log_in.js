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
import { Link } from "react-router-dom";

function SignUp() {
  const [errorMessage, setErrorMessage] = useState("");
  const [errorType, setErrorType] = useState(0);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginUserName, setLoginUserName] = useState("");
  const [user, setUser] = useState({});
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();

  async function logIn(event) {
    event.preventDefault();

    try {
      const user = await login(loginEmail, loginPassword);
      console.log(currentUser.email);
    } catch {
        console.log("failed");
      setErrorMessage("Invalid email or password");
      setErrorType(1);
    }
  }

  return(
    <Form>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control type = "text" placeholder = "Enter your email here" onChange = {(event) => {
          setLoginEmail(event.target.value)
        }} required isInvalid = {errorType == 1}></Form.Control>
        <Form.Control.Feedback type = "invalid">
          {errorMessage}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control type = "password" placeholder = "Password" onChange = {(event) => {
          setLoginPassword(event.target.value)
        }}></Form.Control>
      </Form.Group>

      <Button onClick = {(event) => {logIn(event)}}>
        Log in
      </Button>
      <div>
          Need an account? <Link to = "sign_up"> Sign Up </Link>
      </div>

    </Form>
  );

  
}

export default SignUp;