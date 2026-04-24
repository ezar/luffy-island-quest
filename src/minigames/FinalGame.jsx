import { useLang } from '../i18n/useLang'
import { useState, useEffect, useRef, useCallback } from 'react'
import styles from './FinalGame.module.css'

const SYMBOLS = ['👑','⚓','🏴‍☠️','⚔️','🗺️','🔱','💎','🌊']

export default function FinalGame({ difficulty, onComplete, timeLimit = null }) {
  const { t } = useLang()
  const totalRounds = difficulty === 'easy' ? 5 : 6
  const startLen = difficulty === 'easy' ? 3 : 4
  const maxErrors = difficulty === 'easy' ? 2 : 1

  const [round, setRound] = useState(1)
  const [sequence, setSequence] = useState([])
  const [phase, setPhase] = useState('showing') // showing | input | wrong | correct | done
  const [showIdx, setShowIdx] = useState(-1)   // which symbol in sequence is highlighted during show
  const [playerInput, setPlayerInput] = useState([])
  const [errors, setErrors] = useState(0)
  const [wrongIdx, setWrongIdx] = useState(null)
  const doneRef = useRef(false)
  const cbRef = useRef(onComplete)
  useEffect(() => { cbRef.current = onComplete })
  const errorsRef = useRef(0)

  const endGame = useCallback((errs) => {
    if (doneRef.current) return
    doneRef.current = true
    const stars = errs === 0 ? 3 : errs === 1 ? 2 : 1
    const berries = Math.max(50, (maxErrors + 1 - errs) * 150 + 50)
    setTimeout(() => cbRef.current(stars, berries), 1400)
  }, [maxErrors])

  // Build sequence for a round
  const buildSeq = useCallback((r) => {
    const len = startLen + (r - 1)
    const seq = Array.from({ length: len }, () => Math.floor(Math.random() * SYMBOLS.length))
    return seq
  }, [startLen])

  // Start new round: generate sequence and show it
  const startRound = useCallback((r) => {
    const seq = buildSeq(r)
    setSequence(seq)
    setPlayerInput([])
    setShowIdx(-1)
    setPhase('showing')

    // Show each symbol with delay
    let i = 0
    const showNext = () => {
      if (i >= seq.length) {
        setShowIdx(-1)
        setPhase('input')
        return
      }
      setShowIdx(i)
      i++
      setTimeout(showNext, 800)
    }
    setTimeout(showNext, 600)
  }, [buildSeq])

  // Initialize first round
  useEffect(() => {
    startRound(1)
  }, [startRound])

  const handleSymbol = (symIdx) => {
    if (phase !== 'input') return
    const newInput = [...playerInput, symIdx]
    const pos = newInput.length - 1

    if (newInput[pos] !== sequence[pos]) {
      // Wrong
      setWrongIdx(symIdx)
      errorsRef.current++
      setErrors(errorsRef.current)
      setTimeout(() => {
        setWrongIdx(null)
        if (errorsRef.current > maxErrors) {
          setPhase('done')
          endGame(errorsRef.current)
        } else {
          // Retry same round
          startRound(round)
        }
      }, 900)
      return
    }

    setPlayerInput(newInput)

    if (newInput.length === sequence.length) {
      // Round complete!
      setPhase('correct')
      setTimeout(() => {
        if (round >= totalRounds) {
          setPhase('done')
          endGame(errorsRef.current)
        } else {
          const nextRound = round + 1
          setRound(nextRound)
          startRound(nextRound)
        }
      }, 800)
    }
  }

  const numSymbols = SYMBOLS.length

  return (
    <div className={styles.wrapper}>
      <div className={styles.hud}>
        <div className={styles.roundInfo}>{t.round(round, totalRounds)}</div>
        <div className={styles.seqLen}>{t.sequence(sequence.length)}</div>
        <div className={styles.errInfo}>{t.errors(errors, maxErrors)}</div>
      </div>

      <div className={styles.status}>
        {phase === 'showing' && <span className={styles.statusShowing}>{t.memorizeHint}</span>}
        {phase === 'input' && <span className={styles.statusInput}>{t.yourTurn}</span>}
        {phase === 'correct' && <span className={styles.statusCorrect}>✅ ¡Correcto!</span>}
        {phase === 'done' && errors > maxErrors && <span className={styles.statusBad}>{t.finalLost}</span>}
        {phase === 'done' && errors <= maxErrors && <span className={styles.statusCorrect}>{t.finalWon}</span>}
      </div>

      {/* Sequence preview during showing phase */}
      <div className={styles.seqPreview}>
        {sequence.map((symIdx, i) => (
          <div
            key={i}
            className={`${styles.seqSlot} ${showIdx === i ? styles.seqSlotActive : ''} ${phase === 'input' ? styles.seqSlotHidden : ''}`}
          >
            {phase !== 'input' ? SYMBOLS[symIdx] : '?'}
          </div>
        ))}
      </div>

      {/* Player input progress */}
      <div className={styles.inputProgress}>
        {sequence.map((_, i) => (
          <div key={i} className={`${styles.dot} ${i < playerInput.length ? styles.dotFilled : ''}`} />
        ))}
      </div>

      {/* Symbol buttons */}
      <div className={styles.symGrid}>
        {SYMBOLS.map((sym, i) => (
          <button
            key={i}
            className={`${styles.symBtn} ${wrongIdx === i ? styles.symWrong : ''} ${showIdx !== -1 && sequence[showIdx] === i ? styles.symHighlight : ''}`}
            onClick={() => handleSymbol(i)}
            disabled={phase !== 'input'}
            aria-label={sym}
          >
            {sym}
          </button>
        ))}
      </div>
    </div>
  )
}
