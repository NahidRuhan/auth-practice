// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmX_gKJdxGBiUQWVbAw1iTe-7Yf_wRUK8",
  authDomain: "email-pass-auth-359c6.firebaseapp.com",
  projectId: "email-pass-auth-359c6",
  storageBucket: "email-pass-auth-359c6.appspot.com",
  messagingSenderId: "713882663093",
  appId: "1:713882663093:web:544e595e255824acefa6fc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth
