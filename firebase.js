import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIRESTORE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIRESTORE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIRESTORE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIRESTORE_STORAGE,
  messagingSenderId: process.env.NEXT_PUBLIC_FIRESTORE_MESSAGESENDERID,
  appId: process.env.NEXT_PUBLIC_FIRESTORE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
