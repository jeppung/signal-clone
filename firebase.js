// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDL2NVL3VSpFQ1cI0T7xEN09a5RjSlNVmE",
  authDomain: "signal-clone-a9327.firebaseapp.com",
  projectId: "signal-clone-a9327",
  storageBucket: "signal-clone-a9327.appspot.com",
  messagingSenderId: "899639963054",
  appId: "1:899639963054:web:8182d8dcdba0e309ab6c3f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export {auth, db};