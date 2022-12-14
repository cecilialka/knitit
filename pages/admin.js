import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoginForm from "../components/loginForm";
import SignUpForm from "../components/signupForm";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { auth } from "../firebase";


export default function Admin({}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = auth.currentUser;
  const [hasLogin, setHasLogin] = useState(true);

  const handleSignUpClick = (event) => {
    setHasLogin(!hasLogin)
  }

  return (
    <div className={styles.logincontainer}>
    {hasLogin ? <LoginForm email={email} password={password}/> : <SignUpForm email={email} password={password} /> }
    <button onClick={handleSignUpClick} className={styles.signupbutton}>{hasLogin ? "Sign up" : "Login"}</button>
    </div>
  );
}
