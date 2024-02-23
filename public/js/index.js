TweenLite.defaultEase = Expo.easeOut;

var timerEl = document.querySelector('.timer');
var startBtn = document.querySelector('.start-timer'); // Ensure this button is in your HTML
var pauseBtn = document.querySelector('.pause-timer'); // Ensure this button is in your HTML
var resetBtn = document.querySelector('.reset-timer'); // Ensure this button is in your HTML

let timerInterval;
let seconds = 0; // This will be set based on the initial time provided to initTimer

let selectedTime = "00:11"; // This will be set based on the initial time provided to initTimer

function initTimer(t) {
    var minutesGroupEl = timerEl.querySelector('.minutes-group'),
        secondsGroupEl = timerEl.querySelector('.seconds-group'),

        minutesGroup = {
            firstNum: minutesGroupEl.querySelector('.first'),
            secondNum: minutesGroupEl.querySelector('.second')
        },

        secondsGroup = {
            firstNum: secondsGroupEl.querySelector('.first'),
            secondNum: secondsGroupEl.querySelector('.second')
        };

    // Convert initial time to total seconds
    seconds = parseInt(t.split(':')[0], 10) * 60 + parseInt(t.split(':')[1], 10);

    // Update the timer display with the initial time
    var initialMinutes = Math.floor(seconds / 60);
    var initialSeconds = seconds % 60;
    var initialTimeDigits = [
        Math.floor(initialMinutes / 10), 
        initialMinutes % 10, 
        Math.floor(initialSeconds / 10), 
        initialSeconds % 10
    ];
    updateTimerDisplay(initialTimeDigits); // Update the display with the initial time


    function updateTimer() {
        if (seconds > 0) {
            seconds--; // Decrement the seconds
            var minutes = Math.floor(seconds / 60);
            var remainingSeconds = seconds % 60;

            var timeNumbers = [Math.floor(minutes / 10), minutes % 10, Math.floor(remainingSeconds / 10), remainingSeconds % 10];
            updateTimerDisplay(timeNumbers);
        } else {
            countdownFinished();
        }
    }

    function updateTimerDisplay(arr) {
        animateNum(minutesGroup.firstNum, arr[0]);
        animateNum(minutesGroup.secondNum, arr[1]);
        animateNum(secondsGroup.firstNum, arr[2]);
        animateNum(secondsGroup.secondNum, arr[3]);
    }

    function animateNum(group, arrayValue) {
        TweenMax.killTweensOf(group.querySelector('.number-grp-wrp'));
        TweenMax.to(group.querySelector('.number-grp-wrp'), 1, {
            y: -group.querySelector('.num-' + arrayValue).offsetTop
        });
    }

    // Replace the original setTimeout call with the startTimer function
    function startTimer() {
        clearInterval(timerInterval); // Ensure any existing timer is cleared
        timerInterval = setInterval(updateTimer, 1000);
    }

    function pauseTimer() {
        clearInterval(timerInterval);
    }

    function resetTimer() {
        clearInterval(timerInterval);
        seconds = parseInt(t.split(':')[0], 10) * 60 + parseInt(t.split(':')[1], 10); // Reset seconds to initial value
        updateTimerDisplay(initialTimeDigits); // Reset display
    }

    // Event listeners for start, pause, reset, and reload
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
}

function countdownFinished() {
    setTimeout(function () {
        TweenMax.set(reloadBtn, { scale: 0.8, display: 'block' });
        TweenMax.to(timerEl, 1, { opacity: 0.2 });
        TweenMax.to(reloadBtn, 0.5, { scale: 1, opacity: 1 });
    }, 1000);
}


initTimer(selectedTime); // Initialize with desired start time
