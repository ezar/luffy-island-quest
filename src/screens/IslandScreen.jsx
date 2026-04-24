import { lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { islands } from '../data/islands'
import { characters } from '../data/characters'
import OceanBackground from '../components/OceanBackground'
import styles from './IslandScreen.module.css'

const MINIGAME_MAP = {
  catch:   lazy(() => import('../minigames/CatchGame')),
  memory:  lazy(() => import('../minigames/MemoryGame')),
  rhythm:  lazy(() => import('../minigames/RhythmGame')),
  dodge:   lazy(() => import('../minigames/DodgeGame')),
  puzzle:  lazy(() => import('../minigames/PuzzleGame')),
  finale:  lazy(() => import('../minigames/FinalGame')),
}

function MinigameFallback() {
  return (
    <div className={styles.loading}>
      <span className={styles.loadingHat}>👒</span>
      <span>Cargando…</span>
    </div>
  )
}

export default function IslandScreen() {
  const phase = useGameStore(s => s.phase)
  const setPhase = useGameStore(s => s.setPhase)
  const currentIslandIdx = useGameStore(s => s.currentIslandIdx)
  const currentPlayerIdx = useGameStore(s => s.currentPlayerIdx)
  const players = useGameStore(s => s.players)
  const difficulty = useGameStore(s => s.difficulty)
  const recordResult = useGameStore(s => s.recordResult)

  const island = islands[currentIslandIdx]
  const player = players[currentPlayerIdx]
  const char = player ? characters.find(c => c.id === player.characterId) : null
  const Minigame = MINIGAME_MAP[island.minigame]

  const handleMinigameComplete = (stars, berries) => {
    recordResult(currentIslandIdx, currentPlayerIdx, stars, berries)
    setPhase('result')
  }

  return (
    <div className={styles.screen}>
      <AnimatePresence mode="wait">
        {phase === 'island' && (
          <motion.div
            key="story"
            className={styles.storyPanel}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
          >
            <OceanBackground>
              <div className={styles.storyContent}>
                <div className={styles.islandBadge} style={{ background: island.color }}>
                  <span>{island.emoji}</span>
                  <span className={styles.islandName}>{island.name}</span>
                </div>

                {player && char && (
                  <div className={styles.playerBadge} style={{ borderColor: char.color }}>
                    <span>{char.emoji}</span>
                    <span>¡Turno de {player.name}!</span>
                  </div>
                )}

                <div className={styles.storyBox}>
                  <p className={styles.storyText}>{island.story}</p>
                </div>

                <div className={styles.illustration} aria-hidden="true">
                  {island.illustration}
                </div>

                <motion.button
                  className={styles.playBtn}
                  onClick={() => setPhase('minigame')}
                  whileHover={{ scale: 1.06, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ⚓ ¡Empezar!
                </motion.button>
              </div>
            </OceanBackground>
          </motion.div>
        )}

        {phase === 'minigame' && (
          <motion.div
            key="minigame"
            className={styles.minigamePanel}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.minigameHeader}>
              <span className={styles.minigameIsland}>{island.emoji} {island.name}</span>
              {player && <span className={styles.minigamePlayer}>{char?.emoji} {player.name}</span>}
            </div>
            <Suspense fallback={<MinigameFallback />}>
              <Minigame
                difficulty={difficulty}
                onComplete={handleMinigameComplete}
              />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
