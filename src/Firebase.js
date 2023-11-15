// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'; // Import the authentication module


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYLYv-EVecD5XSiJNacNZcyet4i56BCfs",
  authDomain: "react-auth-aafa1.firebaseapp.com",
  projectId: "react-auth-aafa1",
  storageBucket: "react-auth-aafa1.appspot.com",
  messagingSenderId: "1062392835295",
  appId: "1:1062392835295:web:cfe5eeb66ec4532f558d6a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);