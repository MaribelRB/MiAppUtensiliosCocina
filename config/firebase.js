// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUkLKodNvT6-W795XnXfGH507JKzLsBTo",
  authDomain: "utencilioscocina-d6e17.firebaseapp.com",
  projectId: "utencilioscocina-d6e17",
  storageBucket: "utencilioscocina-d6e17.firebasestorage.app",
  messagingSenderId: "52725058836",
  appId: "1:52725058836:web:217e32f57657cd92224601"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);