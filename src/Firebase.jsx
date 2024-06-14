
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCG6AerE7gnQAm72Cz1xZ4ICjJoGP-jLBI",
  authDomain: "messenger-fbdfe.firebaseapp.com",
  projectId: "messenger-fbdfe",
  storageBucket: "messenger-fbdfe.appspot.com",
  messagingSenderId: "744229735997",
  appId: "1:744229735997:web:d5c0c0b7ad2e5f49ac2454",
  measurementId: "G-G9C60JR2KT"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
