const app = document.getElementById('app');
const audio = document.getElementById('meditation-audio');
const video = document.querySelector('video');
const playButton = document.querySelector('.play');
const timeDisplay = document.querySelector('.time-display');
const timeButtons = document.querySelectorAll('.time-select button');
const soundButtons = document.querySelectorAll('.sound-picker button');

let selectedDuration = 600;
let fakeDuration = selectedDuration;
let timer;
let isPlaying = true;

function updateDisplay(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0'); // Ensure seconds are two digits
  timeDisplay.textContent = `${mins}:${secs}`;
}

function updatePlayIcon() {
  playButton.innerHTML = isPlaying
    ? '<img src="https://img.icons8.com/ios-filled/50/pause--v1.png" width="40" />'
    : '<img src="https://img.icons8.com/ios-filled/50/play--v1.png" width="40" />';
}

function togglePlay() {
  console.log("Toggle Play called. Is Playing:", isPlaying); // Debugging log
  if (isPlaying) {
    audio.pause();
    video.pause();
    clearInterval(timer);
  } else {
    audio.play().catch((err) => console.log("Audio play blocked", err));
    video.play().catch((err) => console.log("Video play blocked", err));

    if (timer) clearInterval(timer);

    timer = setInterval(() => {
      fakeDuration--;
      updateDisplay(fakeDuration);

      if (fakeDuration <= 0) {
        clearInterval(timer);
        audio.pause();
        video.pause();
        audio.currentTime = 0;
        video.currentTime = 0;
        fakeDuration = selectedDuration;
        isPlaying = false;
        updatePlayIcon();
        updateDisplay(fakeDuration);
      }
    }, 1000);
  }

  isPlaying = !isPlaying;
  updatePlayIcon();
}

timeButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (btn.id === 'smaller-mins') selectedDuration = 120;
    if (btn.id === 'medium-mins') selectedDuration = 300;
    if (btn.id === 'long-mins') selectedDuration = 600;

    fakeDuration = selectedDuration;
    updateDisplay(fakeDuration);
  });
});

soundButtons.forEach((btn) => {
  btn.addEventListener('click', function () {
    const newSound = this.getAttribute('data-sound');
    const newVideo = this.getAttribute('data-video');

    audio.src = newSound;
    video.src = newVideo;

    if (isPlaying) {
      audio.play().catch((err) => console.log("Audio switch error", err));
      video.play().catch((err) => console.log("Video switch error", err));
    }
  });
});

playButton.addEventListener('click', togglePlay);

updateDisplay(fakeDuration);
