function goToPage(pageNumber) {
    document.querySelectorAll(".page").forEach((page) => {
        page.classList.remove("active");
    });

    document.getElementById(`page${pageNumber}`).classList.add("active");

    if (pageNumber === 2) {
        resetLovePage();
    }
}

/* =========================
   AUDIO
========================= */
const bgMusic = document.getElementById("bgMusic");
const crashSound = document.getElementById("crashSound");

let bgStarted = false;

document.addEventListener("click", startBGMOnce);
document.addEventListener("touchstart", startBGMOnce);

function startBGMOnce() {
    if (!bgStarted && bgMusic) {
        bgMusic.volume = 0.35;
        bgMusic.play().catch(() => {});
        bgStarted = true;
    }
}

/* =========================
   LOVE PAGE LOGIC
========================= */
const loveInput = document.getElementById("loveInput");
const leftHeart = document.getElementById("leftHeart");
const rightHeart = document.getElementById("rightHeart");
const mergedHeart = document.getElementById("mergedHeart");
const crashEffect = document.getElementById("crashEffect");
const typingStatus = document.getElementById("typingStatus");
const trail = document.getElementById("trail");
const bgName = document.getElementById("bgName");

let progress = 0;
let isMerged = false;

function resetLovePage() {
    progress = 0;
    isMerged = false;

    if (bgName) {
        bgName.classList.remove("show");
    }

    if (loveInput) {
        loveInput.value = "";
    }

    if (leftHeart) {
        leftHeart.style.left = "15px";
        leftHeart.style.top = "95px";
        leftHeart.style.opacity = "1";
        leftHeart.style.transform = "scale(1)";
    }

    if (rightHeart) {
        rightHeart.style.right = "15px";
        rightHeart.style.top = "95px";
        rightHeart.style.opacity = "1";
        rightHeart.style.transform = "scale(1)";
    }

    if (mergedHeart) {
        mergedHeart.classList.remove("show");
        mergedHeart.style.opacity = "0";
        mergedHeart.style.transform = "translate(-50%, -50%) scale(0)";
    }

    if (crashEffect) {
        crashEffect.classList.remove("show");
        crashEffect.style.opacity = "0";
    }

    if (typingStatus) {
        typingStatus.innerText = 'Keep typing "loveeeee..." until both hearts crash 💙🖤';
    }

    if (trail) {
        trail.innerHTML = "";
    }
}

if (loveInput) {
    loveInput.addEventListener("input", () => {
        if (isMerged) return;

        const text = loveInput.value.toLowerCase();
        const usefulCount =
            (text.match(/[love]/g) || []).length + (text.match(/e/g) || []).length;

        progress = Math.min(usefulCount, 42);

        moveHearts(progress);
        createTrail();

        if (progress < 8) {
            typingStatus.innerText = "Aww... keep typing more 😚";
        } else if (progress < 16) {
            typingStatus.innerText = "Hearts are slowly coming closer 💙";
        } else if (progress < 24) {
            typingStatus.innerText = "Ippo konjam chemistry start aagiduchu 🖤";
        } else if (progress < 34) {
            typingStatus.innerText = "Almost touchinggg 😍";
        } else if (progress < 42) {
            typingStatus.innerText = "Final little love push 💞";
        } else {
            mergeHearts();
        }
    });
}

function moveHearts(step) {
    if (!leftHeart || !rightHeart) return;

    const leftPos = 15 + step * 7.2;
    const rightPos = 15 + step * 7.2;
    const scale = 1 + step * 0.01;

    leftHeart.style.left = `${leftPos}px`;
    rightHeart.style.right = `${rightPos}px`;

    leftHeart.style.transform = `scale(${scale})`;
    rightHeart.style.transform = `scale(${scale})`;
}

function createTrail() {
    if (!trail || !leftHeart || !rightHeart) return;

    const stage = document.getElementById("loveStage");
    if (!stage) return;

    const leftRect = leftHeart.getBoundingClientRect();
    const rightRect = rightHeart.getBoundingClientRect();
    const stageRect = stage.getBoundingClientRect();

    const leftTrail = document.createElement("span");
    leftTrail.className = "trail-heart";
    leftTrail.innerText = "💙";
    leftTrail.style.left = `${leftRect.left - stageRect.left + 50}px`;
    leftTrail.style.top = `${leftRect.top - stageRect.top + 50}px`;

    const rightTrail = document.createElement("span");
    rightTrail.className = "trail-heart";
    rightTrail.innerText = "🖤";
    rightTrail.style.left = `${rightRect.left - stageRect.left + 50}px`;
    rightTrail.style.top = `${rightRect.top - stageRect.top + 50}px`;

    trail.appendChild(leftTrail);
    trail.appendChild(rightTrail);

    setTimeout(() => {
        leftTrail.remove();
        rightTrail.remove();
    }, 900);
}

function mergeHearts() {
    if (isMerged) return;
    isMerged = true;

    typingStatus.innerText = "Boommmm 💥 Two hearts became one 💖";

    leftHeart.style.left = "calc(50% - 120px)";
    rightHeart.style.right = "calc(50% - 120px)";

    setTimeout(() => {
        leftHeart.style.opacity = "0";
        rightHeart.style.opacity = "0";

        if (crashSound) {
            crashSound.currentTime = 0;
            crashSound.volume = 0.9;
            crashSound.play().catch(() => {});
        }

        if (crashEffect) {
            crashEffect.classList.add("show");
        }

        setTimeout(() => {
            if (mergedHeart) {
                mergedHeart.classList.add("show");
            }

            if (bgName) {
                bgName.classList.add("show");
            }

            typingStatus.innerText = "Tap the new heart my love 💙";
        }, 500);
    }, 800);
}

if (mergedHeart) {
    mergedHeart.addEventListener("click", () => {
        if (isMerged) {
            typingStatus.innerText = "Opening your birthday surprise... 🎁";
            setTimeout(() => {
                goToPage(3);
            }, 1200);
        }
    });
}

/* =========================
   POPUP
========================= */
function showLovePopup() {
    document.getElementById("lovePopup").classList.add("show");
}

function closeLovePopup() {
    document.getElementById("lovePopup").classList.remove("show");
}

/* =========================
   FLOATING HEARTS
========================= */
const floatingHearts = document.querySelector(".floating-hearts");

if (floatingHearts) {
    for (let i = 0; i < 28; i++) {
        const heart = document.createElement("span");
        heart.innerHTML = ["💙", "🖤", "💖", "💘"][Math.floor(Math.random() * 4)];
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = 5 + Math.random() * 8 + "s";
        heart.style.fontSize = 15 + Math.random() * 25 + "px";
        heart.style.animationDelay = Math.random() * 5 + "s";
        floatingHearts.appendChild(heart);
    }
}