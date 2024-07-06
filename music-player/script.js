const image = document.querySelector("img");
const title = document.querySelector("#title");
const artist = document.querySelector("#artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentSongDuration = document.getElementById("duration");
const currentSongTime = document.getElementById("current-time");
const prevBtn = document.querySelector("#prev");
const playBtn = document.querySelector("#play");
const nextBtn = document.querySelector("#next");

//Music
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight, Disco Queen",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Metric/Jacinto Design",
  },
];

function swapPausePlayIcons() {
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
  swapPausePlayIcons();
  music.play();
}
// Pause
function pauseSong() {
  isPlaying = false;
  swapPausePlayIcons(isPlaying);

  music.pause();
}

function incrementSongSelection() {
  const currentSongIdx = songs.findIndex((song) => {
    return song.displayName === title.innerText;
  });
  if (currentSongIdx === -1) return;
  if (currentSongIdx === songs.length - 1) {
    image.src = `img/${songs[0].name}.jpg`;
    title.innerText = songs[0].displayName;
    artist.innerText = songs[0].artist;
    music.src = `music/${songs[0].name}.mp3`;
    if (isPlaying) playSong();
  } else {
    image.src = `img/${songs[currentSongIdx + 1].name}.jpg`;
    title.innerText = songs[currentSongIdx + 1].displayName;
    artist.innerText = songs[currentSongIdx + 1].artist;
    music.src = `music/${songs[currentSongIdx + 1].name}.mp3`;
    if (isPlaying) playSong();
  }
}
function decrementSongSelection() {
  const currentSongIdx = songs.findIndex((song) => {
    return song.displayName === title.innerText;
  });
  if (currentSongIdx === -1) return;
  if (currentSongIdx === 0) {
    image.src = `img/${songs[songs.length - 1].name}.jpg`;
    title.innerText = songs[songs.length - 1].displayName;
    artist.innerText = songs[songs.length - 1].artist;
    music.src = `music/${songs[songs.length - 1].name}.mp3`;
    if (isPlaying) playSong();
  } else {
    image.src = `img/${songs[currentSongIdx - 1].name}.jpg`;
    title.innerText = songs[currentSongIdx - 1].displayName;
    artist.innerText = songs[currentSongIdx - 1].artist;
    music.src = `music/${songs[currentSongIdx - 1].name}.mp3`;
    if (isPlaying) playSong();
  }
}

// Update DOM
function loadSong(song) {
  title.innerText = song.displayName;
  artist.innerText = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

//On Load - select first song
loadSong(songs[3]);

// Update progress bar & time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    //update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    //calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    //Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      currentSongDuration.innerText = `${durationMinutes}:${durationSeconds}`;
    }

    //calculate display for duration
    const currentTimeMinutes = Math.floor(currentTime / 60);
    let currentTimeSeconds = Math.floor(currentTime % 60);
    if (currentTimeSeconds < 10) {
      currentTimeSeconds = `0${currentTimeSeconds}`;
    }
    //Delay switching duration Element to avoid NaN
    if (currentTimeSeconds) {
      currentSongTime.innerText = `${currentTimeMinutes}:${currentTimeSeconds}`;
    }
  }
}

function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  console.log(clickX / width);
  console.log((clickX / width) * duration);
  music.currentTime = (clickX / width) * duration;
}

// Play or pause event listener
playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});
nextBtn.addEventListener("click", incrementSongSelection);
prevBtn.addEventListener("click", decrementSongSelection);
music.addEventListener('ended', incrementSongSelection)
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
