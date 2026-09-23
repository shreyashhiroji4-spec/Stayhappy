// ==========================================
// ELEMENTS
// ==========================================

const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

const countdown = document.getElementById("countdown");
const countdownTitle = document.getElementById("countdownTitle");
const specialDayText = document.getElementById("specialDayText");

const passwordInput = document.getElementById("passwordInput");
const unlockButton = document.getElementById("unlockButton");
const passwordMessage = document.getElementById("passwordMessage");

const backButton = document.getElementById("backButton");
const tapMessage = document.getElementById("tapMessage");


// ==========================================
// BIRTHDAY DATE
// ==========================================

// TEST MODE
// Change to false after everything works.

const TEST_MODE = true;

const birthday = TEST_MODE
    ? Date.now() + 10000
    : new Date("2026-10-08T00:00:00+05:30").getTime();


// ==========================================
// VARIABLES
// ==========================================

let countdownTimer = null;
let finishTimer = null;

let audioContext = null;
let tickTimer = null;

let finished = false;


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

function playTick() {

    if (finished) return;

    try {

        if (!audioContext) {
            audioContext = new (window.AudioContext ||
                window.webkitAudioContext)();
        }

        if (audioContext.state === "suspended") {
            audioContext.resume();
        }

        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.type = "sine";
        oscillator.frequency.value = 800;

        gain.gain.setValueAtTime(
            0.08,
            audioContext.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            audioContext.currentTime + 0.08
        );

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.08);

    } catch (error) {
        console.log("Sound error:", error);
    }
}


// ==========================================
// START SOUND AFTER FIRST CLICK
// ==========================================

document.addEventListener(
    "click",
    function () {

        if (finished) return;

        playTick();

        if (!tickTimer) {

            tickTimer = setInterval(function () {

                if (!finished) {
                    playTick();
                }

            }, 1000);
        }

    },
    { once: true }
);


// ==========================================
// STOP SOUND COMPLETELY
// ==========================================

function stopSound() {

    if (tickTimer !== null) {

        clearInterval(tickTimer);
        tickTimer = null;
    }

    if (audioContext) {

        try {
            audioContext.close();
        } catch (error) {
            console.log("Audio close error:", error);
        }

        audioContext = null;
    }
}


// ==========================================
// FINISH COUNTDOWN
// ==========================================

function finishCountdown() {

    if (finished) return;

    finished = true;


    // Stop countdown
    if (countdownTimer !== null) {

        clearInterval(countdownTimer);
        countdownTimer = null;
    }


    // Stop finish timer
    if (finishTimer !== null) {

        clearTimeout(finishTimer);
        finishTimer = null;
    }


    // STOP SOUND
    stopSound();


    // Hide countdown
    if (countdown) {
        countdown.style.display = "none";
    }


    // Change top message
    if (countdownTitle) {

        countdownTitle.textContent =
            "Finally, the wait is over. The day is here! 💚";
    }


    // Change bottom message
    if (specialDayText) {

        specialDayText.innerHTML =
            "Happy Birthday Brinda...!!!🥳💚<br>" +
            "password is 0826";

        specialDayText.style.fontSize = "22px";
        specialDayText.style.opacity = "0.85";
        specialDayText.style.lineHeight = "1.6";
    }

    const tapMessageElement = document.getElementById("tapMessage");

if (tapMessageElement) {
    tapMessageElement.remove();
}
}

// ==========================================
// UPDATE COUNTDOWN
// ==========================================

function updateCountdown() {

    if (finished) return;

    const difference = birthday - Date.now();


    if (difference <= 0) {

        finishCountdown();
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
// START COUNTDOWN
// ==========================================

updateCountdown();

countdownTimer = setInterval(
    updateCountdown,
    250
);


// ==========================================
// GUARANTEED FINISH
// ==========================================

finishTimer = setTimeout(
    finishCountdown,
    Math.max(0, birthday - Date.now())
);


// ==========================================
// PASSWORD
// ==========================================

if (unlockButton) {

    unlockButton.addEventListener(
        "click",
        function () {

            const password =
                passwordInput.value;

            if (password === "0826") {

                passwordMessage.textContent =
                    "Unlocked! 💚";

                // Later:
                // window.location.href = "birthday.html";

            } else {

                passwordMessage.textContent =
                    "Wrong password... 👀";

                passwordInput.value = "";
            }
        }
    );
}
