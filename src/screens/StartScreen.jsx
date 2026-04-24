import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { characters } from '../data/characters'
import OceanBackground from '../components/OceanBackground'
import CharacterIcon from '../components/CharacterIcon'
import styles from './StartScreen.module.css'

export default function StartScreen() {
  const startGame = useGameStore(s => s.startGame)
  const [numPlayers, setNumPlayers] = useState(1)
  const [assignments, setAssignments] = useState({})
  const [difficulty, setDifficulty] = useState('easy')
  const [selectingFor, setSelectingFor] = useState(0)

  const pickCharacter = (charId) => {
    const next = { ...assignments }
    Object.keys(next).forEach(k => { if (next[k] === charId) delete next[k] })
    next[selectingFor] = charId
    setAssignments(next)
    let nextSlot = -1
    for (let i = 0; i < numPlayers; i++) {
      if (next[i] === undefined) { nextSlot = i; break }
    }
    setSelectingFor(nextSlot === -1 ? 0 : nextSlot)
  }

  const resetPlayers = (n) => {
    setNumPlayers(n)
    setAssignments({})
    setSelectingFor(0)
  }

  const allReady = Array.from({ length: numPlayers }, (_, i) => i).every(i => assignments[i])

  const handleStart = () => {
    const players = Array.from({ length: numPlayers }, (_, i) => ({
      name: `Jugador ${i + 1}`,
      characterId: assignments[i],
    }))
    startGame(players, difficulty)
  }

  return (
    <div className={styles.screen}>
      <OceanBackground>
        <div className={styles.content}>
          <motion.div
            className={styles.logo}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, delay: 0.1 }}
          >
            <div className={styles.logoDecor}>☠️ ⚓ ☠️</div>
            <h1 className={styles.title}>ONE PIECE</h1>
            <div className={styles.subtitle}>La Gran Aventura del Sombrero de Paja</div>
          </motion.div>

          <motion.div
            className={styles.setupBox}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Difficulty */}
            <div className={styles.row}>
              <span className={styles.label}>Dificultad:</span>
              <button
                className={`${styles.diffBtn} ${difficulty === 'easy' ? styles.diffActive : ''}`}
                onClick={() => setDifficulty('easy')}
              >⭐ Fácil</button>
              <button
                className={`${styles.diffBtn} ${styles.diffHard} ${difficulty === 'hard' ? styles.diffActive : ''}`}
                onClick={() => setDifficulty('hard')}
              >💀 Difícil</button>
            </div>

            {/* Player count */}
            <div className={styles.label}>Jugadores:</div>
            <div className={styles.countRow}>
              {[1, 2, 3, 4].map(n => (
                <button
                  key={n}
                  className={`${styles.countBtn} ${numPlayers === n ? styles.countActive : ''}`}
                  onClick={() => resetPlayers(n)}
                >{n}</button>
              ))}
            </div>

            {/* Player panels */}
            <div className={styles.panels}>
              {Array.from({ length: numPlayers }, (_, i) => {
                const ch = characters.find(c => c.id === assignments[i])
                return (
                  <div
                    key={i}
                    className={`${styles.panel} ${selectingFor === i ? styles.panelActive : ''} ${ch ? styles.panelDone : ''}`}
                    style={ch ? { borderColor: ch.color } : {}}
                    onClick={() => setSelectingFor(i)}
                  >
                    <span className={styles.panelEmoji}>
                      {ch ? <CharacterIcon id={ch.id} size={36} /> : '❓'}
                    </span>
                    <span className={styles.panelNum}>J{i + 1}</span>
                    <span className={styles.panelChar}>{ch ? ch.name.split(' ')[0] : '—'}</span>
                  </div>
                )
              })}
            </div>

            {/* Character grid */}
            <div className={styles.label}>
              {selectingFor >= 0 && !allReady
                ? `Jugador ${selectingFor + 1}: elige tripulante`
                : 'Tripulación lista ✓'}
            </div>
            <div className={styles.charGrid}>
              {characters.map(ch => {
                const taken = Object.entries(assignments).some(([k, v]) => v === ch.id && Number(k) !== selectingFor)
                const selected = assignments[selectingFor] === ch.id
                return (
                  <button
                    key={ch.id}
                    className={`${styles.charCard} ${selected ? styles.charSelected : ''} ${taken ? styles.charTaken : ''}`}
                    style={{ '--ch-color': ch.color }}
                    onClick={() => !taken && pickCharacter(ch.id)}
                    disabled={taken}
                    title={ch.catchphrase}
                    aria-label={ch.name}
                  >
                    <span className={styles.charEmoji}><CharacterIcon id={ch.id} size={56} /></span>
                    <span className={styles.charName}>{ch.name.split(' ').pop()}</span>
                  </button>
                )
              })}
            </div>
          </motion.div>

          <motion.button
            className={`${styles.startBtn} ${!allReady ? styles.startDisabled : ''}`}
            disabled={!allReady}
            onClick={handleStart}
            whileHover={allReady ? { scale: 1.05, y: -2 } : {}}
            whileTap={allReady ? { scale: 0.97 } : {}}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            🚢 ¡ZARPAR!
          </motion.button>
        </div>
      </OceanBackground>
    </div>
  )
}
