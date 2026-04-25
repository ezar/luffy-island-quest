let ctx = null
let bgGainNode = null
let bgTimeoutId = null
let bgRunning = false

let muted = localStorage.getItem('op-muted') === '1'

function ac() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)()
    bgGainNode = ctx.createGain()
    bgGainNode.gain.value = muted ? 0 : 0.13
    bgGainNode.connect(ctx.destination)
  }
  return ctx
}

export function unlockAudio() {
  try {
    const c = ac()
    if (c.state === 'suspended') c.resume()
  } catch (_) {}
}

export function getMuted() { return muted }

export function setMuted(v) {
  muted = v
  localStorage.setItem('op-muted', v ? '1' : '')
  if (bgGainNode) {
    bgGainNode.gain.setTargetAtTime(v ? 0 : 0.13, ac().currentTime, 0.1)
  }
}

function play(fn) {
  if (muted) return
  try {
    const c = ac()
    if (c.state === 'suspended') c.resume()
    fn(c)
  } catch (_) {}
}

// ── Background music ─────────────────────────────────────────────────────────
// Simple pirate-adventure loop in C major (120 BPM, ♩= 0.5s)
const NOTE = 0.28
const REST = 0    // silence marker
const MELODY = [
  392, 523, 659, 784, 659, 523, 392, REST,
  440, 587, 784, 880, 784, 587, 440, REST,
  392, 523, 659, 784, 880, 784, 659, 523,
  392, REST, 392, REST, REST, REST, REST, REST,
]
const BASS = [
  131, 0, 0, 0, 131, 0, 0, 0,
  147, 0, 0, 0, 147, 0, 0, 0,
  131, 0, 0, 0, 131, 0, 0, 0,
  131, 0, 0, 0, 0,   0, 0, 0,
]
const LOOP_DUR = MELODY.length * NOTE

function scheduleLoop(startTime) {
  if (!bgRunning || !ctx) return
  MELODY.forEach((freq, i) => {
    if (!freq) return
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = 'sine'
    o.frequency.value = freq
    o.connect(g)
    g.connect(bgGainNode)
    const t = startTime + i * NOTE
    g.gain.setValueAtTime(0, t)
    g.gain.linearRampToValueAtTime(0.55, t + 0.02)
    g.gain.exponentialRampToValueAtTime(0.001, t + NOTE * 0.85)
    o.start(t)
    o.stop(t + NOTE * 0.85)
  })
  BASS.forEach((freq, i) => {
    if (!freq) return
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = 'triangle'
    o.frequency.value = freq
    o.connect(g)
    g.connect(bgGainNode)
    const t = startTime + i * NOTE
    g.gain.setValueAtTime(0, t)
    g.gain.linearRampToValueAtTime(0.35, t + 0.03)
    g.gain.exponentialRampToValueAtTime(0.001, t + NOTE * 1.4)
    o.start(t)
    o.stop(t + NOTE * 1.4)
  })
  bgTimeoutId = setTimeout(() => {
    if (bgRunning && ctx) scheduleLoop(ctx.currentTime + 0.05)
  }, (LOOP_DUR - 0.3) * 1000)
}

export function startBgMusic() {
  if (bgRunning) return
  bgRunning = true
  try {
    const c = ac()
    if (c.state === 'suspended') c.resume()
    scheduleLoop(c.currentTime + 0.2)
  } catch (_) {}
}

export function stopBgMusic() {
  bgRunning = false
  if (bgTimeoutId) { clearTimeout(bgTimeoutId); bgTimeoutId = null }
}

// ── Sound effects ─────────────────────────────────────────────────────────────
export const sounds = {
  click: () => play(c => {
    const o = c.createOscillator(); const g = c.createGain()
    o.connect(g); g.connect(c.destination)
    o.frequency.value = 660
    g.gain.setValueAtTime(0.22, c.currentTime)
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.07)
    o.start(); o.stop(c.currentTime + 0.07)
  }),

  star: () => play(c => {
    const o = c.createOscillator(); const g = c.createGain()
    o.connect(g); g.connect(c.destination)
    o.frequency.setValueAtTime(900, c.currentTime)
    o.frequency.exponentialRampToValueAtTime(1800, c.currentTime + 0.14)
    g.gain.setValueAtTime(0.18, c.currentTime)
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.2)
    o.start(); o.stop(c.currentTime + 0.2)
  }),

  coin: () => play(c => {
    [880, 1100].forEach((f, i) => {
      const o = c.createOscillator(); const g = c.createGain()
      o.connect(g); g.connect(c.destination)
      o.frequency.value = f
      const t = c.currentTime + i * 0.07
      g.gain.setValueAtTime(0.2, t)
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.15)
      o.start(t); o.stop(t + 0.15)
    })
  }),

  win: () => play(c => {
    [523, 659, 784, 1047].forEach((f, i) => {
      const o = c.createOscillator(); const g = c.createGain()
      o.type = 'square'
      o.connect(g); g.connect(c.destination)
      o.frequency.value = f
      const t = c.currentTime + i * 0.13
      g.gain.setValueAtTime(0.15, t)
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.22)
      o.start(t); o.stop(t + 0.22)
    })
  }),

  lose: () => play(c => {
    const o = c.createOscillator(); const g = c.createGain()
    o.connect(g); g.connect(c.destination)
    o.type = 'sawtooth'
    o.frequency.setValueAtTime(330, c.currentTime)
    o.frequency.exponentialRampToValueAtTime(110, c.currentTime + 0.45)
    g.gain.setValueAtTime(0.22, c.currentTime)
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.45)
    o.start(); o.stop(c.currentTime + 0.45)
  }),

  catchMeat: () => play(c => {
    const o = c.createOscillator(); const g = c.createGain()
    o.connect(g); g.connect(c.destination)
    o.frequency.setValueAtTime(350, c.currentTime)
    o.frequency.exponentialRampToValueAtTime(700, c.currentTime + 0.06)
    g.gain.setValueAtTime(0.28, c.currentTime)
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.1)
    o.start(); o.stop(c.currentTime + 0.1)
  }),

  catchMiss: () => play(c => {
    const o = c.createOscillator(); const g = c.createGain()
    o.type = 'triangle'
    o.connect(g); g.connect(c.destination)
    o.frequency.setValueAtTime(220, c.currentTime)
    o.frequency.exponentialRampToValueAtTime(80, c.currentTime + 0.14)
    g.gain.setValueAtTime(0.18, c.currentTime)
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.14)
    o.start(); o.stop(c.currentTime + 0.14)
  }),

  flip: () => play(c => {
    const o = c.createOscillator(); const g = c.createGain()
    o.connect(g); g.connect(c.destination)
    o.frequency.setValueAtTime(500, c.currentTime)
    o.frequency.exponentialRampToValueAtTime(900, c.currentTime + 0.04)
    g.gain.setValueAtTime(0.15, c.currentTime)
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.07)
    o.start(); o.stop(c.currentTime + 0.07)
  }),

  match: () => play(c => {
    [660, 990].forEach((f, i) => {
      const o = c.createOscillator(); const g = c.createGain()
      o.connect(g); g.connect(c.destination)
      o.frequency.value = f
      const t = c.currentTime + i * 0.1
      g.gain.setValueAtTime(0.2, t)
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.18)
      o.start(t); o.stop(t + 0.18)
    })
  }),

  mismatch: () => play(c => {
    const o = c.createOscillator(); const g = c.createGain()
    o.type = 'sawtooth'
    o.connect(g); g.connect(c.destination)
    o.frequency.setValueAtTime(200, c.currentTime)
    o.frequency.exponentialRampToValueAtTime(110, c.currentTime + 0.18)
    g.gain.setValueAtTime(0.16, c.currentTime)
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.18)
    o.start(); o.stop(c.currentTime + 0.18)
  }),

  rhythmHit: () => play(c => {
    const o = c.createOscillator(); const g = c.createGain()
    o.connect(g); g.connect(c.destination)
    o.frequency.setValueAtTime(180, c.currentTime)
    o.frequency.exponentialRampToValueAtTime(55, c.currentTime + 0.08)
    g.gain.setValueAtTime(0.35, c.currentTime)
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.1)
    o.start(); o.stop(c.currentTime + 0.1)
  }),

  rhythmMiss: () => play(c => {
    const o = c.createOscillator(); const g = c.createGain()
    o.type = 'sawtooth'
    o.connect(g); g.connect(c.destination)
    o.frequency.value = 140
    g.gain.setValueAtTime(0.12, c.currentTime)
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.12)
    o.start(); o.stop(c.currentTime + 0.12)
  }),

  zap: () => play(c => {
    const o = c.createOscillator(); const g = c.createGain()
    o.type = 'sawtooth'
    o.connect(g); g.connect(c.destination)
    o.frequency.setValueAtTime(900, c.currentTime)
    o.frequency.exponentialRampToValueAtTime(200, c.currentTime + 0.18)
    g.gain.setValueAtTime(0.28, c.currentTime)
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.2)
    o.start(); o.stop(c.currentTime + 0.2)
  }),

  reveal: () => play(c => {
    const o = c.createOscillator(); const g = c.createGain()
    o.connect(g); g.connect(c.destination)
    o.frequency.setValueAtTime(600, c.currentTime)
    o.frequency.exponentialRampToValueAtTime(900, c.currentTime + 0.05)
    g.gain.setValueAtTime(0.18, c.currentTime)
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.1)
    o.start(); o.stop(c.currentTime + 0.1)
  }),

  fanfare: () => play(c => {
    const seq = [523, 659, 784, 1047, 784, 1047]
    const durs = [0.1, 0.1, 0.1, 0.15, 0.1, 0.4]
    let t = c.currentTime
    seq.forEach((f, i) => {
      const o = c.createOscillator(); const g = c.createGain()
      o.type = 'square'
      o.connect(g); g.connect(c.destination)
      o.frequency.value = f
      g.gain.setValueAtTime(0.18, t)
      g.gain.exponentialRampToValueAtTime(0.001, t + durs[i])
      o.start(t); o.stop(t + durs[i])
      t += durs[i]
    })
  }),
}
