import { useMemo } from 'react'
import styles from './Confetti.module.css'

const COLORS = ['#FFD700', '#FF4444', '#4FC3F7', '#81C784', '#FF8A65', '#CE93D8', '#FFFFFF']
const SHAPES = ['square', 'rect', 'circle']

export default function Confetti({ count = 60 }) {
  const particles = useMemo(() => (
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 1.2,
      duration: 1.8 + Math.random() * 1.6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      size: 6 + Math.random() * 8,
      wobble: (Math.random() - 0.5) * 60,
    }))
  ), [count])

  return (
    <div className={styles.container} aria-hidden="true">
      {particles.map(p => (
        <div
          key={p.id}
          className={`${styles.particle} ${styles[p.shape]}`}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.shape === 'rect' ? p.size * 0.45 : p.size,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            '--wobble': `${p.wobble}px`,
          }}
        />
      ))}
    </div>
  )
}
