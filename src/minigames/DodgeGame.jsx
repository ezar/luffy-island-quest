import { useState, useEffect, useRef, useCallback } from 'react'
import styles from './DodgeGame.module.css'

export default function DodgeGame({ difficulty, onComplete, timeLimit = null }) {
  const maxLives = difficulty === 'easy' ? 3 : 2
  const defaultTime = difficulty === 'easy' ? 40 : 35
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
  const statusRef = useRef('playing')
  const boltIdRef = useRef(0)
  const rafRef = useRef()
  const boltsRef = useRef([])

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
    const id = setInterval(() => {
      if (statusRef.current !== 'playing') return
      const numBolts = difficulty === 'hard' ? (Math.random() > 0.5 ? 2 : 1) : 1
      for (let i = 0; i < numBolts; i++) {
        const x = 10 + Math.random() * 80
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
        luffyXRef.current = Math.max(5, luffyXRef.current - 6)
        setLuffyX(luffyXRef.current)
      } else if (e.key === 'ArrowRight') {
        luffyXRef.current = Math.min(95, luffyXRef.current + 6)
        setLuffyX(luffyXRef.current)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const handleTouchMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100
    luffyXRef.current = Math.max(5, Math.min(95, x))
    setLuffyX(luffyXRef.current)
  }

  const pct = (timeLeft / totalTime) * 100

  return (
    <div
      className={`${styles.wrapper} ${hitFlash ? styles.hitFlash : ''}`}
      onTouchMove={handleTouchMove}
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
        <div className={`${styles.luffy} ${hitFlash ? styles.luffyHit : ''}`} style={{ left: `${luffyX}%` }}>🎩</div>
      </div>
      <div className={styles.hint}>← → para moverse</div>
      {status === 'won' && <div className={styles.feedbackGood}>✅ ¡Luffy sobrevivió!</div>}
      {status === 'failed' && <div className={styles.feedbackBad}>💀 ¡Luffy fue fulminado!</div>}
    </div>
  )
}
