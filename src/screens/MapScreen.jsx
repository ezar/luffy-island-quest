import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { useLang } from '../i18n/useLang'
import { islands } from '../data/islands'
import { characters } from '../data/characters'
import OceanBackground from '../components/OceanBackground'
import CharacterIcon from '../components/CharacterIcon'
import { sounds } from '../audio/soundEngine'
import styles from './MapScreen.module.css'

export default function MapScreen() {
  const currentIslandIdx = useGameStore(s => s.currentIslandIdx)
  const currentPlayerIdx = useGameStore(s => s.currentPlayerIdx)
  const players = useGameStore(s => s.players)
  const setPhase = useGameStore(s => s.setPhase)
  const { t } = useLang()

  const player = players[currentPlayerIdx]
  const char = player ? characters.find(c => c.id === player.characterId) : null
  const currentIsland = islands[currentIslandIdx]

  const getIslandState = (idx) => {
    if (idx < currentIslandIdx) return 'completed'
    if (idx === currentIslandIdx) return 'current'
    return 'locked'
  }

  const sorted = players.length > 1
    ? [...players].sort((a, b) => b.berries !== a.berries ? b.berries - a.berries : b.stars - a.stars)
    : []

  const leaderBerries = sorted[0]?.berries ?? 0
  const currentRank = sorted.findIndex(p => p.id === player?.id) + 1
  const gap = leaderBerries - (player?.berries ?? 0)
  const rivalryMsg = player && sorted.length > 1
    ? currentRank === 1
      ? t.rivalryLeading
      : t.rivalryBehind(sorted[0].name, gap)
    : null

  return (
    <div className={styles.screen}>
      <OceanBackground>
        <div className={styles.mapArea} role="main" aria-label={t.mapTitle}>
          <h2 className={styles.mapTitle}>{t.mapTitle}</h2>
          <div className={styles.route} aria-hidden="true" />

          {islands.map((island, idx) => {
            const state = getIslandState(idx)
            return (
              <button
                key={island.id}
                className={`${styles.island} ${styles[state]}`}
                style={{ left: `${island.x}%`, top: `${island.y}%`, '--icolor': island.color }}
                onClick={() => { if (state === 'current') { sounds.click(); setPhase('island') } }}
                disabled={state !== 'current'}
                aria-label={island.name}
              >
                <span className={styles.islandEmoji}>{island.emoji}</span>
                <span className={styles.islandLabel}>{island.name}</span>
                {state === 'completed' && <span className={styles.checkmark}>✓</span>}
              </button>
            )
          })}

          <motion.div
            className={styles.ship}
            animate={{ left: `${currentIsland.x}%`, top: `${currentIsland.y}%` }}
            initial={false}
            transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
            aria-hidden="true"
          >
            🚢
          </motion.div>

          {player && (
            <motion.div
              className={styles.banner}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span><CharacterIcon id={char?.id} size={28} /></span>
              <span>{t.turnOf(player.name)}</span>
              <span className={styles.bannerBerries}>🍖 {player.berries}</span>
            </motion.div>
          )}

          {sorted.length > 1 ? (
            <motion.div
              className={styles.standings}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {rivalryMsg && (
                <div className={`${styles.rivalryMsg} ${currentRank === 1 ? styles.rivalryLeading : ''}`}>
                  {rivalryMsg}
                </div>
              )}
              <div className={styles.standingsRow}>
                {sorted.map((p, idx) => {
                  const c = characters.find(ch => ch.id === p.characterId)
                  const isCurrent = p.id === player?.id
                  const medals = ['👑', '🥈', '🥉', '4️⃣']
                  return (
                    <div
                      key={p.id}
                      className={`${styles.standingChip} ${isCurrent ? styles.standingCurrent : ''}`}
                      style={isCurrent && c ? { borderColor: c.color } : {}}
                    >
                      <span className={styles.standingMedal}>{medals[idx] || '🏅'}</span>
                      <CharacterIcon id={c?.id} size={20} />
                      <span className={styles.standingName}>{p.name}</span>
                      <span className={styles.standingBerries}>🍖{p.berries}</span>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ) : (
            <p className={styles.hint}>{t.tapToPlay}</p>
          )}
        </div>
      </OceanBackground>
    </div>
  )
}
