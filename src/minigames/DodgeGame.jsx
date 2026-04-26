import { useLang } from '../i18n/useLang'
import { useState, useEffect, useRef, useCallback } from 'react'
import { sounds } from '../audio/soundEngine'
import styles from './DodgeGame.module.css'
import LuffyHatSvg from '../components/LuffyHatSvg'

export default function DodgeGame({ difficulty, onComplete, timeLimit = null, bonusTime = 0, bonusLives = 0 }) {
  const { t } = useLang()
  const maxLives = (difficulty === 'easy' ? 3 : 2) + bonusLives
  const defaultTime = (difficulty === 'easy' ? 40 : 35) + bonusTime
  const totalTime = timeLimit != null ? timeLimit : defaultTime
  const boltInterval = difficulty === 'easy' ? 1400 : 900
  const boltSpeed = difficulty === 'easy' ? 3.5 : 5.5 // % per frame

  const [lives, setLives] = useState(maxLives)
  const [timeLeft, setTimeLeft] = useState(totalTime)
  const [status, setStatus] = useState('playing')
  const [luffyX, setLuffyX] = useState(50)
  const [bolts, setBolts] = useState([])
  const [hitFlash, setHitFlash] = useState(false)

  const livesRef = useRef(maxLives)
  const doneRef = useRef(false)
  const cbRef = useRef(onComplete)
  useEffect(() => { cbRef.current = onComplete })
  const luffyXRef = useRef(50)
  const luffyDivRef = useRef(null)
  const statusRef = useRef('playing')
  const boltIdRef = useRef(0)
  const rafRef = useRef()
  const boltsRef = useRef([])

  const updateLuffyX = useCallback((val) => {
    const clamped = Math.max(5, Math.min(95, val))
    luffyXRef.current = clamped
    if (luffyDivRef.current) luffyDivRef.current.style.left = clamped + '%'
  }, [])

  const handlePointerMove = useCallback((e) => {
    if (statusRef.current !== 'playing') return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    updateLuffyX(x)
  }, [updateLuffyX])

  const endGame = useCallback((livesLeft) => {
    if (doneRef.current) return
    doneRef.current = true
    cancelAnimationFrame(rafRef.current)
    const hits = maxLives - livesLeft
    const stars = hits === 0 ? 3 : hits === 1 ? 2 : 1
    const berries = Math.max(50, livesLeft * 150 + 50)
    setTimeout(() => cbRef.current(stars, berries), 1200)
  }, [maxLives])

  // Timer
  useEffect(() => {
    if (status !== 'playing') return
    const id = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(id)
          statusRef.current = 'won'
          setStatus('won')
          endGame(livesRef.current)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [status, endGame])

  // Spawn bolts
  useEffect(() => {
    if (status !== 'playing') return
    const aimedChance = difficulty === 'hard' ? 0.65 : 0.45
    const id = setInterval(() => {
      if (statusRef.current !== 'playing') return
      const numBolts = difficulty === 'hard' ? (Math.random() > 0.5 ? 2 : 1) : 1
      for (let i = 0; i < numBolts; i++) {
        const aimed = Math.random() < aimedChance
        const x = aimed
          ? Math.max(10, Math.min(90, luffyXRef.current + (Math.random() - 0.5) * 18))
          : 10 + Math.random() * 80
        const bolt = { id: boltIdRef.current++, x, y: -5 }
        boltsRef.current = [...boltsRef.current, bolt]
      }
      setBolts([...boltsRef.current])
    }, boltInterval)
    return () => clearInterval(id)
  }, [status, boltInterval, difficulty])

  // RAF loop — move bolts, check collision
  useEffect(() => {
    if (status !== 'playing') return
    const tick = () => {
      if (statusRef.current !== 'playing') return
      boltsRef.current = boltsRef.current
        .map(b => ({ ...b, y: b.y + boltSpeed }))
        .filter(b => {
          if (b.y > 100) return false // off screen
          // Collision: luffy is at bottom ~85%, width ~8%
          const lx = luffyXRef.current
          if (b.y >= 78 && b.y <= 90 && Math.abs(b.x - lx) < 7) {
            // HIT
            sounds.zap()
            livesRef.current--
            setLives(livesRef.current)
            setHitFlash(true)
            setTimeout(() => setHitFlash(false), 400)
            if (livesRef.current <= 0) {
              statusRef.current = 'failed'
              setStatus('failed')
              endGame(0)
            }
            return false
          }
          return true
        })
      setBolts([...boltsRef.current])
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [status, boltSpeed, endGame])

  // Keyboard & touch
  useEffect(() => {
    const onKey = (e) => {
      if (statusRef.current !== 'playing') return
      if (e.key === 'ArrowLeft') {
        updateLuffyX(luffyXRef.current - 6)
      } else if (e.key === 'ArrowRight') {
        updateLuffyX(luffyXRef.current + 6)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [updateLuffyX])

  const pct = (timeLeft / totalTime) * 100

  return (
    <div
      className={`${styles.wrapper} ${hitFlash ? styles.hitFlash : ''}`}
      onPointerMove={handlePointerMove}
      style={{ touchAction: 'none' }}
    >
      <div className={styles.hud}>
        <div className={styles.timerBar} style={{ '--pct': `${pct}%` }}>⏱️ {timeLeft}s</div>
        <div className={styles.lives}>{'❤️'.repeat(lives)}{'🖤'.repeat(maxLives - lives)}</div>
      </div>
      <div className={styles.sky}>
        <div className={styles.enel} aria-label="Enel">⚡😈⚡</div>
        {bolts.map(b => (
          <div key={b.id} className={styles.bolt} style={{ left: `${b.x}%`, top: `${b.y}%` }}>⚡</div>
        ))}
        <div className={`${styles.luffy} ${hitFlash ? styles.luffyHit : ''}`} ref={luffyDivRef} style={{ left: '50%' }}>
          <LuffyHatSvg size={72} />
        </div>
      </div>
      <div className={styles.hint}>{t.moveHint}</div>
      {status === 'won' && <div className={styles.feedbackGood}>{t.dodgeWon}</div>}
      {status === 'failed' && <div className={styles.feedbackBad}>{t.dodgeLost}</div>}
    </div>
  )
}
