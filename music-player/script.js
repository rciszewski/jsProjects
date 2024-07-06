const image = document.querySelector("img");
const title = document.querySelector("#title");
const artist = document.querySelector("#artist");
const music = document.querySelector("audio");
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

function incrementSongSelection() {
  const currentSongIdx = songs.findIndex((song) => {
    return song.displayName === title.textContent;
  });
  if (currentSongIdx === -1) return;
  if (currentSongIdx === songs.length - 1) {
    image.src = `img/${songs[0].name}.jpg`;
    title.textContent = songs[0].displayName;
    artist.textContent = songs[0].artist;
    music.src = `music/${songs[0].name}.mp3`;
    if (isPlaying) playSong();
  } else {
    image.src = `img/${songs[currentSongIdx + 1].name}.jpg`;
    title.textContent = songs[currentSongIdx + 1].displayName;
    artist.textContent = songs[currentSongIdx + 1].artist;
    music.src = `music/${songs[currentSongIdx + 1].name}.mp3`;
    if (isPlaying) playSong();
  }
}
function decrementSongSelection() {
  const currentSongIdx = songs.findIndex((song) => {
    return song.displayName === title.textContent;
  });
  if (currentSongIdx === -1) return;
  if (currentSongIdx === 0) {
    image.src = `img/${songs[songs.length - 1].name}.jpg`;
    title.textContent = songs[songs.length - 1].displayName;
    artist.textContent = songs[songs.length - 1].artist;
    music.src = `music/${songs[songs.length - 1].name}.mp3`;
    if (isPlaying) playSong();
  } else {
    image.src = `img/${songs[currentSongIdx - 1].name}.jpg`;
    title.textContent = songs[currentSongIdx - 1].displayName;
    artist.textContent = songs[currentSongIdx - 1].artist;
    music.src = `music/${songs[currentSongIdx - 1].name}.mp3`;
    if (isPlaying) playSong();
  }
}
// Play or pause event listener
playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});
nextBtn.addEventListener("click", incrementSongSelection);
prevBtn.addEventListener("click", decrementSongSelection);

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

//On Load - select first song
loadSong(songs[3]);
