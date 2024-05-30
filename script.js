const imgAlbum = document.getElementById('album-img');
const tituloCancion = document.getElementById('song-title');
const artista = document.getElementById('artist');
const audio = document.getElementById('audio');
const botonPlayPausa = document.getElementById('playPause');
const botonSiguiente = document.getElementById('next');
const botonAnterior = document.getElementById('prev');
const barraProgreso = document.getElementById('progress');

let indiceActual = 0;
let canciones = [];

fetch('songs.json')
    .then(response => response.json())
    .then(data => {
        canciones = data.songs;
        cargarCancion(indiceActual);
    });

function cargarCancion(indice) {
    const cancionActual = canciones[indice];
    imgAlbum.src = cancionActual.img;
    tituloCancion.innerText = cancionActual.name;
    artista.innerText = cancionActual.artist;
    audio.src = cancionActual.path;
}

function reproducirPausar() {
    if (audio.paused) {
        audio.play();
        botonPlayPausa.innerHTML = '<span class="material-icons">pause</span>';
        imgAlbum.classList.add('rotating');
    } else {
        audio.pause();
        botonPlayPausa.innerHTML = '<span class="material-icons">play_arrow</span>';
        imgAlbum.classList.remove('rotating');
    }
}

function siguienteCancion() {
    indiceActual = (indiceActual + 1) % canciones.length;
    cargarCancion(indiceActual);
    audio.pause();
    botonPlayPausa.innerHTML = '<span class="material-icons">play_arrow</span>';
    imgAlbum.classList.remove('rotating');
}

function anteriorCancion() {
    indiceActual = (indiceActual - 1 + canciones.length) % canciones.length;
    cargarCancion(indiceActual);
    audio.pause();
    botonPlayPausa.innerHTML = '<span class="material-icons">play_arrow</span>';
    imgAlbum.classList.remove('rotating');
}

function actualizarProgreso() {
    const progreso = (audio.currentTime / audio.duration) * 100;
    barraProgreso.value = progreso;
    barraProgreso.style.setProperty('--value', progreso);
}

function cambiarProgreso() {
    const progreso = (barraProgreso.value / 100) * audio.duration;
    audio.currentTime = progreso;
}

botonPlayPausa.addEventListener('click', reproducirPausar);
botonSiguiente.addEventListener('click', siguienteCancion);
botonAnterior.addEventListener('click', anteriorCancion);
barraProgreso.addEventListener('input', cambiarProgreso);
audio.addEventListener('timeupdate', actualizarProgreso);
audio.addEventListener('play', () => imgAlbum.classList.add('rotating'));
audio.addEventListener('pause', () => imgAlbum.classList.remove('rotating'));
