TweenLite.defaultEase = Expo.easeOut;

var timerEl = document.querySelector('.timer');
var startBtn = document.querySelector('.start-timer');
var pauseBtn = document.querySelector('.pause-timer');
var resetBtn = document.querySelector('.reset-timer');
var timerInterval;
var initialTime = 3; // Default timer setting
var currentTime = initialTime;

function formatTime(seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var seconds = seconds % 60;
    var arr = [
        Math.floor(hours / 10), hours % 10,
        Math.floor(minutes / 10), minutes % 10,
        Math.floor(seconds / 10), seconds % 10,
    ];
    return arr;
}

function updateTimerDisplay(timeDigits) {
    var groups = ['hours', 'minutes', 'seconds'].map(function(label) {
        return {
            firstNum: timerEl.querySelector('.' + label + '-group .first'),
            secondNum: timerEl.querySelector('.' + label + '-group .second')
        };
    });

    groups.forEach(function(group, index) {
        animateNum(group.firstNum, timeDigits[index * 2]);
        animateNum(group.secondNum, timeDigits[index * 2 + 1]);
    });
}

// pass integer value of seconds to this function
function initTimer(t) {
    updateTimerDisplay(formatTime(t));

    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
    
    // Add event listeners to timer-option buttons
    document.querySelectorAll('.timer-option').forEach(function(option) {
        option.addEventListener('click', function() {
            addTime(this.textContent); // Pass the button's text content to addTime function
        });
    });
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(function() {
        if (currentTime > 0) {
            currentTime--;
            updateTimerDisplay(formatTime(currentTime));
        } else {
            countdownFinished();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    clearInterval(timerInterval);
    updateTimerDisplay(formatTime(initialTime));
}

function animateNum(group, value) {
    const wrapper = group.querySelector('.number-grp-wrp');
    const targetNum = wrapper.querySelector('.num-' + value);
    if (targetNum) {
        TweenMax.killTweensOf(wrapper);
        TweenMax.to(wrapper, 1, { y: -targetNum.offsetTop });
    } else {
        console.error('Target number element not found:', '.num-' + value);
    }
}

function countdownFinished() {
    clearInterval(timerInterval);
    alert("Countdown finished!");
}

function addTime(text) {
    console.log('Adding time:', text);
    var parts = text.trim().split(' ');
    var value = parseInt(parts[0], 10);
    var unit = parts[1].toLowerCase();
    console.log(value, unit);
    switch(unit) {
        case 'hour':
        case 'hours':
            currentTime += value * 3600;
            break;
        case 'minute':
        case 'minutes':
            currentTime += value * 60;
            break;
        // Additional cases for other units can be added here
    }

    updateTimerDisplay(formatTime(currentTime));
}

initTimer(initialTime); // Initialize timer with default time
