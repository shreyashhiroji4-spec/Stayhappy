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
            "Finally, the wait is over. The day is here...🥳";
    }


    // Change bottom message
    if (specialDayText) {

        specialDayText.innerHTML =
    "<div>Happy Birthday Brinda...!!!💚</div>" +
    "<div>password is 08s26</div>" +
    "<div>I hope you will enjoy</div>";
        
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

    unlockButton.addEventListener("click", function () {

        const password = passwordInput.value;

        if (password === correctPassword) {

            passwordMessage.textContent = "Unlocked! 💚";

            setTimeout(function () {
                window.location.href = "./birthday.html";
            }, 500);

        } else {

            passwordMessage.textContent =
                "Wrong password My lady...😏";

            passwordInput.value = "08s26";
        }

    });

}
// =========================
// BRIGHT RANDOM STARS ✨
// =========================

const starsCanvas = document.getElementById("starsCanvas");

if (starsCanvas) {

    const ctx = starsCanvas.getContext("2d");

    let stars = [];

    function createStars() {

        starsCanvas.width = window.innerWidth;
        starsCanvas.height = window.innerHeight;

        stars = [];

        for (let i = 0; i < 100; i++) {

            stars.push({
                x: Math.random() * starsCanvas.width,
                y: Math.random() * starsCanvas.height,

                // Slightly bigger stars
                size: Math.random() * 1.8 + 0.7,

                // Brighter stars
                opacity: Math.random() * 0.5 + 0.5,

                // Gentle twinkling
                speed: Math.random() * 0.008 + 0.004
            });

        }
    }

    function drawStars() {

        ctx.clearRect(
            0,
            0,
            starsCanvas.width,
            starsCanvas.height
        );

        stars.forEach(star => {

            star.opacity += star.speed;

            if (star.opacity >= 1) {
                star.opacity = 1;
                star.speed *= -1;
            }

            if (star.opacity <= 0.5) {
                star.opacity = 0.5;
                star.speed *= -1;
            }

            // ✨ Soft glow
            ctx.shadowBlur = 8;
            ctx.shadowColor = "white";

            ctx.beginPath();

            ctx.arc(
                star.x,
                star.y,
                star.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(255, 255, 255, ${star.opacity})`;

            ctx.fill();

            // Reset shadow
            ctx.shadowBlur = 0;
        });

        requestAnimationFrame(drawStars);
    }

    createStars();
    drawStars();

    window.addEventListener("resize", createStars);
}
