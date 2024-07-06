const music = document.querySelector("audio");
const prevBtn = document.querySelector("#prev");
const playBtn = document.querySelector("#play");
const nextBtn = document.querySelector("#next");

function swapPausePlayIcons(isPlaying) {
  if (isPlaying) {
    if (playBtn.classList.contains("fa-pause")) return;
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
  } else {
    if (playBtn.classList.contains("fa-play")) return;
    playBtn.classList.replace("fa-pause", "fa-play");
    playBtn.setAttribute("title", "Play");
  }
}

//check if playing
let isPlaying = false;
// Play
function playSong() {
  isPlaying = true;
  swapPausePlayIcons(isPlaying);
  music.play();
}
// Pause
function pauseSong() {
  isPlaying = false;
  swapPausePlayIcons(isPlaying);

  music.pause();
}

// Play or pause event listener
playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});
