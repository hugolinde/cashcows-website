// The Cash Cows — site script

document.addEventListener('DOMContentLoaded', () => {
  initBackToTop();
  initMobileNav();
  initNavHighlight();
  initAudioPlayer();
  initLoadMore();
  initPhotoLoadMore();
});

// ---- Back to top ----
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ---- Mobiel uitklapmenu ----
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  links.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---- Actieve nav-link tijdens scrollen ----
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

  const showPause = () => {
    toggle.classList.add('is-playing');
    toggle.setAttribute('aria-label', 'Pauzeren');
  };
  const showPlay = () => {
    toggle.classList.remove('is-playing');
    toggle.setAttribute('aria-label', 'Afspelen');
  };

  const play = () => audio.play().catch(() => {});

  toggle.addEventListener('click', () => {
    if (audio.paused) {
      play();
    } else {
      audio.pause();
    }
  });

  audio.addEventListener('play', showPause);
  audio.addEventListener('pause', showPlay);

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

// ---- Laad meer (video's): toont standaard 8, knop laadt de rest. Nogmaals klikken klapt weer in ----
function initLoadMore() {
  document.querySelectorAll('.load-more-btn').forEach(btn => {
    const grid = document.getElementById(btn.dataset.target);
    if (!grid) return;
    const batch = parseInt(btn.dataset.batch, 10) || 8;
    const items = Array.from(grid.children);

    items.forEach((item, i) => {
      if (i >= batch) item.hidden = true;
    });

    if (items.length <= batch) {
      btn.hidden = true;
      return;
    }
    btn.hidden = false;

    let expanded = false;
    btn.addEventListener('click', () => {
      expanded = !expanded;
      items.forEach((item, i) => {
        item.hidden = expanded ? false : i >= batch;
      });
      btn.textContent = expanded ? 'Minder laden' : 'Meer laden';
      if (!expanded) grid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });
}

// ---- Foto's op mobiel: toont een deel, met laad-meer knop. Op desktop altijd alles. ----
function initPhotoLoadMore() {
  const grid = document.getElementById('photo-grid');
  const btn = document.querySelector('.photo-load-more');
  if (!grid || !btn) return;

  const items = Array.from(grid.children);
  const batch = parseInt(btn.dataset.batch, 10) || 16;
  const mq = window.matchMedia('(max-width: 700px)');
  let shown = batch;

  const apply = () => {
    shown = batch;
    if (mq.matches) {
      items.forEach((item, i) => { item.hidden = i >= batch; });
      btn.hidden = items.length <= batch;
    } else {
      items.forEach(item => { item.hidden = false; });
      btn.hidden = true;
    }
  };

  btn.addEventListener('click', () => {
    items.slice(shown, shown + batch).forEach(item => { item.hidden = false; });
    shown += batch;
    if (shown >= items.length) btn.hidden = true;
  });

  mq.addEventListener('change', apply);
  apply();
}
