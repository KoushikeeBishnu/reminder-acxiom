import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC1ShrQBuD2cjqdRjUwvqQmLd8fL_OjeGs",
  authDomain: "reminder-webapp-5b9d5.firebaseapp.com",
  projectId: "reminder-webapp-5b9d5",
  storageBucket: "reminder-webapp-5b9d5.appspot.com",
  messagingSenderId: "848002930110",
  appId: "1:848002930110:web:1a6fbbc7881e4e8d83d5ef",
  measurementId: "G-3HV49N9JM9"
};


// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const provider= new GoogleAuthProvider();


export { auth, db, provider };






