import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { setDoc, doc, collection, getDoc } from "firebase/firestore";
import "./App.css";
import { auth, db } from "./firebase";

function SignInSignUp() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerUserName, setRegisterUserName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginUserName, setLoginUserName] = useState("");

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      const docRef = doc(db, "users", user.user.uid);
      const userInfo = {username: registerUserName};
      await setDoc(docRef, userInfo);
      console.log(user.user.uid);
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      const userData = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      const collectionRef = collection(db, "users");
      var uID = userData.user.uid; // string
      const userDocsRef = doc(db, "users", `${uID}`);
      const data = await getDoc(userDocsRef);
      const user = data.data();
      setLoginUserName(user.username);
      console.log(user.username);
      console.log(userData.user.uid);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="App">
      <div>
        <h3> Register User </h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          type = "password"
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
        />
        <input
          placeholder="Username..."
          onChange={(event) => {
            setRegisterUserName(event.target.value);
          }}
        />
        <button onClick={register}> Create User</button>
      </div>

      <div>
        <h3> Login </h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />

        <button onClick={login}> Login</button>
      </div>

      <h4> User Logged In: </h4>
      {loginUserName}

      <button onClick={logout}> Sign Out </button>
    </div>
  );
}

export default SignInSignUp;