import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Roboto } from '@next/font/google'
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useEffect, useState } from 'react';
import LoginWindow from "../components/loginWindow";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth, db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import AddIcon from '@mui/icons-material/Add';


export interface UserProfile {
  email: string;
  hasAdminRights: boolean;
  lastname: string;
  firstname: string;
}

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})


export default function App({ Component, pageProps }: AppProps) {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(auth.currentUser);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>();


  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
   if (user) {
    const userRef = doc(db!, "users", user!.email!);
    const userSnap = await getDoc(userRef);
    console.log(userSnap.data()!.userData);
    setUserProfile(userSnap.data()!.userData); 
     setUserLoggedIn(true);
   } else {
     setUserLoggedIn(false);
   }
 });
 }, [auth.currentUser]);

  function onLoginPress() {
    if(userLoggedIn) {
      signOut(auth).then(() => {
        setUserLoggedIn(false)
      }).catch((error) => {
      });
    } else {
      setShowLogin(!showLogin);
    }
  }

  return <main className={roboto.className}>
        <span className={styles.appName}><Link href="/">Knitit</Link>
        {userLoggedIn && userProfile!.hasAdminRights ? <Link href="/add-item"><button className={styles.addbutton}><AddIcon sx={{ fontSize: 30 }}/></button> </Link> : ""}
        <button onClick={onLoginPress} className={styles.adminbutton}>{userLoggedIn ? "Sign out" : "Log in"}</button></span>
        {showLogin && !userLoggedIn ? <LoginWindow userProfile={userProfile}/> : <div></div>}
     <Component {...pageProps} /></main>
}
