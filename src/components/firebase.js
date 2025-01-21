// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAn2wFfAE1yq5Po0crLn1BM42lJKKt3zO8",
  authDomain: "reminder-app-7e874.firebaseapp.com",
  projectId: "reminder-app-7e874",
  storageBucket: "reminder-app-7e874.firebasestorage.app",
  messagingSenderId: "547757668093",
  appId: "1:547757668093:web:f4b813f97c6aa103c3b094",
  measurementId: "G-02M5X35LS0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth();
export const db=getFirestore(app);
export default app;