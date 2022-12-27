import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoginForm from "../components/loginForm";
import SignUpForm from "../components/signupForm";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import Router from 'next/router';
import {db} from "../firebase";
import { getDoc, doc } from "firebase/firestore";


export default function LogIn({userProfile}) {
  const [user, setUser] = useState(auth.currentUser);
  const [hasLogin, setHasLogin] = useState(true);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const handleSignUpClick = (event) => {
    setHasLogin(!hasLogin)
  }

  return (
    <div className={styles.logincontainer}>
    {hasLogin ? <LoginForm/> : <SignUpForm/> }
    <button onClick={handleSignUpClick} className={styles.signupbutton}>{hasLogin ? "Sign up" : "Login"}</button>
    </div>
  );
}
