import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { useLang } from '../i18n/useLang'
import { characters } from '../data/characters'
import OceanBackground from '../components/OceanBackground'
import CharacterIcon from '../components/CharacterIcon'
import styles from './EndScreen.module.css'

export default function EndScreen() {
  const players = useGameStore(s => s.players)
  const resetGame = useGameStore(s => s.resetGame)
  const { t } = useLang()

  const sorted = [...players].sort((a, b) =>
    b.berries !== a.berries ? b.berries - a.berries : b.stars - a.stars
  )

  const medals = ['🥇', '🥈', '🥉', '4️⃣']

  return (
    <div className={styles.screen}>
      <OceanBackground variant="night">
        <div className={styles.content}>
          <motion.div
            className={styles.titleBlock}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 80 }}
          >
            <div className={styles.crown}>👑</div>
            <h1 className={styles.title}>ONE PIECE</h1>
            <div className={styles.subtitle}>{t.adventureOver}</div>
          </motion.div>

          <motion.div
            className={styles.storyEnd}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p>{t.endStory} <em>{t.endQuote}</em></p>
          </motion.div>

          <motion.div
            className={styles.ranking}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <h2 className={styles.rankingTitle}>{t.finalRanking}</h2>
            {sorted.map((player, idx) => {
              const char = characters.find(c => c.id === player.characterId)
              return (
                <motion.div
                  key={player.id}
                  className={`${styles.rankRow} ${idx === 0 ? styles.rankFirst : ''}`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 + idx * 0.15 }}
                  style={char ? { borderColor: char.color } : {}}
                >
                  <span className={styles.medal}>{medals[idx] || '🏅'}</span>
                  <span className={styles.rankEmoji}><CharacterIcon id={char?.id} size={44} /></span>
                  <div className={styles.rankInfo}>
                    <div className={styles.rankName}>{player.name}</div>
                    <div className={styles.rankChar}>{char?.name}</div>
                    <div className={styles.rankTitle}>{t.pirateTitle(player.berries)}</div>
                  </div>
                  <div className={styles.rankScore}>
                    <span className={styles.rankBerries}>🍖 {player.berries}</span>
                    <span className={styles.rankStars}>⭐ {player.stars}</span>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {sorted[0] && (
            <motion.div
              className={styles.winner}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8, type: 'spring', stiffness: 120 }}
            >
              <span className={styles.winnerCrown}>👑</span>
              <span>{t.pirateKing(sorted[0].name)}</span>
            </motion.div>
          )}

          <motion.button
            className={styles.restartBtn}
            onClick={resetGame}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
          >
            {t.newAdventure}
          </motion.button>
        </div>
      </OceanBackground>
    </div>
  )
}
