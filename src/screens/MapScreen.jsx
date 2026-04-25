import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { useLang } from '../i18n/useLang'
import { islands } from '../data/islands'
import { characters } from '../data/characters'
import { POWERUPS } from '../data/powerups'
import OceanBackground from '../components/OceanBackground'
import CharacterIcon from '../components/CharacterIcon'
import { sounds } from '../audio/soundEngine'
import styles from './MapScreen.module.css'

export default function MapScreen() {
  const currentIslandIdx = useGameStore(s => s.currentIslandIdx)
  const currentPlayerIdx = useGameStore(s => s.currentPlayerIdx)
  const players = useGameStore(s => s.players)
  const setPhase = useGameStore(s => s.setPhase)
  const buyPowerUp = useGameStore(s => s.buyPowerUp)
  const { t, lang } = useLang()
  const [shopOpen, setShopOpen] = useState(false)

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
              {player.powerUp && (
                <span className={styles.activePowerUp} title={POWERUPS.find(p => p.id === player.powerUp)?.label[lang]}>
                  {POWERUPS.find(p => p.id === player.powerUp)?.emoji}
                </span>
              )}
              <button
                className={styles.shopBtn}
                onClick={() => { sounds.click(); setShopOpen(true) }}
                aria-label="Tienda"
              >🛒</button>
            </motion.div>
          )}

          <AnimatePresence>
            {shopOpen && (
              <motion.div
                className={styles.shopOverlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShopOpen(false)}
              >
                <motion.div
                  className={styles.shopPanel}
                  initial={{ scale: 0.85, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.85, y: 20 }}
                  onClick={e => e.stopPropagation()}
                >
                  <div className={styles.shopTitle}>⚓ {t.shopTitle}</div>
                  <div className={styles.shopBerries}>🍖 {player?.berries}</div>
                  <div className={styles.shopGrid}>
                    {POWERUPS.map(pu => {
                      const canAfford = (player?.berries ?? 0) >= pu.cost
                      const hasOne = !!player?.powerUp
                      const isOwned = player?.powerUp === pu.id
                      return (
                        <div
                          key={pu.id}
                          className={`${styles.shopCard} ${isOwned ? styles.shopOwned : ''} ${!canAfford && !isOwned ? styles.shopCantAfford : ''}`}
                        >
                          <span className={styles.shopEmoji}>{pu.emoji}</span>
                          <span className={styles.shopLabel}>{pu.label[lang]}</span>
                          <span className={styles.shopDesc}>{pu.desc[lang]}</span>
                          <button
                            className={styles.shopBuyBtn}
                            disabled={!canAfford || hasOne}
                            onClick={() => {
                              sounds.coin()
                              buyPowerUp(currentPlayerIdx, pu.id, pu.cost)
                              setShopOpen(false)
                            }}
                          >
                            {isOwned ? '✓' : `🍖 ${pu.cost}`}
                          </button>
                        </div>
                      )
                    })}
                  </div>
                  <button className={styles.shopClose} onClick={() => setShopOpen(false)}>✕</button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

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
