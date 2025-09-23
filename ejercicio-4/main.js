// ----NOTA PROFESOR : Se armo los elementos draggable y el drop area como se explico en clase y en el tutorial, pero para la reprocuccion de las notas y la visual paso por mi amigo chatGPT ---


// --- Audio: mapa de frecuencias (C4..B4) ---
const NOTE_FREQ = {
  do: 261.63, re: 293.66, mi: 329.63, fa: 349.23,
  sol: 392.00, la: 440.00, si: 493.88
};

let audioCtx = null;
const ensureAudio = async () => {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') await audioCtx.resume();
  return audioCtx;
};

function playNote(freq, durationSec = 0.4) {
  if (!freq) return;
  ensureAudio().then(ctx => {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;

    // Envolvente corta para evitar clicks
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.6, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + durationSec + 0.02);
  });
}

const dropArea = document.getElementById('dropArea');

// --- Drag & Drop: preview de sonido al iniciar el drag ---
document.addEventListener('dragstart', (e) => {
  const noteEl = e.target.closest('.note[draggable="true"]');
  if (!noteEl) return;
  const noteName = noteEl.dataset.note;
  e.dataTransfer.setData('text/plain', noteName);
  e.dataTransfer.effectAllowed = 'copy';
  playNote(NOTE_FREQ[noteName], 0.22);
});

dropArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropArea.classList.add('is-over');
  e.dataTransfer.dropEffect = 'copy';
}, true);

dropArea.addEventListener('dragleave', () => {
  dropArea.classList.remove('is-over');
}, true);

dropArea.addEventListener('drop', (e) => {
  e.preventDefault();
  const noteName = e.dataTransfer.getData('text/plain');
  if (!noteName) return;

  // crear clon (sin icono) para la secuencia
  const clone = document.createElement('li');
  clone.className = 'note';
  clone.dataset.note = noteName;
  clone.textContent = noteName;

  dropArea.appendChild(clone);
  dropArea.classList.remove('is-over');

  playNote(NOTE_FREQ[noteName], 0.35);
  e.dataTransfer.clearData();

  // 👉 actualizar historial local
  appendHistoryEntry(noteName);
}, true);

// Click para sonar cualquier nota (origen o secuencia)
document.addEventListener('click', (e) => {
  const noteEl = e.target.closest('.note');
  if (!noteEl) return;
  playNote(NOTE_FREQ[noteEl.dataset.note], 0.35);
});

// --- Controles de BPM + Play/Stop ---
const bpmRange = document.getElementById('bpm');
const bpmNumber = document.getElementById('bpmNumber');
const playBtn = document.getElementById('playBtn');
const stopBtn = document.getElementById('stopBtn');

function setBpm(val) {
  const v = Math.max(40, Math.min(240, Number(val) || 120));
  bpmRange.value = v;
  bpmNumber.value = v;
  return v;
}
bpmRange.addEventListener('input', () => setBpm(bpmRange.value));
bpmNumber.addEventListener('input', () => setBpm(bpmNumber.value));

let isPlaying = false;
let timeouts = [];
function clearHighlights() {
  dropArea.querySelectorAll('.note.is-current').forEach(el => el.classList.remove('is-current'));
}
function stopSequence() {
  timeouts.forEach(clearTimeout);
  timeouts = [];
  isPlaying = false;
  clearHighlights();
  playBtn.disabled = false;
  stopBtn.disabled = true;
}
function playSequence() {
  const notes = Array.from(dropArea.querySelectorAll('.note'));
  if (!notes.length) return;

  stopSequence();
  isPlaying = true;
  playBtn.disabled = true;
  stopBtn.disabled = false;

  const bpm = setBpm(bpmNumber.value);
  const beatMs = 60000 / bpm;
  const gate = 0.8;
  const noteDurSec = (beatMs / 1000) * gate;

  notes.forEach((el, i) => {
    const t = setTimeout(() => {
      clearHighlights();
      el.classList.add('is-current');
      const name = el.dataset.note;
      playNote(NOTE_FREQ[name], noteDurSec);

      if (i === notes.length - 1) {
        const endT = setTimeout(() => stopSequence(), beatMs);
        timeouts.push(endT);
      }
    }, i * beatMs);
    timeouts.push(t);
  });
}
playBtn.addEventListener('click', playSequence);
stopBtn.addEventListener('click', stopSequence);
[bpmRange, bpmNumber].forEach(ctrl => {
  ctrl.addEventListener('keydown', (e) => { if (e.key === 'Enter') playSequence(); });
});

// ---------- Historial local ----------
const HISTORY_KEY = 'dropHistory';
const historyListEl = document.getElementById('historyList');
const historyEmptyEl = document.getElementById('historyEmpty');
const clearHistoryBtn = document.getElementById('clearHistory');

function getHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []; }
  catch { return []; }
}
function setHistory(arr) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(arr));
}
function formatTs(tsIso) {
  try {
    return new Date(tsIso).toLocaleString('es-AR', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  } catch {
    return tsIso;
  }
}
function renderHistory() {
  const items = getHistory();
  if (!items.length) {
    historyEmptyEl.hidden = false;
    historyListEl.hidden = true;
    historyListEl.innerHTML = '';
    return;
  }
  historyEmptyEl.hidden = true;
  historyListEl.hidden = false;
  historyListEl.innerHTML = items.map(it => `
        <div class="hist-item">
          <span class="tag">${it.note}</span>
          <span class="hist-time">${formatTs(it.ts)}</span>
        </div>
      `).join('');
}
function appendHistoryEntry(note) {
  const arr = getHistory();
  arr.push({ note, ts: new Date().toISOString() });
  setHistory(arr);
  renderHistory();
}
clearHistoryBtn.addEventListener('click', () => {
  setHistory([]);
  renderHistory();
});

// Inicializar historial al cargar
renderHistory();
