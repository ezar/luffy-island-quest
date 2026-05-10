---
title: Luffy Island Quest
emoji: 🏴‍☠️
colorFrom: blue
colorTo: yellow
sdk: static
pinned: true
---

# 🏴‍☠️ Luffy Island Quest

> *One Piece: The Grand Adventure of the Straw Hat*

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Zustand](https://img.shields.io/badge/Zustand-4-brown)](https://zustand-demo.pmnd.rs)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-black?logo=framer)](https://www.framer.com/motion)
[![PWA](https://img.shields.io/badge/PWA-offline%20ready-5A0FC8?logo=pwa)](https://web.dev/progressive-web-apps/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Local multiplayer party game for 1–4 players. Navigate the Grand Line aboard the Thousand Sunny, conquer 6 islands from the One Piece universe with unique skill-based minigames, spend your Berries at the Pirate Shop, and claim the title of Pirate King!

**🎮 [Play Now](https://ezar.github.io/luffy-island-quest/)**

---

## 🗺️ Islands & Minigames

| # | Island | Minigame | Goal |
|---|--------|----------|------|
| 1 | 🌊 Foosha Village | **Catch** | Move Luffy to catch falling meat — don't let too much hit the ground |
| 2 | 🦈 Arlong Park | **Memory** | Flip and match pairs of pirate symbol cards to recover Nami's maps |
| 3 | 🏜️ Alabasta | **Rhythm** | Hit arrow keys in time with the battle march to cross the desert |
| 4 | ☁️ Skypiea | **Dodge** | Survive Enel's lightning storm — rubber doesn't conduct, but you still need to move! |
| 5 | ⚖️ Enies Lobby | **Puzzle** | Mastermind-style code cracker: find the secret symbol sequence to free Robin |
| 6 | 👑 Raftel | **Sequence** | Simon Says with One Piece symbols — the ultimate test of pirate memory |

---

## 🎮 Features

### 👥 Multiplayer (1–4 players)
Each player picks a name and a crewmate. Players take turns on each island — everyone plays every minigame before moving on to the next one.

### 🎭 Characters & Abilities
Each character grants a passive bonus that activates automatically during minigames:

| Character | Ability |
|-----------|---------|
| 🍖 Luffy | +30% Berries earned |
| ⚔️ Zoro | +1 extra life |
| 🗺️ Nami | +15s extra time |
| 🎯 Usopp | +1 extra attempt |
| 🍳 Sanji | Target reduced by 1 (Catch) |

### 🛒 Pirate Shop
Between islands, players can spend Berries on single-use power-ups:

| Power-up | Cost | Effect |
|----------|------|--------|
| 🍖 Feast | 70 🍖 | +50% Berries on next island |
| ⏱️ Tailwind | 50 🍖 | +20s extra time |
| ❤️ Nakama | 80 🍖 | +1 extra life or attempt |
| 🍀 Pirate Luck | 100 🍖 | Guarantees at least 2 ⭐ |

### 🎵 Audio
Synthesized entirely with the **Web Audio API** — zero audio files, works fully offline:
- Adventure background music (loops on map, pauses during minigames)
- Per-minigame sound effects (catch meat, match pairs, rhythm hits, lightning zap, code input…)
- Mute toggle (🔊/🔇) persisted across sessions

### 🌍 Bilingual — ES / EN
Full Spanish and English translations, switchable at any time via the language toggle.

### 🏆 Hall of Fame
Best scores are saved to `localStorage` and shown on the start screen. Tracks best Berries, best Stars, games played, and difficulty per character + player name combination.

### ⭐ Result Screen
- Animated 1–3 star rating
- Confetti burst on perfect runs (3 ⭐)
- Berry earnings breakdown
- Character speech bubble with a unique line per minigame

### 👑 Pirate Titles
Final ranking awards each player a title based on their Berry total:

| Berries | Title |
|---------|-------|
| 0–249 | 🌊 Sailor |
| 250–499 | 🏴‍☠️ Privateer |
| 500–749 | ⚔️ Captain |
| 750–999 | ⚓ Admiral |
| 1000+ | 👑 Pirate King |

---

## 🕹️ Controls

| Action | Keyboard | Touch / Mouse |
|--------|----------|---------------|
| Move (Catch / Dodge) | `←` `→` arrow keys | Drag / pointer move |
| Rhythm hits | `←` `↓` `↑` `→` | — |
| Interact / select | `Click` | Tap |

---

## ⚙️ Tech Stack

- **[React 18](https://react.dev)** — UI with hooks, lazy-loaded minigames
- **[Vite 5](https://vitejs.dev)** + **vite-plugin-pwa** — fast builds, PWA with offline support (Workbox generateSW)
- **[Zustand 4](https://zustand-demo.pmnd.rs)** — global state (players, turns, scores) with `localStorage` persistence via `partialize`
- **[Framer Motion 11](https://www.framer.com/motion)** — map transitions, ship animation, modal entrances, confetti
- **Web Audio API** — fully synthesized sounds and background music, no audio file dependencies
- **CSS Modules** — scoped styles per component, zero runtime overhead
- **Google Fonts** — Bangers (titles) + Nunito (body)
- **No canvas, no images** — pure SVG + Unicode emoji for all visuals

---

## 🏗️ Project Structure

```
luffy-island-quest/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx                   # Phase router: start → map → island → minigame → result → end
│   ├── store/
│   │   └── gameStore.js          # Zustand: players, scores, turns, shop, profiles (persisted)
│   ├── screens/
│   │   ├── StartScreen.jsx       # Logo, player setup, character selection, Hall of Fame
│   │   ├── MapScreen.jsx         # Interactive Grand Line map, standings, Pirate Shop
│   │   ├── IslandScreen.jsx      # Story cutscene, ability badge, character dialogue, minigame launcher
│   │   ├── ResultScreen.jsx      # Stars, Berries, confetti, fun fact
│   │   └── EndScreen.jsx         # Final ranking, pirate titles, saves high scores
│   ├── minigames/
│   │   ├── CatchGame.jsx         # Foosha — catch falling meat (pointer + keyboard)
│   │   ├── MemoryGame.jsx        # Arlong — flip & match card pairs
│   │   ├── RhythmGame.jsx        # Alabasta — arrow key rhythm game
│   │   ├── DodgeGame.jsx         # Skypiea — dodge aimed lightning (RAF loop)
│   │   ├── PuzzleGame.jsx        # Enies Lobby — Mastermind code cracker
│   │   └── FinalGame.jsx         # Raftel — Simon Says symbol sequence
│   ├── components/
│   │   ├── OceanBackground.jsx   # Animated wave background (day / night variants)
│   │   ├── CharacterIcon.jsx     # Emoji-based character avatar
│   │   ├── LuffyHatSvg.jsx       # Reusable straw hat SVG
│   │   ├── StarRating.jsx        # 1–3 stars with staggered animation
│   │   ├── Confetti.jsx          # 60-particle CSS confetti burst
│   │   └── SoundToggle.jsx       # Persistent mute / unmute button
│   ├── audio/
│   │   └── soundEngine.js        # Web Audio API: bg music + all SFX, no files needed
│   ├── data/
│   │   ├── islands.js            # Island config: name, minigame type, story, fun fact
│   │   ├── characters.js         # Luffy, Zoro, Nami, Usopp, Sanji — abilities + dialogues
│   │   └── powerups.js           # Shop power-up definitions
│   ├── i18n/
│   │   ├── translations.js       # Full ES / EN string map
│   │   └── useLang.js            # Language hook with localStorage persistence
│   └── styles/
│       ├── global.css            # Reset, keyframes, utility classes
│       └── variables.css         # One Piece color palette + design tokens
└── .github/
    └── workflows/
        └── deploy.yml            # Build + deploy to GitHub Pages on push to main
```

---

## 🚀 Local Development

```bash
git clone https://github.com/ezar/luffy-island-quest.git
cd luffy-island-quest
npm install
npm run dev       # dev server at http://localhost:5173
npm run build     # production build
npm run preview   # preview production build
```

Requires **Node 18+**.

---

## 🎨 Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--op-ocean-dark` | `#0a2240` | Main background |
| `--op-gold` | `#FFD600` | Titles, highlights, HUD, active states |
| `--op-red` | `#D32F2F` | Danger, hard difficulty, hit feedback |
| `--op-parchment` | `#FFF8E1` | Story panels, cards, labels |
| `--op-ink` | `#1A1A1A` | Manga-style borders + hard shadows |
| `--font-title` | Bangers | All titles, scores, buttons |
| `--font-body` | Nunito 700 | Story text, labels, hints |

Borders follow a manga style: `4px solid var(--op-ink)` with a `5px 5px 0` hard box-shadow offset.

---

## 📄 License

MIT © [ezar](https://github.com/ezar)
