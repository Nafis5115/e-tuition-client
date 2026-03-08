// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.vite.APIKEY,
  authDomain: import.meta.vite.AUTHDOMAIN,
  projectId: import.meta.vite.PROJECTID,
  storageBucket: import.meta.vite.STORAGEBUCKET,
  messagingSenderId: import.meta.vite.MESSAGINGSENDERID,
  appId: import.meta.vite.APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
