import { useState, useEffect, useRef, useCallback } from 'react'
import styles from './PuzzleGame.module.css'

const SYMBOLS = ['⚓','🏴‍☠️','⚔️','🌸']

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function PuzzleGame({ difficulty, onComplete, timeLimit = null }) {
  const numLevers = difficulty === 'easy' ? 3 : 4
  const maxAttempts = difficulty === 'easy' ? 3 : 2
  const defaultTime = difficulty === 'easy' ? 60 : 45
  const totalTime = timeLimit != null ? timeLimit : defaultTime

  const [correctOrder] = useState(() => shuffle(Array.from({ length: numLevers }, (_, i) => i)))
  const [sequence, setSequence] = useState([])
  const [activated, setActivated] = useState([])
  const [attemptsLeft, setAttemptsLeft] = useState(maxAttempts)
  const [attemptsUsed, setAttemptsUsed] = useState(0)
  const [timeLeft, setTimeLeft] = useState(totalTime)
  const [status, setStatus] = useState('playing') // playing | wrong | solved | timeout
  const [showHint, setShowHint] = useState(difficulty === 'easy')
  const cbRef = useRef(onComplete)
  const doneRef = useRef(false)
  useEffect(() => { cbRef.current = onComplete })

  const symbols = SYMBOLS.slice(0, numLevers)
  const wallClue = correctOrder.map(i => symbols[i])

  const endGame = useCallback((used) => {
    if (doneRef.current) return
    doneRef.current = true
    setTimeLeft(t => {
      const stars = used === 1 ? 3 : used === 2 ? 2 : 1
      const berries = Math.max(50, (maxAttempts + 1 - used) * 100 + t * 2)
      setTimeout(() => cbRef.current(stars, berries), 1200)
      return t
    })
  }, [maxAttempts])

  useEffect(() => {
    if (difficulty !== 'easy') return
    const id = setTimeout(() => setShowHint(false), 2500)
    return () => clearTimeout(id)
  }, [difficulty])

  useEffect(() => {
    if (status !== 'playing' || doneRef.current) return
    const id = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(id)
          setStatus('timeout')
          endGame(maxAttempts + 1)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [status, endGame, maxAttempts])

  const handleLever = (idx) => {
    if (status !== 'playing' || doneRef.current) return
    if (activated.includes(idx)) return
    const newSeq = [...sequence, idx]
    const newActivated = [...activated, idx]
    setSequence(newSeq)
    setActivated(newActivated)

    for (let i = 0; i < newSeq.length; i++) {
      if (newSeq[i] !== correctOrder[i]) {
        const newAttempts = attemptsLeft - 1
        const used = attemptsUsed + 1
        setAttemptsLeft(newAttempts)
        setAttemptsUsed(used)
        setStatus('wrong')
        setTimeout(() => {
          setSequence([])
          setActivated([])
          if (newAttempts <= 0) { endGame(used) }
          else setStatus('playing')
        }, 900)
        return
      }
    }

    if (newSeq.length === numLevers) {
      setStatus('solved')
      const used = attemptsUsed + 1
      endGame(used)
    }
  }

  const pct = (timeLeft / totalTime) * 100

  return (
    <div className={styles.wrapper}>
      <div className={styles.hud}>
        <div className={styles.timerBar} style={{ '--pct': `${pct}%` }}>⏱️ {timeLeft}s</div>
        <div className={styles.attempts}>💪 Intentos: {attemptsLeft}</div>
      </div>

      <div className={styles.scene}>
        <div className={styles.wall}>
          <div className={styles.wallLabel}>Pistas del muro:</div>
          <div className={styles.wallClue}>
            {wallClue.map((sym, i) => (
              <span key={i} className={styles.clueSym}>{sym}</span>
            ))}
          </div>
        </div>

        <div className={`${styles.robin} ${status === 'solved' ? styles.robinFree : ''}`}>
          {status === 'solved'
            ? '🌸 Robin: ¡Gracias! ¡Libertad!'
            : '🌸 Robin: ¡Necesito tu ayuda!'}
        </div>

        <div className={styles.seqDisplay}>
          {Array.from({ length: numLevers }, (_, i) => (
            <span key={i} className={styles.seqSlot}>
              {sequence[i] !== undefined ? symbols[sequence[i]] : '_'}
            </span>
          ))}
        </div>

        <div className={styles.levers}>
          {Array.from({ length: numLevers }, (_, i) => {
            const isActive = activated.includes(i)
            const isWrong = status === 'wrong' && isActive
            const isCorrect = status === 'solved' && isActive
            return (
              <button
                key={i}
                className={`
                  ${styles.lever}
                  ${isActive ? styles.leverActive : ''}
                  ${isWrong ? styles.leverWrong : ''}
                  ${isCorrect ? styles.leverCorrect : ''}
                `}
                onClick={() => handleLever(i)}
                disabled={isActive || status !== 'playing'}
                aria-label={`Palanca ${symbols[i]}`}
              >
                <span className={styles.leverSym}>{symbols[i]}</span>
                <div className={styles.leverHandle}>
                  <div className={styles.leverStick} />
                  <div className={styles.leverBall} />
                </div>
                {showHint && (
                  <span className={styles.hintNum}>
                    {(correctOrder.indexOf(i) + 1)}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {status === 'wrong' && (
          <div className={styles.feedbackWrong}>❌ ¡Orden incorrecto! Inténtalo de nuevo.</div>
        )}
        {status === 'solved' && (
          <div className={styles.feedbackCorrect}>✅ ¡CORRECTO! ¡ROBIN LIBRE!</div>
        )}
        {status === 'timeout' && (
          <div className={styles.feedbackWrong}>⏱️ ¡Tiempo agotado!</div>
        )}
      </div>
    </div>
  )
}
