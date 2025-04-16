let timeLeft = 25 * 60; // 25 minutes in seconds
let timerId = null;
let isWorkTime = true;

const timeDisplay = document.querySelector('.time-display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const workButton = document.getElementById('work');
const restButton = document.getElementById('rest');
const currentMode = document.getElementById('current-mode');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (timerId === null) {
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                isWorkTime = !isWorkTime;
                
                if (isWorkTime) {
                    timeLeft = 25 * 60;
                    currentMode.textContent = 'Work Time';
                } else {
                    timeLeft = 5 * 60;
                    currentMode.textContent = 'Break Time';
                }
                
                updateDisplay();
                // Play a sound or show a notification here
                alert(isWorkTime ? 'Break time is over! Time to work!' : 'Work time is over! Take a break!');
            }
        }, 1000);
    }
}

function pauseTimer() {
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
    }
}

function resetTimer() {
    pauseTimer();
    isWorkTime = true;
    timeLeft = 25 * 60;
    currentMode.textContent = 'Work Time';
    updateDisplay();
}

function setWorkMode() {
    pauseTimer();
    isWorkTime = true;
    timeLeft = 25 * 60;
    currentMode.textContent = 'Work Time';
    updateDisplay();
}

function setRestMode() {
    pauseTimer();
    isWorkTime = false;
    timeLeft = 5 * 60;
    currentMode.textContent = 'Break Time';
    updateDisplay();
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
workButton.addEventListener('click', setWorkMode);
restButton.addEventListener('click', setRestMode);

// Initialize display
updateDisplay(); 