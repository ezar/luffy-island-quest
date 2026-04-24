import { useLang } from '../i18n/useLang'
import { useState, useEffect, useRef, useCallback } from 'react'
import styles from './MemoryGame.module.css'

const CARD_SYMBOLS = ['🦈','⚓','🗺️','🏴‍☠️','⚔️','🐠','🌊','🐙']

function makeCards(numPairs) {
  const syms = CARD_SYMBOLS.slice(0, numPairs)
  const cards = [...syms, ...syms].map((sym, i) => ({ id: i, sym, flipped: false, matched: false }))
  // shuffle
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]]
  }
  return cards
}

export default function MemoryGame({ difficulty, onComplete, timeLimit = null }) {
  const { t } = useLang()
  const numPairs = difficulty === 'easy' ? 4 : 6
  const defaultTime = difficulty === 'easy' ? 60 : 45
  const totalTime = timeLimit != null ? timeLimit : defaultTime

  const [cards, setCards] = useState(() => makeCards(numPairs))
  const [selected, setSelected] = useState([]) // indices of face-up unmatched cards
  const [mismatches, setMismatches] = useState(0)
  const [timeLeft, setTimeLeft] = useState(totalTime)
  const [status, setStatus] = useState('playing') // playing | won | timeout
  const [wrongFlash, setWrongFlash] = useState(false)
  const doneRef = useRef(false)
  const cbRef = useRef(onComplete)
  useEffect(() => { cbRef.current = onComplete })
  const blockRef = useRef(false) // block clicks during mismatch reveal

  const endGame = useCallback((mm, tl) => {
    if (doneRef.current) return
    doneRef.current = true
    const stars = mm <= 2 ? 3 : mm <= 4 ? 2 : 1
    const berries = Math.max(50, (5 - mm) * 80 + tl * 3)
    setTimeout(() => cbRef.current(stars, berries), 1200)
  }, [])

  // Timer
  useEffect(() => {
    if (status !== 'playing') return
    const id = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(id)
          setStatus('timeout')
          endGame(mismatches, 0)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [status, endGame, mismatches])

  const handleCard = (idx) => {
    if (blockRef.current) return
    if (status !== 'playing') return
    if (cards[idx].matched || cards[idx].flipped) return
    if (selected.length >= 2) return

    const newCards = cards.map((c, i) => i === idx ? { ...c, flipped: true } : c)
    const newSelected = [...selected, idx]
    setCards(newCards)
    setSelected(newSelected)

    if (newSelected.length === 2) {
      const [a, b] = newSelected
      blockRef.current = true
      if (newCards[a].sym === newCards[b].sym) {
        // Match
        setTimeout(() => {
          setCards(prev => prev.map((c, i) => (i === a || i === b) ? { ...c, matched: true } : c))
          setSelected([])
          blockRef.current = false
          // Check win
          setCards(prev => {
            if (prev.every(c => c.matched)) {
              setStatus('won')
              endGame(mismatches, timeLeft)
            }
            return prev
          })
        }, 600)
      } else {
        // Mismatch
        const newMm = mismatches + 1
        setMismatches(newMm)
        setWrongFlash(true)
        setTimeout(() => {
          setCards(prev => prev.map((c, i) => (i === a || i === b) ? { ...c, flipped: false } : c))
          setSelected([])
          setWrongFlash(false)
          blockRef.current = false
        }, 900)
      }
    }
  }

  const pct = (timeLeft / totalTime) * 100
  const cols = numPairs === 4 ? 4 : 4

  return (
    <div className={styles.wrapper}>
      <div className={styles.hud}>
        <div className={styles.timerBar} style={{ '--pct': `${pct}%` }}>⏱️ {timeLeft}s</div>
        <div className={styles.mm}>❌ {mismatches}</div>
      </div>
      <div className={`${styles.grid} ${wrongFlash ? styles.wrongFlash : ''}`} style={{ '--cols': cols }}>
        {cards.map((card, idx) => (
          <button
            key={card.id}
            className={`${styles.card} ${card.flipped || card.matched ? styles.cardFront : styles.cardBack} ${card.matched ? styles.cardMatched : ''}`}
            onClick={() => handleCard(idx)}
            disabled={card.matched || card.flipped || blockRef.current || status !== 'playing'}
            aria-label={card.flipped || card.matched ? card.sym : 'Carta oculta'}
          >
            <span className={styles.cardSymbol}>{card.flipped || card.matched ? card.sym : '?'}</span>
          </button>
        ))}
      </div>
      {status === 'won' && <div className={styles.feedbackGood}>{t.memoryWon}</div>}
      {status === 'timeout' && <div className={styles.feedbackBad}>{t.memoryLost}</div>}
    </div>
  )
}
