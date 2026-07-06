// Elements
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progressContainer');
const current = document.getElementById('current');
const duration = document.getElementById('duration');

// State
let playing = false;
let currentSurah = 1;

// Surah Names
const surahNames = [
  "Al-Fatiha","Al-Baqarah","Aal-E-Imran","An-Nisa","Al-Ma'idah",
  "Al-An'am","Al-A'raf","Al-Anfal","At-Tawbah","Yunus",
  "Hud","Yusuf","Ar-Ra'd","Ibrahim","Al-Hijr",
  "An-Nahl","Al-Isra","Al-Kahf","Maryam","Ta-Ha",
  "Al-Anbiya","Al-Hajj","Al-Mu'minun","An-Nur","Al-Furqan",
  "Ash-Shu'ara","An-Naml","Al-Qasas","Al-Ankabut","Ar-Rum",
  "Luqman","As-Sajdah","Al-Ahzab","Saba","Fatir",
  "Ya-Sin","As-Saffat","Sad","Az-Zumar","Ghafir",
  "Fussilat","Ash-Shura","Az-Zukhruf","Ad-Dukhan","Al-Jathiyah",
  "Al-Ahqaf","Muhammad","Al-Fath","Al-Hujurat","Qaf",
  "Adh-Dhariyat","At-Tur","An-Najm","Al-Qamar","Ar-Rahman",
  "Al-Waqi'ah","Al-Hadid","Al-Mujadila","Al-Hashr","Al-Mumtahanah",
  "As-Saff","Al-Jumu'ah","Al-Munafiqun","At-Taghabun","At-Talaq",
  "At-Tahrim","Al-Mulk","Al-Qalam","Al-Haqqah","Al-Ma'arij",
  "Nuh","Al-Jinn","Al-Muzzammil","Al-Muddathir","Al-Qiyamah",
  "Al-Insan","Al-Mursalat","An-Naba","An-Nazi'at","Abasa",
  "At-Takwir","Al-Infitar","Al-Mutaffifin","Al-Inshiqaq","Al-Buruj",
  "At-Tariq","Al-A'la","Al-Ghashiyah","Al-Fajr","Al-Balad",
  "Ash-Shams","Al-Layl","Ad-Duha","Ash-Sharh","At-Tin",
  "Al-Alaq","Al-Qadr","Al-Bayyina","Az-Zalzalah","Al-Adiyat",
  "Al-Qari'ah","At-Takathur","Al-Asr","Al-Humazah","Al-Fil",
  "Quraysh","Al-Ma'un","Al-Kawthar","Al-Kafirun","An-Nasr",
  "Al-Masad","Al-Ikhlas","Al-Falaq","An-Nas"
];

// Load Surah
function loadSurah(number) {
  let fileNumber = number.toString().padStart(3, '0');

  audio.src = `assets/audio/${fileNumber}.mp3`;

  document.querySelector('.surah').innerText =
    `Surah - ${surahNames[number - 1]} (${number}:1)`;

  audio.load();
}

// Play
function playAudio() {
  audio.play();
  playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  playBtn.classList.add('active');
  playing = true;
}

// Pause
function pauseAudio() {
  audio.pause();
  playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  playBtn.classList.remove('active');
  playing = false;
}

// Play button
playBtn.onclick = () => {
  playing ? pauseAudio() : playAudio();
};

// Next
document.getElementById('next').onclick = () => {
  currentSurah++;
  if (currentSurah > 114) currentSurah = 1;

  loadSurah(currentSurah);
  playAudio();
};

// Prev
document.getElementById('prev').onclick = () => {
  currentSurah--;
  if (currentSurah < 1) currentSurah = 114;

  loadSurah(currentSurah);
  playAudio();
};

// Auto next
audio.addEventListener('ended', () => {
  document.getElementById('next').click();
});

// Progress update
audio.addEventListener('timeupdate', () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = percent + "%";

  let m = Math.floor(audio.currentTime / 60);
  let s = Math.floor(audio.currentTime % 60);
  if (s < 10) s = "0" + s;
  current.innerText = `${m}:${s}`;

  if (audio.duration) {
    let dm = Math.floor(audio.duration / 60);
    let ds = Math.floor(audio.duration % 60);
    if (ds < 10) ds = "0" + ds;
    duration.innerText = `${dm}:${ds}`;
  }
});

// Seek
progressContainer.addEventListener('click', (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
});

// Init
loadSurah(currentSurah);