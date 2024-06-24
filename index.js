const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img'),
    volumeControl = document.getElementById('volume-control'),
    volumeIconXmark = document.getElementById('volume-icon-xmark'),
    volumeIconOff = document.getElementById('volume-icon-off'),
    volumeIconLow = document.getElementById('volume-icon-low'),
    volumeIconHigh = document.getElementById('volume-icon-high');

const music = new Audio();

const songs = [
    {
        path: 'assets/4.mp3',
        displayName: 'Automotivo Empurra',
        cover: 'assets/4.jpg',
        artist: 'Sma$her',
    },
    {
        path: 'assets/2.mp3',
        displayName: 'You Will Never See Me Coming',
        cover: 'assets/2.jpg',
        artist: 'NEFFEX',
    },
    {
        path: 'assets/3.mp3',
        displayName: 'Intellect',
        cover: 'assets/3.jpg',
        artist: 'Yung Logos',
    },
    {
        path: 'assets/6.mp3',
        displayName: 'Lo-fi Type Beat - rain',
        cover: 'assets/6.jpg',
        artist: 'Lee',
    },
    {
        path: 'assets/5.mp3',
        displayName: 'Krushed!',
        cover: 'assets/5.jpg',
        artist: '$werve, SXCREDMANE, FXRCE',
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

function setVolume(e) {
    const volume = e.target.value;
    music.volume = volume;

    // Actualizar el ícono de volumen según el nivel de volumen
    if (volume == 0) {
        toggleVolumeIcons(volumeIconXmark); // Mute (volume off)
    } else if (volume > 0 && volume <= 0.3) {
        toggleVolumeIcons(volumeIconLow); // Low volume
    } else if (volume > 0.3 && volume <= 0.6) {
        toggleVolumeIcons(volumeIconLow); // Medium volume
    } else {
        toggleVolumeIcons(volumeIconHigh); // High volume
    }
}

// Función para cambiar los íconos de volumen visibles
function toggleVolumeIcons(activeIcon) {
    const icons = [volumeIconXmark, volumeIconOff, volumeIconLow, volumeIconHigh];
    icons.forEach(icon => icon.classList.remove('active'));
    activeIcon.classList.add('active');
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);
volumeControl.addEventListener('input', setVolume);

// Cargar la primera canción al inicio
loadMusic(songs[musicIndex]);

// Configurar el ícono de volumen inicial
toggleVolumeIcons(volumeIconHigh);