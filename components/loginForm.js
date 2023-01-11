import { signInWithEmailAndPassword } from "firebase/auth";
import styles from "../styles/Home.module.css";
import { useRef} from "react";
import { auth } from "../firebase";

export default function LoginForm({userProfile}) {

  const emailRef = useRef();
  const passwordRef = useRef();
  console.log(userProfile)

    const handleSubmit = (event) => {
      event.preventDefault();
      signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
        .then((userCredential) => {
    // Signed in 
      const user = userCredential.user;
      console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  }


  return (
    <div className={styles.logininfo}>
    <form >
    <div className={styles.logininput}>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" ref={emailRef} />
      </div>
      <div className={styles.logininput}>
        <label htmlFor="password">Password</label>
        <input id="password" type="password"  ref={passwordRef}/>
      </div>
      <button className={styles.submitbutton} onClick={handleSubmit}>Sign in</button>
    </form>
    </div>
  );
}
