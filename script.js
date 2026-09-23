// ==========================================
// BIRTHDAY COUNTDOWN
// 8 October 2026 - 12:00 AM IST
// ==========================================

const birthday = new Date("2026-10-08T00:00:00+05:30").getTime();

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

const backButton = document.getElementById("backButton");


// ==========================================
// BACK BUTTON
// ==========================================

if (backButton) {

    backButton.addEventListener("click", function () {
        window.location.href = "index.html";
    });

}


// ==========================================
// TICK SOUND
// ==========================================

let audioContext = null;

function startAudio() {

    if (!audioContext) {

        audioContext = new (
            window.AudioContext ||
            window.webkitAudioContext
        )();

    }

    if (audioContext.state === "suspended") {
        audioContext.resume();
    }

}


function playTick() {

    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "sine";

    oscillator.frequency.setValueAtTime(
        900,
        audioContext.currentTime
    );

    gain.gain.setValueAtTime(
        0.15,
        audioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.08
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();

    oscillator.stop(
        audioContext.currentTime + 0.08
    );

}


// ==========================================
// START COUNTDOWN
// ==========================================

function updateCountdown() {

    const now = new Date().getTime();

    const difference = birthday - now;


    // Birthday reached
    if (difference <= 0) {

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        clearInterval(countdownTimer);

        return;

    }


    // Calculate time remaining

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );


    // Display countdown

    daysElement.textContent =
        String(days).padStart(2, "0");

    hoursElement.textContent =
        String(hours).padStart(2, "0");

    minutesElement.textContent =
        String(minutes).padStart(2, "0");

    secondsElement.textContent =
        String(seconds).padStart(2, "0");

}


// ==========================================
// FIRST UPDATE
// ==========================================

updateCountdown();


// Update every second

const countdownTimer = setInterval(
    updateCountdown,
    1000
);


// ==========================================
// START AUDIO AFTER USER INTERACTION
// ==========================================

document.addEventListener(
    "click",
    startAudio,
    { once: true }
);
