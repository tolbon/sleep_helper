
const circle = document.querySelector('.circle');
const toggleBtn = document.getElementById('toggle');
const timerDisplay = document.getElementById('timer');

// Durée max en secondes (ex: 5 minutes)
const maxDuration = 5 * 60;
let remainingTime = maxDuration;

let isPlaying = false;
let intervalId = null;
let countdownId = null;

function toggleAnimation() {
  isPlaying = !isPlaying;

  if (isPlaying) {
    circle.classList.remove('paused');
    toggleBtn.textContent = '⏸️ Pause';
    startCountdown();
  } else {
    circle.classList.add('paused');
    toggleBtn.textContent = '▶️ Démarrer';
    stopCountdown();
  }
}

function startCountdown() {
  if (intervalId || countdownId) return;

  intervalId = setTimeout(() => {
    toggleAnimation(); // stop when time is up
  }, remainingTime * 1000);

  countdownId = setInterval(() => {
    remainingTime--;
    updateTimerDisplay();

    if (remainingTime <= 0) {
      clearInterval(countdownId);
      countdownId = null;
    }
  }, 1000);
}

function stopCountdown() {
  clearTimeout(intervalId);
  clearInterval(countdownId);
  intervalId = null;
  countdownId = null;
}

function updateTimerDisplay() {
  const minutes = String(Math.floor(remainingTime / 60)).padStart(2, '0');
  const seconds = String(remainingTime % 60).padStart(2, '0');
  timerDisplay.textContent = `Durée restante : ${minutes}:${seconds}`;
}

// Initialiser
updateTimerDisplay();
toggleBtn.addEventListener('click', toggleAnimation);
