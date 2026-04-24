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

[![Deploy to GitHub Pages](https://github.com/ezar/luffy-island-quest/actions/workflows/deploy.yml/badge.svg)](https://github.com/ezar/luffy-island-quest/actions/workflows/deploy.yml)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Zustand](https://img.shields.io/badge/Zustand-4-brown)](https://zustand-demo.pmnd.rs)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-black?logo=framer)](https://www.framer.com/motion)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A local multiplayer web game for 1–4 players. Navigate the Grand Line on the Thousand Sunny, discover islands from the One Piece universe, and battle through 6 unique skill-based minigames. The crew closest to One Piece wins!

**🎮 [Play Now](https://ezar.github.io/luffy-island-quest/)**

---

## 📸 Preview

```
🌊 Gran Line Map → 🏝️ Island Story → 🎮 Minigame → ⭐ Results → 👑 Final Ranking
```

---

## 🗺️ Islands & Minigames

| # | Island | Minigame | Description |
|---|--------|----------|-------------|
| 1 | 🌊 Foosha Village | **Catch** | Move Luffy's straw hat to catch falling meat before it hits the ground |
| 2 | 🦈 Arlong Park | **Memory** | Find matching pairs of pirate symbol cards to recover Nami's maps |
| 3 | 🏜️ Alabasta | **Rhythm** | Press arrow keys in time with the battle march to cross the desert |
| 4 | ☁️ Skypiea | **Dodge** | Dodge Enel's lightning bolts — rubber doesn't conduct electricity! |
| 5 | ⚖️ Enies Lobby | **Puzzle** | Pull the levers in the correct secret order to free Robin |
| 6 | 👑 Raftel | **Sequence** | Simon Says with One Piece symbols — the ultimate pirate memory test |

---

## 🎮 How to Play

1. **Select players** (1–4) and choose a character: Luffy, Zoro, Nami, Usopp or Sanji
2. **Pick difficulty**: ⭐ Easy or 💀 Hard
3. **Sail the Gran Line** — the Thousand Sunny moves across the interactive map
4. **Each island unlocks a minigame** with its own story cutscene and fun fact
5. **Earn stars and Berries** based on performance
6. **After all 6 islands**, the player with the most Berries wins the title of Pirate King!

### Controls

| Action | Keyboard | Touch |
|--------|----------|-------|
| Move (Catch / Dodge) | `←` `→` arrow keys | Drag finger |
| Rhythm hits | `←` `↓` `↑` `→` | — |
| Interact | `Click` / `Enter` | Tap |

---

## ⚙️ Tech Stack

- **[React 18](https://react.dev)** — UI with hooks, lazy loading per minigame
- **[Vite 5](https://vitejs.dev)** — lightning-fast dev server and build
- **[Zustand](https://zustand-demo.pmnd.rs)** — global game state (players, scores, progress) with `localStorage` persistence
- **[Framer Motion](https://www.framer.com/motion)** — map transitions, ship animation, UI feedback
- **CSS Modules** — scoped styles per component, no runtime overhead
- **Google Fonts** — Bangers (titles) + Nunito (body)
- **No canvas, no images** — pure SVG + Unicode emoji for all visuals

---

## 🏗️ Project Structure

```
luffy-island-quest/
├── public/
│   └── favicon.svg              # Custom straw hat SVG
├── src/
│   ├── App.jsx                  # Phase router (start → map → island → result → end)
│   ├── store/
│   │   └── gameStore.js         # Zustand: players, islands, scores, turns
│   ├── screens/
│   │   ├── StartScreen.jsx      # Logo + player/character selection
│   │   ├── MapScreen.jsx        # Interactive Gran Line map
│   │   ├── IslandScreen.jsx     # Story cutscene + minigame launcher
│   │   ├── ResultScreen.jsx     # Stars, Berries, fun fact
│   │   └── EndScreen.jsx        # Final ranking
│   ├── minigames/
│   │   ├── CatchGame.jsx        # Foosha — catch falling meat
│   │   ├── MemoryGame.jsx       # Arlong — card memory pairs
│   │   ├── RhythmGame.jsx       # Alabasta — arrow rhythm
│   │   ├── DodgeGame.jsx        # Skypiea — dodge lightning (RAF loop)
│   │   ├── PuzzleGame.jsx       # Enies Lobby — lever sequence
│   │   └── FinalGame.jsx        # Raftel — Simon Says
│   ├── components/
│   │   ├── LuffyHat.jsx         # Permanent floating mascot
│   │   ├── LuffyHatSvg.jsx      # Reusable straw hat SVG
│   │   ├── OceanBackground.jsx  # Animated wave background
│   │   ├── StarRating.jsx       # 1–3 stars with staggered animation
│   │   └── PlayerCard.jsx       # Player HUD card
│   ├── data/
│   │   ├── islands.js           # Island config: name, minigame, story, fun fact
│   │   └── characters.js        # Luffy, Zoro, Nami, Usopp, Sanji
│   └── styles/
│       ├── global.css           # Reset, keyframes, utility classes
│       └── variables.css        # One Piece color palette + design tokens
└── .github/
    └── workflows/
        └── deploy.yml           # Build + deploy to GitHub Pages on push to main
```

---

## 🚀 Local Development

```bash
# Clone
git clone https://github.com/ezar/luffy-island-quest.git
cd luffy-island-quest

# Install
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Requires **Node 24+**.

---

## 🎨 Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--op-ocean-dark` | `#0a2240` | Main background |
| `--op-gold` | `#FFD600` | Titles, highlights, HUD |
| `--op-red` | `#D32F2F` | Danger, enemies, Luffy's band |
| `--op-parchment` | `#FFF8E1` | Story panels, cards |
| `--op-ink` | `#1A1A1A` | Manga-style borders + shadows |
| `--font-title` | Bangers | All titles, scores, buttons |
| `--font-body` | Nunito 700 | Story text, labels |

Panel borders follow a manga style: `4px solid #1A1A1A` with a hard `5px 5px 0` box-shadow offset.

---

## 📄 License

MIT © [ezar](https://github.com/ezar)
