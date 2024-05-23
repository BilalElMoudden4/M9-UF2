const albumImg = document.getElementById('album-img');
const songTitle = document.getElementById('song-title');
const artist = document.getElementById('artist');
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPause');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const progressSlider = document.getElementById('progress');

let currentIndex = 0;
let songs = [];

fetch('songs.json')
    .then(response => response.json())
    .then(data => {
        songs = data.songs;
        loadSong(currentIndex);
    });

function loadSong(index) {
    const currentSong = songs[index];
    albumImg.src = currentSong.img;
    songTitle.innerText = currentSong.name;
    artist.innerText = currentSong.artist;
    audio.src = currentSong.path;
}

function playPause() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.innerHTML = '<span class="material-icons">pause</span>';
    } else {
        audio.pause();
        playPauseBtn.innerHTML = '<span class="material-icons">play_arrow</span>';
    }
}

function nextSong() {
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
    audio.pause();
    playPauseBtn.innerHTML = '<span class="material-icons">play_arrow</span>';
}

function prevSong() {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
    audio.pause();
    playPauseBtn.innerHTML = '<span class="material-icons">play_arrow</span>';
}

function updateProgress() {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressSlider.value = progress;
    progressSlider.style.setProperty('--value', progress);
}

function changeProgress() {
    const progress = (progressSlider.value / 100) * audio.duration;
    audio.currentTime = progress;
}

playPauseBtn.addEventListener('click', playPause);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
progressSlider.addEventListener('input', changeProgress);
audio.addEventListener('timeupdate', updateProgress);
