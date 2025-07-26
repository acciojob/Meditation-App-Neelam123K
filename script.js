const app = document.getElementById('app');
const audio = document.getElementById('meditation-audio');
const video = document.querySelector('video');
const playButton = document.querySelector('.play');
const timeDisplay = document.querySelector('.time-display');
const timeButtons = document.querySelectorAll('.time-select button');
const soundButtons = document.querySelectorAll('.sound-picker button');

let selectedDuration = 600; // default 10 min
let fakeDuration = selectedDuration;
let timer;
let isPlaying = false;

// Update time display
function updateDisplay(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  timeDisplay.textContent = `${mins}:${secs}`;
}

// Handle play/pause toggle
function togglePlay() {
  if (isPlaying) {
    audio.pause();
    clearInterval(timer);
  } else {
    audio.play();
    timer = setInterval(() => {
      fakeDuration--;
      updateDisplay(fakeDuration);
      if (fakeDuration <= 0) {
        clearInterval(timer);
        audio.pause();
        audio.currentTime = 0;
        fakeDuration = selectedDuration;
        updateDisplay(fakeDuration);
        isPlaying = false;
        updatePlayIcon();
      }
    }, 1000);
  }
  isPlaying = !isPlaying;
  updatePlayIcon();
}

function updatePlayIcon() {
  playButton.innerHTML = isPlaying
    ? '<img src="https://img.icons8.com/ios-filled/50/pause--v1.png" width="40" />'
    : '<img src="https://img.icons8.com/ios-filled/50/play--v1.png" width="40" />';
}

// Time selection
timeButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (btn.id === 'smaller-mins') selectedDuration = 120;
    if (btn.id === 'medium-mins') selectedDuration = 300;
    if (btn.id === 'long-mins') selectedDuration = 600;
    fakeDuration = selectedDuration;
    updateDisplay(fakeDuration);
  });
});

// Sound and video switch
soundButtons.forEach((btn) => {
  btn.addEventListener('click', function () {
    audio.src = this.getAttribute('data-sound');
    video.src = this.getAttribute('data-video');
    if (isPlaying) {
      audio.play();
      video.play();
    }
  });
});

// Play/pause click
playButton.addEventListener('click', togglePlay);

// Initialize display
updateDisplay(fakeDuration);
