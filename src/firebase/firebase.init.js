// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7EfzIWH_t0rWyJGidHMBFICLEjQK5XcM",
  authDomain: "e-tuition-f8526.firebaseapp.com",
  projectId: "e-tuition-f8526",
  storageBucket: "e-tuition-f8526.firebasestorage.app",
  messagingSenderId: "165064381189",
  appId: "1:165064381189:web:b092d0077520d829251d6c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
