import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import styles from "../styles/Home.module.css";
import { useState } from "react";


export default function LoginForm({email, password}) {

    const handleSubmit = (event) => {

    }
  return (
    <div className={styles.logininfo}>
    <form >
    <div className={styles.logininput}>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" />
      </div>
      <div className={styles.logininput}>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" />
      </div>
      <button className={styles.submitbutton} onClick={handleSubmit}>Sign in</button>
    </form>
    </div>
  );
}
