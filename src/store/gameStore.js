import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Estado global del juego con persistencia via localStorage.
 * Session state (players, progress) se reinicia con resetGame.
 * Profiles state persiste entre sesiones.
 */
export const useGameStore = create(
  persist(
    (set, get) => ({
      // ── Estado de sesión ──────────────────────────────
      /** @type {Array<{id:number,name:string,characterId:string,berries:number,stars:number}>} */
      players: [],
      currentPlayerIdx: 0,
      currentIslandIdx: 0,
      difficulty: 'easy',
      /** @type {'start'|'map'|'island'|'minigame'|'result'|'end'} */
      phase: 'start',
      /** @type {Object<number, Object<number, {stars:number,berries:number}>>} */
      islandResults: {},   // { islandIdx: { playerIdx: {stars, berries} } }

      // ── Estado persistente ────────────────────────────
      profiles: {},  // { playerId: {name, characterId, highScores:[]} }

      // ── Acciones ──────────────────────────────────────

      /**
       * Inicia una nueva partida con los jugadores y dificultad seleccionados.
       * @param {Array<{name:string,characterId:string}>} players
       * @param {'easy'|'hard'} difficulty
       */
      startGame: (players, difficulty) => set({
        players: players.map((p, i) => ({ ...p, id: i, berries: 0, stars: 0, powerUp: null })),
        difficulty,
        currentPlayerIdx: 0,
        currentIslandIdx: 0,
        islandResults: {},
        phase: 'map',
      }),

      setPhase: (phase) => set({ phase }),

      /**
       * Registra el resultado de un jugador en una isla.
       * @param {number} islandIdx
       * @param {number} playerIdx
       * @param {number} stars - 1, 2 o 3
       * @param {number} berries - monedas ganadas
       */
      recordResult: (islandIdx, playerIdx, stars, berries) => set(state => ({
        islandResults: {
          ...state.islandResults,
          [islandIdx]: {
            ...(state.islandResults[islandIdx] || {}),
            [playerIdx]: { stars, berries },
          },
        },
        players: state.players.map((p, i) =>
          i === playerIdx
            ? { ...p, berries: p.berries + berries, stars: p.stars + stars, powerUp: null }
            : p
        ),
      })),

      buyPowerUp: (playerIdx, powerUpId, cost) => set(state => ({
        players: state.players.map((p, i) =>
          i === playerIdx && p.berries >= cost
            ? { ...p, berries: p.berries - cost, powerUp: powerUpId }
            : p
        ),
      })),

      /**
       * Avanza al siguiente turno o isla.
       * Si todos los jugadores han jugado la isla actual → avanza isla.
       * Si no → cambia al siguiente jugador que no ha jugado.
       */
      advanceTurn: () => {
        const state = get()
        const done = state.islandResults[state.currentIslandIdx] || {}
        const allDone = Object.keys(done).length >= state.players.length

        if (allDone) {
          const next = state.currentIslandIdx + 1
          if (next >= 6) {
            set({ phase: 'end', currentPlayerIdx: 0 })
          } else {
            set({ currentIslandIdx: next, currentPlayerIdx: 0, phase: 'map' })
          }
        } else {
          let next = (state.currentPlayerIdx + 1) % state.players.length
          let attempts = 0
          while (done[next] !== undefined && attempts < state.players.length) {
            next = (next + 1) % state.players.length
            attempts++
          }
          set({ currentPlayerIdx: next, phase: 'map' })
        }
      },

      resetGame: () => set({
        players: [],
        currentPlayerIdx: 0,
        currentIslandIdx: 0,
        islandResults: {},
        phase: 'start',
      }),
    }),
    {
      name: 'luffy-quest-v1',
      // Solo persistir perfiles, no el estado de sesión activa
      partialize: (state) => ({ profiles: state.profiles }),
    }
  )
)
