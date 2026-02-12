// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC97PwJDRCRQx87Uo8vb3C2lOkgs2pAwwc",
    authDomain: "habbit-tracker-a77e5.firebaseapp.com",
    projectId: "habbit-tracker-a77e5",
    storageBucket: "habbit-tracker-a77e5.firebasestorage.app",
    messagingSenderId: "1084484870930",
    appId: "1:1084484870930:web:4f1ae06fd2e3fb384b09cb",
    measurementId: "G-6HFSVW8ZHM"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
