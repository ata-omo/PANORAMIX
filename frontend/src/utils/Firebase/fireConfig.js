import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { FIRE } from "../constants";


// Initialize Firebase
const app = initializeApp(FIRE);

export const firebaseAuth = getAuth(app);
