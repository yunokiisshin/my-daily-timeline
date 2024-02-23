export function timerOption () {

}

export function addNewTimerOption () {
    var timerOption = document.createElement('div');
    timerOption.classList.add('timer-option');
    timerOption.innerHTML = '<input type="text" class="timer-option-input" placeholder="00:00"><button class="remove-timer-option">Remove</button>';
    document.querySelector('.timer-options').appendChild(timerOption);
}

export function removeTimerOption () {
    var timerOption = document.querySelector('.timer-option');
    timerOption.remove();
}