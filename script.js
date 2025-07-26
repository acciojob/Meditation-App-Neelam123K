//your JS code here. If required.
const app = document.getElementById('app');
const video = document.querySelector(".video");
const audio = document.querySelector(".audio");
const playBtn = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");
const timeButtons = document.querySelectorAll("#time-select button");
const soundButtons = document.querySelectorAll(".sound-picker button");

let fakeDuration = 600; 
let isPlaying = false;

timeButtons.forEach(button => {
  button.addEventListener("click", function () {
    if (this.id === "smaller-mins") fakeDuration = 120;
    if (this.id === "medium-mins") fakeDuration = 300;
    if (this.id === "long-mins") fakeDuration = 600;
    updateTimeDisplay(fakeDuration);
  });
});

// Play/Pause functionality
playBtn.addEventListener("click", () => {
  if (!isPlaying) {
    audio.play();
    video.play();
    isPlaying = true;
    playBtn.innerHTML = `<img src="https://img.icons8.com/ios-filled/50/pause.png"/>`;
  } else {
    audio.pause();
    video.pause();
    isPlaying = false;
    playBtn.innerHTML = `<img src="https://img.icons8.com/ios-filled/50/play.png"/>`;
  }
});

soundButtons.forEach(btn => {
  btn.addEventListener("click", function () {
    const newSound = this.getAttribute("data-sound");
    const newVideo = this.getAttribute("data-video");

    audio.src = newSound;
    video.src = newVideo;

    if (isPlaying) {
      audio.play();
      video.play();
    }
  });
});

audio.ontimeupdate = () => {
  let currentTime = audio.currentTime;
  let remaining = fakeDuration - currentTime;
  let minutes = Math.floor(remaining / 60);
  let seconds = Math.floor(remaining % 60);

  timeDisplay.textContent = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;

  if (currentTime >= fakeDuration) {
    audio.pause();
    video.pause();
    audio.currentTime = 0;
    video.currentTime = 0;
    isPlaying = false;
    playBtn.innerHTML = `<img src="https://img.icons8.com/ios-filled/50/play.png"/>`;
    updateTimeDisplay(fakeDuration);
  }
};

// Set initial time display
function updateTimeDisplay(duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  timeDisplay.textContent = `${minutes}:${seconds}`;
}
