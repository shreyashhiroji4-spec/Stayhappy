// ==========================================
// COUNTDOWN
// ==========================================

// TEST: 10 seconds from page load
const birthday = Date.now() + 10000;

// REAL DATE — use this after testing:
// const birthday = new Date("2026-10-08T00:00:00+05:30").getTime();


// ==========================================
// ELEMENTS
// ==========================================

const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

const countdown = document.getElementById("countdown");
const message = document.getElementById("specialDayText");

const backButton = document.getElementById("backButton");


// ==========================================
// BACK BUTTON
// ==========================================

if (backButton) {
    backButton.onclick = function () {
        window.location.href = "index.html";
    };
}


// ==========================================
// TICK SOUND
// ==========================================

let audioContext = null;
let tickTimer = null;

function startSound() {

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

function tick() {

    if (!audioContext) return;

    const oscillator =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();

    oscillator.frequency.value = 900;
    oscillator.type = "sine";

    gain.gain.value = 0.12;

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(
        audioContext.currentTime + 0.08
    );
}


// Start sound after clicking the page
document.addEventListener("click", function () {

    startSound();
    tick();

    tickTimer = setInterval(tick, 1000);

}, { once: true });


// ==========================================
// FINISH COUNTDOWN
// ==========================================
function finishCountdown() {
    if (finished) return;

    finished = true;

    if (countdownTimer) {
        clearInterval(countdownTimer);
        countdownTimer = null;
    }

    if (tickTimer) {
        clearInterval(tickTimer);
        tickTimer = null;
    }

    if (audioContext) {
        audioContext.close();
        audioContext = null;
    }

    countdown.style.display = "none";

    countdownTitle.textContent =
        "Finally, the wait is over. The day is here! 💚";

    specialDayText.innerHTML =
        "Happy Birthday Brinda...!!!🥳💚<br>" +
        "password is 0826";

    specialDayText.style.fontSize = "22px";
    specialDayText.style.opacity = "0.85";
    specialDayText.style.lineHeight = "1.6";
}
// ==========================================
// UPDATE COUNTDOWN
// ==========================================

function updateCountdown() {

    const difference = birthday - Date.now();

    if (difference <= 0) {

        finishCountdown();

        clearInterval(countdownTimer);

        return;
    }


    const d = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const h = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const m = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const s = Math.floor(
        (difference / 1000) % 60
    );


    days.textContent =
        String(d).padStart(2, "0");

    hours.textContent =
        String(h).padStart(2, "0");

    minutes.textContent =
        String(m).padStart(2, "0");

    seconds.textContent =
        String(s).padStart(2, "0");
}


// ==========================================
// START
// ==========================================

let countdownTimer =
    setInterval(updateCountdown, 1000);

updateCountdown();
