/* ==============================================================
   CONFIG — edit ini untuk mengganti isi situs
============================================================== */
const CONFIG = {
  name: "Fidela",
  age: 24,
  musicSrc: "assets/audio/backsound.mp3",

  // Tambah/ganti foto di sini sebanyak apapun — rail-nya otomatis bisa
  // digulir (scroll horizontal), jadi tidak ada batas jumlah foto.
  // Taruh file fotonya di assets/img/ dengan nama yang sama persis
  // seperti di bawah.
  stories: [
    { src: "assets/img/foto1.jpeg", caption: "Fidela💖" },
    { src: "assets/img/foto2.jpeg", caption: "Fidela💖" },
    { src: "assets/img/foto3.jpeg", caption: "Fidela💖" },
    { src: "assets/img/foto4.jpeg", caption: "Fidela💖" },
    { src: "assets/img/foto5.jpeg", caption: "Fidela💖" },
    { src: "assets/img/foto6.jpeg", caption: "Fidela💖" },
    { src: "assets/img/foto7.jpeg", caption: "Fidela💖" },
    { src: "assets/img/foto8.jpeg", caption: "Fidela💖" },
    { src: "assets/img/foto9.jpeg", caption: "Fidela💖" },
    { src: "assets/img/foto10.jpeg", caption: "Fidela💖" },
{ src: "assets/img/foto11.jpeg", caption: "Fidela💖" },
    { src: "assets/img/foto12.jpeg", caption: "Fidela💖" },
    { src: "assets/img/foto13.jpeg", caption: "Fidela💖" },
    { src: "assets/img/foto14.jpeg", caption: "Fidela💖" },
    { src: "assets/img/foto15.jpeg", caption: "Fidela💖" },
    { src: "assets/img/foto16.jpeg", caption: "Fidela💖" },
    { src: "assets/img/foto17.jpeg", caption: "Fidela💖" },
    { src: "assets/img/foto18.jpeg", caption: "Fidela💖" },
    { src: "assets/img/foto19.jpeg", caption: "Fidela💖" },
    { src: "assets/img/foto20.jpeg", caption: "Fidela💖" },
  ],
};

/* ==============================================================
   UTIL
============================================================== */
const $ = (sel) => document.querySelector(sel);
const rand = (min, max) => Math.random() * (max - min) + min;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ==============================================================
   CUSTOM CURSOR + TRAIL (desktop only)
============================================================== */
(function initCursor() {
  if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

  const dot = document.createElement("div");
  dot.className = "cursor-dot";
  document.body.appendChild(dot);

  const trailPool = [];
  const TRAIL_SIZE = 14;
  for (let i = 0; i < TRAIL_SIZE; i++) {
    const t = document.createElement("div");
    t.className = "cursor-trail";
    t.style.opacity = "0";
    document.body.appendChild(t);
    trailPool.push({ el: t, x: 0, y: 0 });
  }

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let trailIndex = 0;

  window.addEventListener("mousemove", (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + "px"; dot.style.top = my + "px";

    trailIndex = (trailIndex + 1) % trailPool.length;
    const t = trailPool[trailIndex];
    t.el.style.left = mx + rand(-4, 4) + "px";
    t.el.style.top = my + rand(-4, 4) + "px";
    t.el.style.opacity = "0.7";
    t.el.style.transition = "none";
    requestAnimationFrame(() => {
      t.el.style.transition = "opacity .6s ease, transform .6s ease";
      t.el.style.opacity = "0";
      t.el.style.transform = "translate(-50%,-50%) scale(0.3)";
    });
  });
})();

/* ==============================================================
   BINTANG KELAP-KELIP (lapisan paling belakang)
============================================================== */
(function initStars() {
  const canvas = $("#stars-canvas");
  const ctx = canvas.getContext("2d");
  let stars = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const count = Math.round((canvas.width * canvas.height) / 9000);
    stars = Array.from({ length: count }, () => ({
      x: rand(0, canvas.width),
      y: rand(0, canvas.height * 0.85), // sedikit lebih padat di area atas
      r: rand(0.5, 1.6),
      phase: rand(0, Math.PI * 2),
      speed: rand(0.4, 1.1),
    }));
  }
  resize();
  window.addEventListener("resize", resize);

  function tick(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const s of stars) {
      const twinkle = 0.4 + 0.6 * Math.abs(Math.sin(t * 0.0006 * s.speed + s.phase));
      ctx.globalAlpha = twinkle * 0.85;
      ctx.fillStyle = "#f7f1e3";
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();

/* ==============================================================
   REVEAL-ON-SCROLL (generic fade-in for section headers, thumbnails)
============================================================== */
(function initScrollReveal() {
  const revealObserverGeneric = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserverGeneric.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  document.querySelectorAll(".reveal-fade").forEach((el) => revealObserverGeneric.observe(el));

  // Elemen yang ditambahkan belakangan (mis. thumbnail story) diamati terpisah
  window.observeRevealFade = (el) => revealObserverGeneric.observe(el);
})();
(function initScratchCard() {
  const canvas = $("#scratch-canvas");
  const ctx = canvas.getContext("2d");
  const overlay = $("#gift-overlay");
  const progressLabel = $(".gift-progress-label");
  let scratchedPixels = 0;
  let totalPixels = 0;
  let isDown = false;
  let opened = false;

  function paintCoating() {
    const w = canvas.width, h = canvas.height;
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#e8899f");
    grad.addColorStop(1, "#e8b84b");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = "rgba(11,14,41,0.85)";
    ctx.font = "600 20px 'Outfit', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("🎁 gosok di sini 🎁", w / 2, h / 2);

    totalPixels = w * h;
  }
  paintCoating();

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
  }

  function scratchAt(x, y) {
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.fill();
  }

  function checkProgress() {
    if (opened) return;
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let cleared = 0;
    for (let i = 3; i < imgData.length; i += 4 * 20) { // sample every 20th pixel for perf
      if (imgData[i] < 40) cleared++;
    }
    const ratio = cleared / (imgData.length / (4 * 20));
    if (ratio > 0.5) {
      openGift();
    }
  }

  function openGift() {
    if (opened) return;
    opened = true;
    progressLabel.textContent = "terbuka! 🎉";
    startMusic();
    setTimeout(() => {
      overlay.classList.add("opened");
      const main = $("#main-content");
      main.hidden = false;
      launchConfetti(160);
      startAmbientFireworks();
    }, 350);
  }

  function handleStart(e) {
    isDown = true;
    scratchAt(...Object.values(getPos(e)));
  }
  function handleMove(e) {
    if (!isDown) return;
    e.preventDefault();
    const p = getPos(e);
    scratchAt(p.x, p.y);
    checkProgress();
  }
  function handleEnd() { isDown = false; }

  canvas.addEventListener("mousedown", handleStart);
  canvas.addEventListener("mousemove", handleMove);
  window.addEventListener("mouseup", handleEnd);
  canvas.addEventListener("touchstart", handleStart, { passive: true });
  canvas.addEventListener("touchmove", handleMove, { passive: false });
  canvas.addEventListener("touchend", handleEnd);
})();

/* ==============================================================
   BACKSOUND / MUTE
============================================================== */
const bgm = $("#bgm");
const muteBtn = $("#mute-btn");
const muteIcon = $("#mute-icon");

// --- KODE TAMBAHAN UNTUK FIX AUDIO DI SAFARI IPHONE ---
document.addEventListener('touchstart', function unlockAudio() {
    const bgm = document.getElementById('bgm');
    if (bgm && bgm.paused) {
        bgm.play().catch(e => console.log("Mencoba memutar audio..."));
        document.removeEventListener('touchstart', unlockAudio);
    }
}, { passive: true });
// -----------------------------------------------------

function applyMuteState(muted) {
  bgm.muted = muted;
  muteIcon.textContent = muted ? "🔇" : "🔊";
  localStorage.setItem("fidela-muted", muted ? "1" : "0");
}

(function initMuteButton() {
  const stored = localStorage.getItem("fidela-muted");
  applyMuteState(stored === "1");
  muteBtn.addEventListener("click", () => applyMuteState(!bgm.muted));
})();

function startMusic() {
  bgm.volume = 0.5;
  bgm.play().catch(() => {
    /* Browser masih memblokir; tombol mute tetap bisa dipakai manual */
  });
}

/* ==============================================================
   FIREWORKS CANVAS (ambient + tap-burst + signature "24")
============================================================== */
const fwCanvas = $("#fireworks-canvas");
const fwCtx = fwCanvas.getContext("2d");
let fwParticles = [];
let ambientRunning = false;

function resizeFwCanvas() {
  fwCanvas.width = window.innerWidth;
  fwCanvas.height = window.innerHeight;
}
resizeFwCanvas();
window.addEventListener("resize", resizeFwCanvas);

function makeBurst(x, y, count, palette, opts = {}) {
  const particles = [];
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + rand(-0.15, 0.15);
    const speed = rand(opts.minSpeed || 2, opts.maxSpeed || 7);
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      decay: rand(0.008, 0.02),
      color: palette[Math.floor(Math.random() * palette.length)],
      size: rand(1.5, 3.2),
      gravity: opts.gravity ?? 0.03,
    });
  }
  return particles;
}

const PALETTE = ["#e8b84b", "#f4d793", "#e8899f", "#f7f1e3", "#c98fe0"];

function tickFireworks() {
  fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);
  fwParticles = fwParticles.filter((p) => p.life > 0);
  for (const p of fwParticles) {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += p.gravity;
    p.vx *= 0.99;
    p.life -= p.decay;
    fwCtx.globalAlpha = Math.max(p.life, 0);
    fwCtx.fillStyle = p.color;
    fwCtx.beginPath();
    fwCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    fwCtx.fill();
  }
  fwCtx.globalAlpha = 1;
  requestAnimationFrame(tickFireworks);
}
tickFireworks();

function ambientLoop() {
  if (!ambientRunning) return;
  const x = rand(fwCanvas.width * 0.15, fwCanvas.width * 0.85);
  const y = rand(fwCanvas.height * 0.15, fwCanvas.height * 0.55);
  fwParticles.push(...makeBurst(x, y, 46, PALETTE, { minSpeed: 1.5, maxSpeed: 5 }));
  setTimeout(ambientLoop, rand(1800, 3400));
}

function startAmbientFireworks() {
  if (ambientRunning || prefersReducedMotion) return;
  ambientRunning = true;
  ambientLoop();
  setTimeout(formSignatureNumber, 900);
}

/* --- Signature element: "24" dibentuk dari partikel kembang api --- */
function getNumeralPoints(text, w, h) {
  const off = document.createElement("canvas");
  off.width = w; off.height = h;
  const octx = off.getContext("2d");
  octx.fillStyle = "#fff";
  octx.font = `700 ${Math.floor(h * 0.55)}px 'Space Grotesk', sans-serif`;
  octx.textAlign = "center";
  octx.textBaseline = "middle";
  octx.fillText(text, w / 2, h / 2);
  const data = octx.getImageData(0, 0, w, h).data;
  const points = [];
  const step = 6;
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      const alpha = data[(y * w + x) * 4 + 3];
      if (alpha > 128) points.push({ x, y });
    }
  }
  return points;
}

function formSignatureNumber() {
  if (prefersReducedMotion) return;
  const w = Math.min(fwCanvas.width, 700);
  const h = Math.min(fwCanvas.height, 320);
  const offsetX = (fwCanvas.width - w) / 2;
  const offsetY = fwCanvas.height * 0.22;
  const targets = getNumeralPoints(String(CONFIG.age), w, h);

  const shaped = targets.map((t) => ({
    tx: t.x + offsetX,
    ty: t.y + offsetY,
    x: fwCanvas.width / 2 + rand(-300, 300),
    y: fwCanvas.height / 2 + rand(-300, 300),
    life: 1,
    color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
    size: rand(1.6, 2.6),
    settleFrames: 0,
  }));

  let frame = 0;
  const holdStart = 70;
  const holdEnd = 160;
  const totalFrames = 210;

  function step() {
    frame++;
    fwCtx.save();
    for (const p of shaped) {
      if (frame < holdStart) {
        p.x += (p.tx - p.x) * 0.09;
        p.y += (p.ty - p.y) * 0.09;
      } else if (frame < holdEnd) {
        p.x += Math.sin(frame * 0.2 + p.tx) * 0.15;
        p.y += Math.cos(frame * 0.2 + p.ty) * 0.15;
      } else {
        p.vx = p.vx ?? rand(-3, 3);
        p.vy = p.vy ?? rand(-4, -1);
        p.x += p.vx; p.y += p.vy; p.vy += 0.05;
        p.life -= 0.02;
      }
      fwCtx.globalAlpha = Math.max(p.life, 0);
      fwCtx.fillStyle = p.color;
      fwCtx.beginPath();
      fwCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      fwCtx.fill();
    }
    fwCtx.restore();
    if (frame < totalFrames) requestAnimationFrame(step);
    else setTimeout(formSignatureNumber, rand(9000, 14000));
  }
  step();
}

$("#age-trigger").addEventListener("click", (e) => {
  const rect = fwCanvas.getBoundingClientRect();
  const btnRect = e.currentTarget.getBoundingClientRect();
  const x = btnRect.left + btnRect.width / 2 - rect.left;
  const y = btnRect.top + btnRect.height / 2 - rect.top;
  fwParticles.push(...makeBurst(x, y, 90, PALETTE, { minSpeed: 2, maxSpeed: 8 }));
  setTimeout(() => fwParticles.push(...makeBurst(x + rand(-60,60), y + rand(-40,40), 60, PALETTE)), 180);
});

/* ==============================================================
   CONFETTI CANVAS (open gift + encore)
============================================================== */
const confettiCanvas = $("#confetti-canvas");
const confettiCtx = confettiCanvas.getContext("2d");
let confettiPieces = [];

function resizeConfettiCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
resizeConfettiCanvas();
window.addEventListener("resize", resizeConfettiCanvas);

function launchConfetti(count = 120) {
  if (prefersReducedMotion) return;
  for (let i = 0; i < count; i++) {
    confettiPieces.push({
      x: rand(0, confettiCanvas.width),
      y: -20,
      vx: rand(-2, 2),
      vy: rand(2, 6),
      rot: rand(0, Math.PI * 2),
      vr: rand(-0.2, 0.2),
      size: rand(6, 11),
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      life: 1,
    });
  }
}

function tickConfetti() {
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiPieces = confettiPieces.filter((p) => p.y < confettiCanvas.height + 30 && p.life > 0);
  for (const p of confettiPieces) {
    p.x += p.vx; p.y += p.vy; p.rot += p.vr;
    if (p.y > confettiCanvas.height * 0.8) p.life -= 0.015;
    confettiCtx.save();
    confettiCtx.translate(p.x, p.y);
    confettiCtx.rotate(p.rot);
    confettiCtx.globalAlpha = Math.max(p.life, 0);
    confettiCtx.fillStyle = p.color;
    confettiCtx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    confettiCtx.restore();
  }
  requestAnimationFrame(tickConfetti);
}
tickConfetti();

/* ==============================================================
   STORIES / REELS
============================================================== */
const storyRail = $("#story-rail");
const storyViewer = $("#story-viewer");
const storyMedia = $("#story-media");
const storyCaption = $("#story-caption");
const storyProgressTrack = $("#story-progress-track");

let currentStory = 0;
let storyTimer = null;
const STORY_DURATION = 4500;

function renderStoryRail() {
  storyRail.innerHTML = "";
  CONFIG.stories.forEach((s, i) => {
    const btn = document.createElement("button");
    btn.className = "story-thumb reveal-fade";
    btn.style.transitionDelay = `${Math.min(i * 60, 480)}ms`;
    btn.innerHTML = `
      <span class="story-ring"><img src="${s.src}" alt="Momen ${i + 1}" onerror="this.src='https://placehold.co/150x150/171340/f4d793?text=%2B+Foto'"></span>
      <span>Momen ${i + 1}</span>`;
    btn.addEventListener("click", () => openStory(i));
    storyRail.appendChild(btn);
    if (window.observeRevealFade) window.observeRevealFade(btn);
  });
}
renderStoryRail();

/* Rail lebih ramah untuk banyak foto: bisa di-drag pakai mouse di desktop,
   scroll roda mouse otomatis jadi horizontal, dan fade di ujung kiri/kanan
   otomatis hilang kalau sudah mentok supaya jelas tidak ada lagi konten. */
(function initStoryRailScroll() {
  const rail = storyRail;
  const wrap = rail.closest(".story-rail-wrap");

  function updateFadeEdges() {
    const maxScroll = rail.scrollWidth - rail.clientWidth - 2;
    wrap.style.setProperty("--fade-left", rail.scrollLeft > 8 ? "1" : "0");
    wrap.classList.toggle("at-start", rail.scrollLeft <= 8);
    wrap.classList.toggle("at-end", rail.scrollLeft >= maxScroll);
  }
  rail.addEventListener("scroll", updateFadeEdges, { passive: true });
  window.addEventListener("resize", updateFadeEdges);
  setTimeout(updateFadeEdges, 100);

  // Roda mouse vertikal -> geser horizontal (umum di rail seperti ini)
  rail.addEventListener(
    "wheel",
    (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        rail.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    },
    { passive: false }
  );

  // Drag-to-scroll pakai mouse (desktop, karena scrollbar disembunyikan)
  let isDown = false;
  let startX = 0;
  let startScroll = 0;
  let moved = false;

  rail.addEventListener("mousedown", (e) => {
    isDown = true;
    moved = false;
    rail.classList.add("dragging");
    startX = e.pageX;
    startScroll = rail.scrollLeft;
  });
  window.addEventListener("mouseup", () => {
    isDown = false;
    rail.classList.remove("dragging");
  });
  window.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    const dx = e.pageX - startX;
    if (Math.abs(dx) > 5) moved = true;
    rail.scrollLeft = startScroll - dx;
  });
  // Kalau habis drag (bukan sekadar klik), jangan buka story secara tidak sengaja
  rail.addEventListener(
    "click",
    (e) => {
      if (moved) { e.stopPropagation(); e.preventDefault(); }
    },
    true
  );
})();

function buildProgressBars() {
  storyProgressTrack.innerHTML = "";
  CONFIG.stories.forEach(() => {
    const bar = document.createElement("div");
    bar.className = "story-progress-bar";
    bar.innerHTML = `<div class="story-progress-fill"></div>`;
    storyProgressTrack.appendChild(bar);
  });
}

function openStory(index) {
  currentStory = index;
  buildProgressBars();
  storyViewer.hidden = false;
  showStory(currentStory);
}

function showStory(index) {
  clearTimeout(storyTimer);
  const bars = storyProgressTrack.querySelectorAll(".story-progress-fill");
  bars.forEach((b, i) => {
    b.style.transition = "none";
    b.style.width = i < index ? "100%" : "0%";
  });

  const s = CONFIG.stories[index];
  storyMedia.innerHTML = `<img src="${s.src}" alt="Momen ${index + 1}" onerror="this.src='https://placehold.co/900x1600/171340/f4d793?text=Taruh+foto+di+assets/img'">`;
  storyCaption.textContent = s.caption || "";
  $("#story-counter").textContent = `${index + 1} / ${CONFIG.stories.length}`;

  requestAnimationFrame(() => {
    const fill = bars[index];
    if (fill) {
      fill.style.transition = `width ${STORY_DURATION}ms linear`;
      fill.style.width = "100%";
    }
  });

  storyTimer = setTimeout(() => nextStory(), STORY_DURATION);
}

function nextStory() {
  if (currentStory < CONFIG.stories.length - 1) showStory(++currentStory);
  else closeStory();
}
function prevStory() {
  if (currentStory > 0) showStory(--currentStory);
  else showStory(0);
}
function closeStory() {
  clearTimeout(storyTimer);
  storyViewer.hidden = true;
}

$("#story-close").addEventListener("click", closeStory);
$("#story-next").addEventListener("click", nextStory);
$("#story-prev").addEventListener("click", prevStory);

// Swipe support (mobile)
(function initStorySwipe() {
  let startX = 0;
  storyViewer.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
  storyViewer.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) < 40) return;
    dx < 0 ? nextStory() : prevStory();
  }, { passive: true });
})();

/* ==============================================================
   SURPRISE REVEAL — lock/unlock via Intersection Observer
============================================================== */
const revealSection = $("#reveal-section");
const revealLocked = $("#reveal-locked");
const revealContent = $("#reveal-content");
let revealTriggered = false;

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.55 && !revealTriggered) {
        revealTriggered = true;
        revealLocked.style.display = "none";
        revealContent.classList.add("visible");
        launchConfetti(220);
        // Kembang api encore: lebih besar dari pembukaan
        const cx = fwCanvas.width / 2;
        const cy = fwCanvas.height * 0.4;
        [0, 220, 440].forEach((delay, i) => {
          setTimeout(() => {
            fwParticles.push(
              ...makeBurst(cx + rand(-140, 140), cy + rand(-60, 60), 90, PALETTE, { minSpeed: 2, maxSpeed: 8 })
            );
          }, delay);
        });
      }
    });
  },
  { threshold: [0, 0.55, 1] }
);
revealObserver.observe(revealSection);

/* ==============================================================
   SHARE MOMEN INI (html2canvas + Web Share API)
============================================================== */
$("#share-btn").addEventListener("click", async () => {
  const target = $("#reveal-content");
  const btn = $("#share-btn");
  const originalLabel = btn.innerHTML;
  btn.innerHTML = "<span>menyiapkan gambar...</span>";
  btn.disabled = true;

  try {
    const canvas = await html2canvas(target, {
      backgroundColor: "#0a0d29",
      scale: 2,
      useCORS: true,
    });

    // Tambah watermark kecil di pojok
    const ctx = canvas.getContext("2d");
    ctx.font = "24px Outfit, sans-serif";
    ctx.fillStyle = "rgba(247,241,227,0.55)";
    ctx.textAlign = "right";
    ctx.fillText(`${CONFIG.name} · 24`, canvas.width - 30, canvas.height - 24);

    canvas.toBlob(async (blob) => {
      const file = new File([blob], "selamat-ulang-tahun-fidela.png", { type: "image/png" });

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Selamat Ulang Tahun, Fidela!",
          text: "Sebuah kado kecil untuk usia 24.",
        });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "selamat-ulang-tahun-fidela.png";
        a.click();
        URL.revokeObjectURL(url);
      }
      btn.innerHTML = originalLabel;
      btn.disabled = false;
    }, "image/png");
  } catch (err) {
    console.error("Gagal membuat gambar untuk dibagikan:", err);
    btn.innerHTML = originalLabel;
    btn.disabled = false;
  }
});
