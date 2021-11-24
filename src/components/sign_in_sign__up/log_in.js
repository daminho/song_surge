import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from '../../context/AuthContext';
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./sign_in_sign_up.css";
import AppNavBar from "../constant/web_bar";

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
      navigate("song_surge_share");
    } catch {
      setErrorMessage("Invalid email or password");
      setErrorType(1);
    }
  }

  return(
    <div>
      <AppNavBar nameAppBar = "SongSurge" isLogin = {false}/>
      <div className = "container">
        <div>
          <div className = "log_in_container">
            <Form>
                <Form.Group style = {{marginBottom: 10}}>
                  <Form.Label style = {{fontWeight: "bold", marginBottom: 0}}>Email</Form.Label>
                <Form.Control type = "text" placeholder = "Enter your email here" onChange = {(event) => {
                  setLoginEmail(event.target.value)
                }} required isInvalid = {errorType == 1}></Form.Control>
                <Form.Control.Feedback type = "invalid">
                  {errorMessage}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group style = {{marginBottom: 10}}>
                  <Form.Label style = {{fontWeight: "bold", marginBottom: 0}}>Password</Form.Label>
                <Form.Control type = "password" placeholder = "Password" onChange = {(event) => {
                  setLoginPassword(event.target.value)
                }} onKeyDown = {(event) => {if(event.keyCode == 13) {logIn(event)}}}></Form.Control>
              </Form.Group>

              <Button onClick = {(event) => {logIn(event)}} style = {{marginTop: 20, marginBottom: 10}}>
                Log in
              </Button>
              <div>
                  Need an account? <Link to = "sign_up"> Sign Up </Link>
              </div>

            </Form>
          </div>
        </div>
      </div>
    </div>
  );

  
}

export default SignUp;