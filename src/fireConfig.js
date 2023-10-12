// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';
import {GoogleAuthProvider, getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsV_-7TEJiMGJgdnCSWQ4sByrWXhCbYbg",
  authDomain: "the-ebag-mart-e158a.firebaseapp.com",
  projectId: "the-ebag-mart-e158a",
  storageBucket: "the-ebag-mart-e158a.appspot.com",
  messagingSenderId: "626821269744",
  appId: "1:626821269744:web:793693acea33002d9d5a35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export default fireDB
