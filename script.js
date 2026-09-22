// Birthday date: 8 October 2026, 12:00 AM IST
const birthday = new Date("2026-10-08T00:00:00+05:30").getTime();

const startButton = document.getElementById("startButton");

const intro = document.getElementById("intro");
const countdownSection = document.getElementById("countdownSection");
const birthdayMessage = document.getElementById("birthdayMessage");

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");


// -------------------------
// Tick sound
// -------------------------

let audioContext;

function playTick() {

    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(900, audioContext.currentTime);

    gain.gain.setValueAtTime(0.08, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.08
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.08);
}


// -------------------------
// Start button
// -------------------------

startButton.addEventListener("click", function () {

    // Allow browser audio
    audioContext = new (
        window.AudioContext ||
        window.webkitAudioContext
    )();

    audioContext.resume();

    // Hide intro
    intro.classList.add("hidden");

    // Show countdown
    countdownSection.classList.remove("hidden");

    // Start countdown
    updateCountdown();

    setInterval(updateCountdown, 1000);
});


// -------------------------
// Countdown
// -------------------------

function updateCountdown() {

    const now = new Date().getTime();

    const difference = birthday - now;


    // Birthday has arrived
    if (difference <= 0) {

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        // Stop ticking
        if (audioContext) {
            audioContext.close();
        }

        // Small delay before showing birthday message
        setTimeout(() => {

            countdownSection.classList.add("hidden");
            birthdayMessage.classList.remove("hidden");

        }, 1000);

        return;
    }


    // Calculate time
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


    // Display
    daysElement.textContent = String(days).padStart(2, "0");

    hoursElement.textContent =
        String(hours).padStart(2, "0");

    minutesElement.textContent =
        String(minutes).padStart(2, "0");

    secondsElement.textContent =
        String(seconds).padStart(2, "0");


    // Tick
    playTick();
}
