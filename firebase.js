import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyDWfWcCK_8m-ZZ7sXtD5vlbH5AOmATOaAE",
  authDomain: "letsknit-76186.firebaseapp.com",
  projectId: "letsknit-76186",
  storageBucket: "letsknit-76186.appspot.com",
  messagingSenderId: "241958854735",
  appId: "1:241958854735:web:12e51c02e6a3b2b9234a3a",
  measurementId: "G-29MH0TF7CH"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db}
//const analytics = getAnalytics(app);