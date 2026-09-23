// ==========================================
// BIRTHDAY COUNTDOWN
// ==========================================

const birthday = new Date(Date.now() + 10000).getTime();

// ==========================================
// ELEMENTS
// ==========================================

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

const specialDayText =
    document.getElementById("specialDayText");

const countdown =
    document.getElementById("countdown");

const backButton =
    document.getElementById("backButton");

const passwordInput =
    document.getElementById("passwordInput");

const unlockButton =
    document.getElementById("unlockButton");

const passwordMessage =
    document.getElementById("passwordMessage");


// ==========================================
// BACK BUTTON
// ==========================================

if (backButton) {

    backButton.addEventListener(
        "click",
        function () {

            window.location.href =
                "index.html";

        }
    );

}


// ==========================================
// TICKING SOUND
// ==========================================

let audioContext = null;
let tickTimer = null;


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

    const oscillator =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();


    oscillator.type = "sine";

    oscillator.frequency.setValueAtTime(
        900,
        audioContext.currentTime
    );


    gain.gain.setValueAtTime(
        0.12,
        audioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.08
    );


    oscillator.connect(gain);

    gain.connect(
        audioContext.destination
    );


    oscillator.start();

    oscillator.stop(
        audioContext.currentTime + 0.08
    );

}


// ==========================================
// START SOUND AFTER FIRST CLICK
// ==========================================

document.addEventListener(
    "click",
    function () {

        startAudio();

        playTick();

        tickTimer = setInterval(
            playTick,
            1000
        );

    },
    { once: true }
);


// ==========================================
// COUNTDOWN
// ==========================================

function updateCountdown() {

    const now =
        new Date().getTime();

    const difference =
        birthday - now;


    // ======================================
    // COUNTDOWN FINISHED
    // ======================================

    if (difference <= 0) {

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";


        // Stop ticking
        if (tickTimer) {

            clearInterval(tickTimer);

            tickTimer = null;

        }


        // Stop audio
        if (audioContext) {

            audioContext.close();

            audioContext = null;

        }


        // Hide countdown boxes
        if (countdown) {

            countdown.style.display =
                "none";

        }


        // Change message
        if (specialDayText) {

            specialDayText.innerHTML =
                "Happy birthday Brinda....💚<br>" +
                "password is 0826";

        }


        clearInterval(
            countdownTimer
        );

        return;
    }


    // ======================================
    // CALCULATE TIME
    // ======================================

    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (difference /
            (1000 * 60 * 60)) % 24
        );


    const minutes =
        Math.floor(
            (difference /
            (1000 * 60)) % 60
        );


    const seconds =
        Math.floor(
            (difference /
            1000) % 60
        );


    // ======================================
    // DISPLAY TIME
    // ======================================

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
// START COUNTDOWN
// ==========================================

updateCountdown();

const countdownTimer =
    setInterval(
        updateCountdown,
        1000
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


            const correctPassword =
                "0826";


            if (password === correctPassword) {

                passwordMessage.textContent =
                    "Unlocked! 💚";

                // We'll create the next page later.
                // window.location.href = "birthday.html";

            } else {

                passwordMessage.textContent =
                    "Wrong password... 👀";

                passwordInput.value = "";

            }

        }
    );

}
