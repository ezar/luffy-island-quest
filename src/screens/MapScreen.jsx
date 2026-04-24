import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { islands } from '../data/islands'
import { characters } from '../data/characters'
import OceanBackground from '../components/OceanBackground'
import CharacterIcon from '../components/CharacterIcon'
import styles from './MapScreen.module.css'

export default function MapScreen() {
  const currentIslandIdx = useGameStore(s => s.currentIslandIdx)
  const currentPlayerIdx = useGameStore(s => s.currentPlayerIdx)
  const players = useGameStore(s => s.players)
  const setPhase = useGameStore(s => s.setPhase)

  const player = players[currentPlayerIdx]
  const char = player ? characters.find(c => c.id === player.characterId) : null
  const currentIsland = islands[currentIslandIdx]

  const getIslandState = (idx) => {
    if (idx < currentIslandIdx) return 'completed'
    if (idx === currentIslandIdx) return 'current'
    return 'locked'
  }

  return (
    <div className={styles.screen}>
      <OceanBackground>
        <div className={styles.mapArea} role="main" aria-label="Mapa del Gran Line">
          <h2 className={styles.mapTitle}>☠ Gran Line ☠</h2>
          <div className={styles.route} aria-hidden="true" />

          {islands.map((island, idx) => {
            const state = getIslandState(idx)
            return (
              <motion.button
                key={island.id}
                className={`${styles.island} ${styles[state]}`}
                style={{ left: `${island.x}%`, top: `${island.y}%`, '--icolor': island.color }}
                whileHover={state === 'current' ? { scale: 1.25 } : {}}
                whileTap={state === 'current' ? { scale: 0.92 } : {}}
                onClick={() => state === 'current' && setPhase('island')}
                disabled={state !== 'current'}
                aria-label={island.name + (state === 'current' ? ' – toca para jugar' : '')}
              >
                <span className={styles.islandEmoji}>{island.emoji}</span>
                <span className={styles.islandLabel}>{island.name}</span>
                {state === 'completed' && <span className={styles.checkmark}>✓</span>}
              </motion.button>
            )
          })}

          {/* Animated ship */}
          <motion.div
            className={styles.ship}
            animate={{ left: `${currentIsland.x}%`, top: `${currentIsland.y}%` }}
            initial={false}
            transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
            aria-hidden="true"
          >
            🚢
          </motion.div>

          {/* Turn banner */}
          {player && (
            <motion.div
              className={styles.banner}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span><CharacterIcon id={char?.id} size={28} /></span>
              <span>¡Turno de {player.name}!</span>
              <span className={styles.bannerBerries}>🍖 {player.berries}</span>
            </motion.div>
          )}

          <p className={styles.hint}>Toca tu isla para comenzar</p>
        </div>
      </OceanBackground>
    </div>
  )
}
