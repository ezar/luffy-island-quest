export const translations = {
  es: {
    // StartScreen
    subtitle: 'La Gran Aventura del Sombrero de Paja',
    difficulty: 'Dificultad:',
    easy: '⭐ Fácil',
    hard: '💀 Difícil',
    players: 'Jugadores:',
    chooseCrewmate: (n) => `Jugador ${n}: elige tripulante`,
    crewReady: 'Tripulación lista ✓',
    sail: '🚢 ¡ZARPAR!',

    // MapScreen
    mapTitle: '☠ Gran Line ☠',
    tapToPlay: 'Toca tu isla para comenzar',
    turnOf: (name) => `¡Turno de ${name}!`,
    rivalryLeading: '🏆 ¡Vas en cabeza!',
    rivalryBehind: (name, gap) => `⚔️ ${name} te lleva ${gap} 🍖`,
    shopTitle: 'Tienda Pirata',

    // IslandScreen
    startMinigame: '⚓ ¡Empezar!',
    loading: 'Cargando…',

    // ResultScreen
    continueBtn: '🚢 Continuar',
    finalRankingBtn: '👑 Ver Ranking Final',

    // EndScreen
    adventureOver: '¡La aventura ha terminado!',
    endStory: 'La tripulación del Thousand Sunny ha llegado a Raftel! El legendario tesoro existe de verdad. Las palabras del gran pirata Gol D. Roger resuenan en el aire:',
    endQuote: '"¡Lo dejé todo allí! ¡Búscalo!"',
    finalRanking: '⚓ Clasificación Final',
    pirateKing: (name) => `¡${name} es el Rey Pirata!`,
    newAdventure: '🏴‍☠️ Nueva Aventura',

    // Minigames shared
    attempts: (n) => `💪 Intentos: ${n}`,
    timeLeft: (t) => `⏱️ ${t}s`,
    wrongOrder: '❌ ¡Orden incorrecto! Inténtalo de nuevo.',
    correct: '✅ ¡CORRECTO! ¡ROBIN LIBRE!',
    timeout: '⏱️ ¡Tiempo agotado!',
    missed: (n, max) => `❌ ${n}/${max}`,
    caught: (n, target) => `🍖 ${n}/${target}`,
    lives: '❤️',
    deadHearts: '🖤',
    moveHint: '← → para moverse',
    rhythmHint: '← ↓ ↑ →',
    memorizeHint: '👀 ¡Memoriza!',
    yourTurn: '🎯 ¡Tu turno!',

    // CatchGame
    catchWonTitle: '¡Gomu Gomu!',
    catchLostTitle: '¡Oh no!',
    catchCaughtMsg: (n) => `¡Atrapaste ${n} piezas de carne!`,
    catchPerfect: '¡Perfecto!',
    catchTooMuch: '¡Demasiada comida cayó!',
    catchTimeout: '¡Se acabó el tiempo!',

    // MemoryGame
    memoryWon: '✅ ¡Todos los pares encontrados!',
    memoryLost: '⏱️ ¡Tiempo agotado!',
    mismatches: (n) => `❌ ${n}`,

    // RhythmGame
    hits: (n, total) => `🎵 ${n}/${total}`,
    rhythmWon: '✅ ¡Ritmo perfecto!',
    rhythmLost: '❌ ¡Fuera de ritmo!',

    // DodgeGame
    dodgeWon: '✅ ¡Luffy sobrevivió!',
    dodgeLost: '💀 ¡Luffy fue fulminado!',

    // PuzzleGame
    attemptsLeft: (n) => `🔑 ${n} ${n === 1 ? 'intento' : 'intentos'}`,
    mastermindGreen: 'posición correcta',
    mastermindYellow: 'símbolo correcto',
    mastermindLost: '💀 ¡El código era!',
    robinNeedsHelp: '🌸 Robin: ¡Descifra el código!',
    robinFree: '🌸 Robin: ¡Gracias! ¡Libertad!',

    // FinalGame
    round: (r, total) => `⚓ Ronda ${r}/${total}`,
    sequence: (n) => `Secuencia: ${n}`,
    errors: (n, max) => `❌ ${n}/${max}`,
    finalWon: '👑 ¡ONE PIECE!',
    finalLost: '💀 ¡Error!',

    // Pirate titles (EndScreen)
    pirateTitle: (berries) => {
      if (berries >= 1000) return '👑 Rey Pirata'
      if (berries >= 750)  return '⚓ Almirante'
      if (berries >= 500)  return '⚔️ Capitán'
      if (berries >= 250)  return '🏴‍☠️ Corsario'
      return '🌊 Marinero'
    },

    // Character abilities (IslandScreen)
    abilities: {
      berryBonus:   { label: '🍖 +30% Berries',   hint: '¡El apetito de Luffy da sus frutos!' },
      extraLife:    { label: '❤️ +1 Vida',          hint: '¡La resistencia de Zoro te protege!' },
      timeBonus:    { label: '⏱️ +15s Tiempo',      hint: '¡La previsión de Nami te da más tiempo!' },
      extraAttempt: { label: '🔑 +1 Intento',       hint: '¡La puntería de Usopp no falla!' },
      easyTarget:   { label: '🍽️ Objetivo -1',      hint: '¡Sanji ya cocinó parte de la carne!' },
    },

    // Language toggle
    langToggle: 'EN',
  },

  en: {
    // StartScreen
    subtitle: 'The Grand Adventure of the Straw Hat',
    difficulty: 'Difficulty:',
    easy: '⭐ Easy',
    hard: '💀 Hard',
    players: 'Players:',
    chooseCrewmate: (n) => `Player ${n}: choose crewmate`,
    crewReady: 'Crew ready ✓',
    sail: '🚢 SET SAIL!',

    // MapScreen
    mapTitle: '☠ Grand Line ☠',
    tapToPlay: 'Tap your island to begin',
    turnOf: (name) => `${name}'s turn!`,
    rivalryLeading: '🏆 You\'re in the lead!',
    rivalryBehind: (name, gap) => `⚔️ ${name} is ahead by ${gap} 🍖`,
    shopTitle: 'Pirate Shop',

    // IslandScreen
    startMinigame: '⚓ Start!',
    loading: 'Loading…',

    // ResultScreen
    continueBtn: '🚢 Continue',
    finalRankingBtn: '👑 See Final Ranking',

    // EndScreen
    adventureOver: 'The adventure is over!',
    endStory: 'The Thousand Sunny crew has reached Raftel! The legendary treasure truly exists. The words of the great pirate Gol D. Roger echo in the air:',
    endQuote: '"I left it all there! Go find it!"',
    finalRanking: '⚓ Final Ranking',
    pirateKing: (name) => `${name} is the Pirate King!`,
    newAdventure: '🏴‍☠️ New Adventure',

    // Minigames shared
    attempts: (n) => `💪 Attempts: ${n}`,
    timeLeft: (t) => `⏱️ ${t}s`,
    wrongOrder: '❌ Wrong order! Try again.',
    correct: '✅ CORRECT! ROBIN IS FREE!',
    timeout: '⏱️ Time\'s up!',
    missed: (n, max) => `❌ ${n}/${max}`,
    caught: (n, target) => `🍖 ${n}/${target}`,
    lives: '❤️',
    deadHearts: '🖤',
    moveHint: '← → to move',
    rhythmHint: '← ↓ ↑ →',
    memorizeHint: '👀 Memorize!',
    yourTurn: '🎯 Your turn!',

    // CatchGame
    catchWonTitle: 'Gomu Gomu!',
    catchLostTitle: 'Oh no!',
    catchCaughtMsg: (n) => `Caught ${n} meat!`,
    catchPerfect: 'Perfect!',
    catchTooMuch: 'Too much food dropped!',
    catchTimeout: "Time's up!",

    // MemoryGame
    memoryWon: '✅ All pairs found!',
    memoryLost: '⏱️ Time\'s up!',
    mismatches: (n) => `❌ ${n}`,

    // RhythmGame
    hits: (n, total) => `🎵 ${n}/${total}`,
    rhythmWon: '✅ Perfect rhythm!',
    rhythmLost: '❌ Out of rhythm!',

    // DodgeGame
    dodgeWon: '✅ Luffy survived!',
    dodgeLost: '💀 Luffy was struck down!',

    // PuzzleGame
    attemptsLeft: (n) => `🔑 ${n} ${n === 1 ? 'attempt' : 'attempts'}`,
    mastermindGreen: 'right place',
    mastermindYellow: 'right symbol',
    mastermindLost: '💀 The code was!',
    robinNeedsHelp: '🌸 Robin: Crack the code!',
    robinFree: '🌸 Robin: Thank you! Freedom!',

    // FinalGame
    round: (r, total) => `⚓ Round ${r}/${total}`,
    sequence: (n) => `Sequence: ${n}`,
    errors: (n, max) => `❌ ${n}/${max}`,
    finalWon: '👑 ONE PIECE!',
    finalLost: '💀 Wrong!',

    // Pirate titles (EndScreen)
    pirateTitle: (berries) => {
      if (berries >= 1000) return '👑 Pirate King'
      if (berries >= 750)  return '⚓ Admiral'
      if (berries >= 500)  return '⚔️ Captain'
      if (berries >= 250)  return '🏴‍☠️ Privateer'
      return '🌊 Sailor'
    },

    // Character abilities (IslandScreen)
    abilities: {
      berryBonus:   { label: '🍖 +30% Berries',   hint: "Luffy's appetite pays off!" },
      extraLife:    { label: '❤️ +1 Life',          hint: "Zoro's endurance protects you!" },
      timeBonus:    { label: '⏱️ +15s Time',        hint: "Nami's foresight gives you more time!" },
      extraAttempt: { label: '🔑 +1 Attempt',       hint: "Usopp's aim never misses!" },
      easyTarget:   { label: '🍽️ Target -1',        hint: 'Sanji already cooked some meat!' },
    },

    // Language toggle
    langToggle: 'ES',
  },
}
