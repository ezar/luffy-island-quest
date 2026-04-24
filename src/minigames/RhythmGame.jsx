import { useLang } from '../i18n/useLang'
import { useState, useEffect, useRef, useCallback } from 'react'
import styles from './RhythmGame.module.css'

const LANES = [
  { key: 'ArrowLeft',  label: '←', color: '#EF5350' },
  { key: 'ArrowDown',  label: '↓', color: '#FFD600' },
  { key: 'ArrowUp',    label: '↑', color: '#4CAF50' },
  { key: 'ArrowRight', label: '→', color: '#42A5F5' },
]

function generateNotes(count) {
  const notes = []
  for (let i = 0; i < count; i++) {
    notes.push({
      id: i,
      lane: Math.floor(Math.random() * 4),
      time: 1500 + i * 900, // ms from start when note should hit target
    })
  }
  return notes
}

export default function RhythmGame({ difficulty, onComplete, timeLimit = null }) {
  const { t } = useLang()
  const count = difficulty === 'easy' ? 12 : 16
  const maxMisses = difficulty === 'easy' ? 4 : 2
  const hitWindow = difficulty === 'easy' ? 200 : 120

  const [notes] = useState(() => generateNotes(count))
  const [hits, setHits] = useState(0)
  const [misses, setMisses] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [status, setStatus] = useState('playing')
  const [laneFlash, setLaneFlash] = useState({})   // { laneIdx: 'hit'|'miss' }
  const [gone, setGone] = useState(new Set())       // note ids that are done
  const startRef = useRef(Date.now())
  const rafRef = useRef()
  const doneRef = useRef(false)
  const statusRef = useRef('playing')
  const cbRef = useRef(onComplete)
  useEffect(() => { cbRef.current = onComplete })
  useEffect(() => { statusRef.current = status }, [status])
  const missesRef = useRef(0)
  const hitsRef = useRef(0)
  const goneRef = useRef(new Set())

  const handleLaneInput = useCallback((laneIdx) => {
    if (statusRef.current !== 'playing') return
    const now = Date.now() - startRef.current
    let best = null
    notes.forEach(n => {
      if (goneRef.current.has(n.id)) return
      if (n.lane !== laneIdx) return
      const diff = Math.abs(n.time - now)
      if (diff <= hitWindow) {
        if (!best || diff < Math.abs(best.time - now)) best = n
      }
    })
    if (best) {
      goneRef.current.add(best.id)
      setGone(new Set(goneRef.current))
      hitsRef.current++
      setHits(hitsRef.current)
      setLaneFlash(f => ({ ...f, [laneIdx]: 'hit' }))
      setTimeout(() => setLaneFlash(f => { const nf = {...f}; delete nf[laneIdx]; return nf }), 200)
    }
  }, [notes, hitWindow])

  const endGame = useCallback((h, m) => {
    if (doneRef.current) return
    doneRef.current = true
    cancelAnimationFrame(rafRef.current)
    const stars = m <= 1 ? 3 : m <= 3 ? 2 : 1
    const berries = Math.max(50, h * 40 + (maxMisses - m) * 80)
    setTimeout(() => cbRef.current(stars, Math.max(50, berries)), 1200)
  }, [maxMisses])

  // RAF loop
  useEffect(() => {
    if (status !== 'playing') return
    const tick = () => {
      const now = Date.now() - startRef.current
      setElapsed(now)
      // Auto-miss notes that passed target + hitWindow
      notes.forEach(n => {
        if (goneRef.current.has(n.id)) return
        if (now > n.time + hitWindow) {
          goneRef.current.add(n.id)
          setGone(new Set(goneRef.current))
          missesRef.current++
          setMisses(missesRef.current)
          setLaneFlash(f => ({ ...f, [n.lane]: 'miss' }))
          setTimeout(() => setLaneFlash(f => { const nf = {...f}; delete nf[n.lane]; return nf }), 300)
          if (missesRef.current > maxMisses) {
            setStatus('failed')
            endGame(hitsRef.current, missesRef.current)
            return
          }
        }
      })
      // Check if all notes done
      if (goneRef.current.size === notes.length) {
        setStatus('won')
        endGame(hitsRef.current, missesRef.current)
        return
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [status, notes, hitWindow, maxMisses, endGame])

  // Keydown
  useEffect(() => {
    const onKey = (e) => {
      const laneIdx = LANES.findIndex(l => l.key === e.key)
      if (laneIdx === -1) return
      e.preventDefault()
      handleLaneInput(laneIdx)
    }
    globalThis.addEventListener('keydown', onKey)
    return () => globalThis.removeEventListener('keydown', onKey)
  }, [handleLaneInput])

  // Note visual position: 0% at top, 100% at target zone (85% from top)
  const totalScroll = 3000 // ms to travel full lane height
  const targetPct = 85

  return (
    <div className={styles.wrapper}>
      <div className={styles.hud}>
        <span>🎵 {hits}/{count}</span>
        <span>❌ {misses}/{maxMisses}</span>
      </div>
      <div className={styles.lanes}>
        {LANES.map((lane, li) => (
          <div key={li} className={`${styles.lane} ${laneFlash[li] ? styles['lane_' + laneFlash[li]] : ''}`} style={{ '--lane-color': lane.color }}>
            {notes.filter(n => n.lane === li && !gone.has(n.id)).map(n => {
              const progress = (elapsed - (n.time - totalScroll)) / totalScroll
              const top = Math.min(progress * 100, 100)
              if (top < 0) return null
              return (
                <div key={n.id} className={styles.note} style={{ top: `${top}%`, '--lane-color': lane.color }} />
              )
            })}
            <div className={styles.target}>{lane.label}</div>
          </div>
        ))}
      </div>
      <div className={styles.tapButtons}>
        {LANES.map((lane, li) => (
          <button
            key={li}
            className={styles.tapBtn}
            style={{ '--lane-color': lane.color }}
            onPointerDown={(e) => { e.preventDefault(); handleLaneInput(li) }}
          >
            {lane.label}
          </button>
        ))}
      </div>
      {status === 'won' && <div className={styles.feedbackGood}>{t.rhythmWon}</div>}
      {status === 'failed' && <div className={styles.feedbackBad}>{t.rhythmLost}</div>}
    </div>
  )
}
