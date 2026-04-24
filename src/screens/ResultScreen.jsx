import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { islands } from '../data/islands'
import { characters } from '../data/characters'
import StarRating from '../components/StarRating'
import OceanBackground from '../components/OceanBackground'
import CharacterIcon from '../components/CharacterIcon'
import { useLang } from '../i18n/useLang'
import styles from './ResultScreen.module.css'

export default function ResultScreen() {
  const currentIslandIdx = useGameStore(s => s.currentIslandIdx)
  const currentPlayerIdx = useGameStore(s => s.currentPlayerIdx)
  const players = useGameStore(s => s.players)
  const islandResults = useGameStore(s => s.islandResults)
  const advanceTurn = useGameStore(s => s.advanceTurn)
  const { t, lang } = useLang()
  const txt = (f) => (f && typeof f === 'object' ? f[lang] ?? f.es : f)

  const island = islands[currentIslandIdx]
  const player = players[currentPlayerIdx]
  const char = player ? characters.find(c => c.id === player.characterId) : null
  const result = islandResults[currentIslandIdx]?.[currentPlayerIdx] || { stars: 1, berries: 50 }

  const isLastIsland = currentIslandIdx >= islands.length - 1
  const allPlayersOnIsland = Object.keys(islandResults[currentIslandIdx] || {}).length >= players.length

  return (
    <div className={styles.screen}>
      <OceanBackground>
        <motion.div
          className={styles.panel}
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 90, damping: 15, delay: 0.1 }}
        >
          <div className={styles.islandInfo}>
            <span className={styles.islandEmoji}>{island.emoji}</span>
            <div>
              <div className={styles.islandName}>{island.name}</div>
              <div className={styles.islandSub}>{txt(island.subtitle)}</div>
            </div>
          </div>

          {player && char && (
            <div className={styles.playerInfo} style={{ borderColor: char.color }}>
              <span className={styles.charEmoji}><CharacterIcon id={char.id} size={44} /></span>
              <span className={styles.playerName}>{player.name}</span>
            </div>
          )}

          <StarRating stars={result.stars} animate />

          <motion.div
            className={styles.berries}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.8, type: 'spring', stiffness: 200 }}
          >
            <span className={styles.berriesIcon}>🍖</span>
            <span className={styles.berriesCount}>+{result.berries}</span>
            <span className={styles.berriesLabel}>Berries</span>
          </motion.div>

          <motion.div
            className={styles.storyBox}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2 }}
          >
            <p>{txt(island.completedStory)}</p>
          </motion.div>

          <motion.div
            className={styles.funFact}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
          >
            <span className={styles.funFactIcon}>💡</span>
            <p>{txt(island.funFact)}</p>
          </motion.div>

          <motion.button
            className={styles.continueBtn}
            onClick={advanceTurn}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8 }}
          >
            {isLastIsland && allPlayersOnIsland ? t.finalRankingBtn : t.continueBtn}
          </motion.button>
        </motion.div>
      </OceanBackground>
    </div>
  )
}
