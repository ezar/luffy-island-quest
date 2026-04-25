import { useState, useEffect, useRef, useCallback } from 'react'
import { useLang } from '../i18n/useLang'
import { sounds } from '../audio/soundEngine'
import styles from './PuzzleGame.module.css'

const PALETTE = ['🍖', '⚓', '🌸', '⚔️', '💎']

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function getFeedback(guess, secret) {
  const secretLeft = [...secret]
  const guessLeft  = [...guess]
  let green = 0, yellow = 0
  for (let i = 0; i < secret.length; i++) {
    if (guess[i] === secret[i]) {
      green++; secretLeft[i] = null; guessLeft[i] = null
    }
  }
  for (let i = 0; i < guess.length; i++) {
    if (guessLeft[i] == null) continue
    const j = secretLeft.indexOf(guessLeft[i])
    if (j !== -1) { yellow++; secretLeft[j] = null }
  }
  return { green, yellow }
}

export default function PuzzleGame({ difficulty, onComplete, timeLimit = null, bonusTime = 0, bonusAttempts = 0 }) {
  const { t } = useLang()
  const codeLen     = difficulty === 'easy' ? 3 : 4
  const paletteSize = 5
  const maxAttempts = (difficulty === 'easy' ? 5 : 4) + bonusAttempts
  const defaultTime = (difficulty === 'easy' ? 90 : 60) + bonusTime
  const totalTime   = timeLimit ?? defaultTime

  const palette      = PALETTE.slice(0, paletteSize)
  const [secret]     = useState(() => shuffle(palette).slice(0, codeLen))
  const [guesses,    setGuesses]  = useState([])
  const [current,    setCurrent]  = useState([])
  const [timeLeft,   setTimeLeft] = useState(totalTime)
  const [status,     setStatus]   = useState('playing')

  const doneRef   = useRef(false)
  const statusRef = useRef('playing')
  const timeRef   = useRef(totalTime)
  const cbRef     = useRef(onComplete)
  useEffect(() => { cbRef.current = onComplete })
  useEffect(() => { timeRef.current = timeLeft }, [timeLeft])

  const endGame = useCallback((won, used) => {
    if (doneRef.current) return
    doneRef.current = true
    const stars  = won ? (used === 1 ? 3 : used <= 3 ? 2 : 1) : 1
    const berries = won ? Math.max(50, (maxAttempts - used + 1) * 80 + timeRef.current * 2) : 0
    if (won) sounds.win(); else sounds.lose()
    setTimeout(() => cbRef.current(stars, berries), 1600)
  }, [maxAttempts])

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(id)
          if (statusRef.current === 'playing') {
            statusRef.current = 'lost'
            setStatus('lost')
            endGame(false, maxAttempts)
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [endGame, maxAttempts])

  const addSymbol = useCallback((sym) => {
    if (statusRef.current !== 'playing') return
    setCurrent(prev => (prev.length >= codeLen || prev.includes(sym)) ? prev : [...prev, sym])
  }, [codeLen])

  const removeLast = useCallback(() => setCurrent(prev => prev.slice(0, -1)), [])

  const submitGuess = useCallback(() => {
    if (statusRef.current !== 'playing') return
    setCurrent(prev => {
      if (prev.length !== codeLen) return prev
      const fb = getFeedback(prev, secret)
      setGuesses(g => {
        const next = [...g, { symbols: prev, ...fb }]
        if (fb.green === codeLen) {
          statusRef.current = 'won'; setStatus('won'); endGame(true, next.length)
        } else if (next.length >= maxAttempts) {
          statusRef.current = 'lost'; setStatus('lost'); endGame(false, next.length)
        }
        return next
      })
      return []
    })
  }, [codeLen, secret, maxAttempts, endGame])

  const pct = (timeLeft / totalTime) * 100

  return (
    <div className={styles.wrapper}>
      {/* HUD */}
      <div className={styles.hud}>
        <div className={styles.timerBar} style={{ '--pct': `${pct}%` }}>⏱️ {timeLeft}s</div>
        <div className={styles.hudAttempts}>{t.attemptsLeft(maxAttempts - guesses.length)}</div>
      </div>

      {/* Robin */}
      <div className={styles.robin}>
        {status === 'won' ? t.robinFree : t.robinNeedsHelp}
      </div>

      {/* Legend */}
      <div className={styles.legend}>
        <span className={styles.dotGreen} /> {t.mastermindGreen}
        &nbsp;&nbsp;&nbsp;
        <span className={styles.dotYellow} /> {t.mastermindYellow}
      </div>

      {/* Guess history */}
      <div className={styles.guessGrid}>
        {guesses.map((g, i) => (
          <div key={i} className={styles.guessRow}>
            <div className={styles.guessSymbols}>
              {g.symbols.map((s, j) => <span key={j} className={styles.guessSym}>{s}</span>)}
            </div>
            <div className={styles.feedback}>
              {Array.from({ length: g.green   }).map((_, j) => <span key={`g${j}`} className={styles.dotGreen}  />)}
              {Array.from({ length: g.yellow  }).map((_, j) => <span key={`y${j}`} className={styles.dotYellow} />)}
              {Array.from({ length: codeLen - g.green - g.yellow }).map((_, j) => <span key={`e${j}`} className={styles.dotEmpty} />)}
            </div>
          </div>
        ))}
        {/* Ghost rows for remaining attempts */}
        {status === 'playing' && Array.from({ length: maxAttempts - guesses.length - 1 }).map((_, i) => (
          <div key={`ph${i}`} className={`${styles.guessRow} ${styles.guessRowGhost}`}>
            <div className={styles.guessSymbols}>
              {Array.from({ length: codeLen }).map((_, j) => (
                <span key={j} className={`${styles.guessSym} ${styles.guessSymGhost}`}>?</span>
              ))}
            </div>
            <div className={styles.feedback}>
              {Array.from({ length: codeLen }).map((_, j) => <span key={j} className={styles.dotEmpty} />)}
            </div>
          </div>
        ))}
      </div>

      {/* Active guess row */}
      {status === 'playing' && (
        <div className={styles.currentRow}>
          {Array.from({ length: codeLen }).map((_, i) => (
            <span key={i} className={`${styles.slot} ${current[i] ? styles.slotFilled : ''}`}>
              {current[i] ?? ''}
            </span>
          ))}
          <button className={styles.deleteBtn} onClick={removeLast} disabled={current.length === 0}>⌫</button>
          <button
            className={`${styles.submitBtn} ${current.length === codeLen ? styles.submitReady : ''}`}
            onClick={submitGuess}
            disabled={current.length !== codeLen}
          >✓</button>
        </div>
      )}

      {/* Symbol palette */}
      {status === 'playing' && (
        <div className={styles.palette}>
          {palette.map(sym => (
            <button
              key={sym}
              className={`${styles.symBtn} ${current.includes(sym) ? styles.symUsed : ''}`}
              onClick={() => { sounds.click(); addSymbol(sym) }}
              disabled={current.includes(sym) || current.length >= codeLen}
            >
              {sym}
            </button>
          ))}
        </div>
      )}

      {/* End overlay */}
      {status !== 'playing' && (
        <div className={styles.overlay}>
          <div className={styles.overlayCard}>
            <div className={styles.overlayEmoji}>{status === 'won' ? '🌸' : '💀'}</div>
            <div className={styles.overlayTitle}>
              {status === 'won' ? t.correct : t.mastermindLost}
            </div>
            <div className={styles.overlaySecret}>
              {secret.map((s, i) => <span key={i} className={styles.secretSym}>{s}</span>)}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
