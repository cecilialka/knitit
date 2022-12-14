import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import styles from "../styles/Home.module.css";
import { useState, useRef } from "react";
import { auth, db } from "../firebase";
import { doc, addDoc, collection } from "firebase/firestore";

export default function SignUpForm({ email, password }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const firstnameRef = useRef();
  const lastnameRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const firstname = firstnameRef.current.value;
    const lastname = lastnameRef.current.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const dbRef = collection(db, "users");
        const userData = {
          name: firstname,
          lastname: lastname,
          email: email,
          hasAdminRights: false
        };
        addDoc(dbRef, userData);
      })
      .catch((error) => {
        console.log("Somethen went wrong while adding the user to firebase");
      });
  };
  return (
    <div className={styles.logininfo}>
      <form>
        <div className={styles.logininput}>
          <label htmlFor="firstname">First name</label>
          <input id="firstname" type="text" ref={firstnameRef} />
        </div>
        <div className={styles.logininput}>
          <label htmlFor="lastname">Last name</label>
          <input id="lastname" type="text" ref={lastnameRef} />
        </div>
        <div className={styles.logininput}>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" ref={emailRef} />
        </div>
        <div className={styles.logininput}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" ref={passwordRef} />
        </div>
        <button className={styles.submitbutton} onClick={handleSubmit}>
          Create user
        </button>
      </form>
    </div>
  );
}
