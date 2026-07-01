// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDt7Bpz--QqercXhj83UtpW7V_f5wNZiJ8",
  authDomain: "hotel-management-83b73.firebaseapp.com",
  projectId: "hotel-management-83b73",
  storageBucket: "hotel-management-83b73.appspot.com",
  messagingSenderId: "934600684549",
  appId: "1:934600684549:web:0be0088030b25aecff986c",
  measurementId: "G-P23N844P2H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

