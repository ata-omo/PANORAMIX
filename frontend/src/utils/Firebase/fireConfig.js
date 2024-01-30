import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBDubX_4qdYhpvAGe6SIrMeQ9tBZLRlFNc",
  authDomain: "panoramix-bc4ba.firebaseapp.com",
  projectId: "panoramix-bc4ba",
  storageBucket: "panoramix-bc4ba.appspot.com",
  messagingSenderId: "307482262686",
  appId: "1:307482262686:web:b9ebc1498e17370f3b0f8f",
  measurementId: "G-D82V9CER5J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
