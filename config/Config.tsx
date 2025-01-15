// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getDatabase } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfmDnN32mQYNmy_j8YrwgCJ55qgKxTQdc",
  authDomain: "it-prueba.firebaseapp.com",
  projectId: "it-prueba",
  storageBucket: "it-prueba.firebasestorage.app",
  messagingSenderId: "786982781881",
  appId: "1:786982781881:web:529f0d09fae98540302c68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth( app )
export const db = getDatabase(app)