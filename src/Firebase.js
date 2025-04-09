// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // ✅ Only this is needed now

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAgjVuDeB-BK9qiDRSvBBNx-Bu9wTUJy5Q",
  authDomain: "shopswift-46530.firebaseapp.com",
  projectId: "shopswift-46530",
  storageBucket: "shopswift-46530.appspot.com",
  messagingSenderId: "430946705773",
  appId: "1:430946705773:web:7c51a3ea3e5eeab8593a64",
  measurementId: "G-GHBKG9M1ZV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
