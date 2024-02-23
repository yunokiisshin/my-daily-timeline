// LEGACY CODE

// Get the timer elements
const timerDisplay = document.querySelector('.timer--clock');
const startButton = document.querySelector('.start-timer');
const pauseButton = document.querySelector('.pause-timer');
const resetButton = document.querySelector('.reset-timer');

let timerInterval;
let seconds = 0;

// Function to start the timer
function startTimer() {
  timerInterval = setInterval(() => {
    seconds++;
    updateTimerDisplay();
  }, 1000);
}

// Function to pause the timer
function pauseTimer() {
  clearInterval(timerInterval);
}

// Function to reset the timer
function resetTimer() {
  clearInterval(timerInterval);
  seconds = 0;
  updateTimerDisplay();
}

// Function to update the timer display
function updateTimerDisplay() {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const minutesDisplay = String(minutes).padStart(2, '0');
  const secondsDisplay = String(remainingSeconds).padStart(2, '0');

  timerDisplay.textContent = `${minutesDisplay}:${secondsDisplay}`;
}

// Event listeners for the buttons
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
