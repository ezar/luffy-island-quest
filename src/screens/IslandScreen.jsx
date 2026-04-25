import { lazy, Suspense, useCallback } from 'react'
import { sounds } from '../audio/soundEngine'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { useLang } from '../i18n/useLang'
import { islands } from '../data/islands'
import { characters } from '../data/characters'
import OceanBackground from '../components/OceanBackground'
import CharacterIcon from '../components/CharacterIcon'
import styles from './IslandScreen.module.css'

const MINIGAME_MAP = {
  catch:   lazy(() => import('../minigames/CatchGame')),
  memory:  lazy(() => import('../minigames/MemoryGame')),
  rhythm:  lazy(() => import('../minigames/RhythmGame')),
  dodge:   lazy(() => import('../minigames/DodgeGame')),
  puzzle:  lazy(() => import('../minigames/PuzzleGame')),
  finale:  lazy(() => import('../minigames/FinalGame')),
}

function MinigameFallback({ label }) {
  return (
    <div className={styles.loading}>
      <span className={styles.loadingHat}>👒</span>
      <span>{label}</span>
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
  const { t, lang } = useLang()
  const txt = (field) => (typeof field === 'object' ? field[lang] ?? field.es : field)

  const island = islands[currentIslandIdx]
  const player = players[currentPlayerIdx]
  const char = player ? characters.find(c => c.id === player.characterId) : null
  const Minigame = MINIGAME_MAP[island.minigame]

  const abilityId = char?.ability?.id ?? null
  const powerUpId = player?.powerUp ?? null

  // Numeric bonuses passed to minigames (ability + power-up combined)
  const bonusTime     = (abilityId === 'timeBonus'     ? 15 : 0) + (powerUpId === 'wind'   ? 20 : 0)
  const bonusLives    = (abilityId === 'extraLife'     ? 1  : 0) + (powerUpId === 'nakama' ? 1  : 0)
  const bonusAttempts = (abilityId === 'extraAttempt'  ? 1  : 0) + (powerUpId === 'nakama' ? 1  : 0)
  const easyTarget    = abilityId === 'easyTarget'

  const handleMinigameComplete = useCallback((stars, berries) => {
    let b = berries
    let s = stars
    if (abilityId === 'berryBonus') b = Math.round(b * 1.3)
    if (powerUpId  === 'feast')     b = Math.round(b * 1.5)
    if (powerUpId  === 'luck')      s = Math.max(2, s)
    recordResult(currentIslandIdx, currentPlayerIdx, s, b)
    setPhase('result')
  }, [recordResult, currentIslandIdx, currentPlayerIdx, setPhase, abilityId, powerUpId])

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
                    <span><CharacterIcon id={char.id} size={32} /></span>
                    <span>{t.turnOf(player.name)}</span>
                  </div>
                )}

                {char?.ability && t.abilities?.[char.ability.id] && (
                  <div className={styles.abilityBadge} style={{ borderColor: char.color }}>
                    <span className={styles.abilityLabel}>{t.abilities[char.ability.id].label}</span>
                    <span className={styles.abilityHint}>{t.abilities[char.ability.id].hint}</span>
                  </div>
                )}

                {char?.dialogue?.[island.minigame] && (
                  <motion.div
                    className={styles.speechBubble}
                    style={{ borderColor: char.color }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.25, type: 'spring', stiffness: 200 }}
                  >
                    <span className={styles.speechCharIcon}>
                      <CharacterIcon id={char.id} size={28} />
                    </span>
                    <span className={styles.speechText}>
                      {txt(char.dialogue[island.minigame])}
                    </span>
                    <span className={styles.speechTail} style={{ borderTopColor: char.color }} />
                  </motion.div>
                )}

                <div className={styles.storyBox}>
                  <p className={styles.storyText}>{txt(island.story)}</p>
                </div>

                <div className={styles.illustration} aria-hidden="true">
                  {island.illustration}
                </div>

                <motion.button
                  className={styles.playBtn}
                  onClick={() => { sounds.click(); setPhase('minigame') }}
                  whileHover={{ scale: 1.06, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t.startMinigame}
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
              {player && <span className={styles.minigamePlayer}><CharacterIcon id={char?.id} size={24} /> {player.name}</span>}
            </div>
            <Suspense fallback={<MinigameFallback label={t.loading} />}>
              <Minigame
                difficulty={difficulty}
                onComplete={handleMinigameComplete}
                bonusTime={bonusTime}
                bonusLives={bonusLives}
                bonusAttempts={bonusAttempts}
                easyTarget={easyTarget}
              />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
