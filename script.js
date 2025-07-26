//your JS code here. If required.
const videoElement = document.getElementById('meditation-video');
const audioElement = document.getElementById('meditation-audio');
const timeDisplay = document.querySelector('.time-display');

document.getElementById('beach-sound').addEventListener('click', () => {
    audioElement.src = 'Sounds/beach.mp3';
    audioElement.play();
    videoElement.src = 'video/beach.mp4';
    videoElement.play();
});

document.getElementById('rain-sound').addEventListener('click', () => {
    audioElement.src = 'Sounds/rain.mp3';
    audioElement.play();
    videoElement.src = 'video/rain.mp4';
    videoElement.play();
});

document.getElementById('smaller-mins').addEventListener('click', () => {
    timeDisplay.textContent = '2:0';
});

document.getElementById('medium-mins').addEventListener('click', () => {
    timeDisplay.textContent = '5:0';
});

document.getElementById('long-mins').addEventListener('click', () => {
    timeDisplay.textContent = '10:0';
});

document.querySelector('.play').addEventListener('click', () => {
    if (audioElement.paused) {
        audioElement.play();
    } else {
        audioElement.pause();
    }
});