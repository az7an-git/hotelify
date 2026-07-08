// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAfzPiRFc8S8cbEkZX-NYSby0HtyXN8xAs",
  authDomain: "hotelify-azlan.firebaseapp.com",
  projectId: "hotelify-azlan",
  storageBucket: "hotelify-azlan.firebasestorage.app",
  messagingSenderId: "778083460065",
  appId: "1:778083460065:web:1e243d1ea1b2f31e22a8a0",
  measurementId: "G-VJPQNNQVRX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const ADMIN_UID = "FY0EuhiBlOaMH7ufUEXxPKsSKeC3";


