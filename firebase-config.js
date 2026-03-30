// Firebase SDK Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getFirestore,
    doc,
    setDoc,
    updateDoc,
    getDoc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 🔥 Replace this with YOUR Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDLHoIggPe_hfBsECJtdlvcXwCmr8srA-0",
    authDomain: "my-love-surprise.firebaseapp.com",
    projectId: "my-love-surprise",
    storageBucket: "my-love-surprise.firebasestorage.app",
    messagingSenderId: "294524037290",
    appId: "1:294524037290:web:a4f0ff30a5e1004a4688d3",
    measurementId: "G-RPJZDK32HS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, doc, setDoc, updateDoc, getDoc, onSnapshot };