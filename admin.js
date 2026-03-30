import { db, doc, updateDoc, onSnapshot } from "./firebase-config.js";

const sessionRef = doc(db, "loveSession", "main");

const adminAns1 = document.getElementById("adminAns1");
const adminAns2 = document.getElementById("adminAns2");
const adminAns3 = document.getElementById("adminAns3");
const adminStatus = document.getElementById("adminStatus");

onSnapshot(sessionRef, (docSnap) => {
    if (!docSnap.exists()) return;

    const data = docSnap.data();

    adminAns1.innerText = data.q1Answer || "Waiting...";
    adminAns2.innerText = data.q2Answer || "Waiting...";
    adminAns3.innerText = data.q3Answer || "Waiting...";

    adminStatus.innerText = "Live answers updating... 💙";
});

async function approveQuestion(qNo) {
    await updateDoc(sessionRef, {
        [`q${qNo}Approved`]: true
    });

    adminStatus.innerText = `Q${qNo} approved successfully ✅`;
}

window.approveQuestion = approveQuestion;