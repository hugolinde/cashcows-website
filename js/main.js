// The Cash Cows — site script

document.addEventListener('DOMContentLoaded', () => {
  initBackToTop();
  initNavHighlight();
  initAudioPlayer();
});

// ---- Back to top ----
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ---- Active nav link on scroll ----
function initNavHighlight() {
  const links = document.querySelectorAll('.nav-link');
  const sections = Array.from(links)
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  window.addEventListener('scroll', () => {
    let current = sections[0];
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) current = section;
    });
    links.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current.id}`);
    });
  });
}

// ---- Audio player ----
function initAudioPlayer() {
  const audio = document.getElementById('audio-player');
  const toggle = document.getElementById('play-toggle');
  const progress = document.getElementById('progress');
  const current = document.getElementById('time-current');
  const total = document.getElementById('time-total');
  const titleEl = document.querySelector('.player-title');
  const tracks = document.querySelectorAll('.track-list li');
  if (!audio || !toggle) return;

  const format = s => {
    if (!isFinite(s)) return '00:00';
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = Math.floor(s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const play = () => audio.play().catch(() => {});

  toggle.addEventListener('click', () => {
    if (audio.paused) {
      play();
    } else {
      audio.pause();
    }
  });

  audio.addEventListener('play', () => { toggle.setAttribute('aria-label', 'Pauzeren'); });
  audio.addEventListener('pause', () => { toggle.setAttribute('aria-label', 'Afspelen'); });

  audio.addEventListener('loadedmetadata', () => {
    total.textContent = format(audio.duration);
  });

  audio.addEventListener('timeupdate', () => {
    current.textContent = format(audio.currentTime);
    if (audio.duration) progress.value = (audio.currentTime / audio.duration) * 100;
  });

  progress.addEventListener('input', () => {
    if (audio.duration) audio.currentTime = (progress.value / 100) * audio.duration;
  });

  // Klik op een track in de lijst laadt en speelt die track
  tracks.forEach(track => {
    track.addEventListener('click', () => {
      const src = track.dataset.src;
      const title = track.dataset.title;
      if (!src) return;
      tracks.forEach(t => t.classList.remove('active'));
      track.classList.add('active');
      if (titleEl) titleEl.textContent = title;
      audio.src = src;
      progress.value = 0;
      current.textContent = '00:00';
      play();
    });
  });
}
