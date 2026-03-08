// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.vite.VITE_APIKEY,
  authDomain: import.meta.vite.VITE_AUTHDOMAIN,
  projectId: import.meta.vite.VITE_PROJECTID,
  storageBucket: import.meta.vite.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.vite.VITE_MESSAGINGSENDERID,
  appId: import.meta.vite.VITE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
