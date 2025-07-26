const app = document.getElementById('app');
const audio = document.getElementById('meditation-audio');
const video = document.querySelector('video');
const playButton = document.querySelector('.play');
const timeDisplay = document.querySelector('.time-display');
const timeButtons = document.querySelectorAll('.time-select button');
const soundButtons = document.querySelectorAll('.sound-picker button');

let fakeDuration = 600; // default 10 min
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
        updateDisplay(0);
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
    ? <img src="https://img.icons8.com/ios-filled/50/pause--v1.png" width="40" />
    : <img src="https://img.icons8.com/ios-filled/50/play--v1.png" width="40" />;
}

// Event listener for time selection
timeButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (btn.id === 'smaller-mins') fakeDuration = 120;
    if (btn.id === 'medium-mins') fakeDuration = 300;
    if (btn.id === 'long-mins') fakeDuration = 600;
    updateDisplay(fakeDuration);
  });
});

// Event listener for sound/video switching
soundButtons.forEach((btn) => {
  btn.addEventListener('click', function () {
    audio.src = this.getAttribute('data-sound');
    video.src = this.getAttribute('data-video');
    if (isPlaying) {
      audio.play();
    }
  });
});

// Play/pause button
playButton.addEventListener('click', togglePlay);

// Initialize display
updateDisplay(fakeDuration);