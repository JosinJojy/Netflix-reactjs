import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIhBiO3flFpAcL2Fm_Ef22QQo6udFp5b4",
  authDomain: "react-netflix-eb4f0.firebaseapp.com",
  projectId: "react-netflix-eb4f0",
  storageBucket: "react-netflix-eb4f0.appspot.com",
  messagingSenderId: "29045190704",
  appId: "1:29045190704:web:a7c74bd778aa5f993c7df5",
  measurementId: "G-9TB7LL3YPM",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(FirebaseApp);
const analytics = getAnalytics(FirebaseApp);
