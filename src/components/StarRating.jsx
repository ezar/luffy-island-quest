import { useEffect, useState } from 'react'
import { sounds } from '../audio/soundEngine'
import styles from './StarRating.module.css'

export default function StarRating({ stars, animate = true }) {
  const [shown, setShown] = useState(animate ? 0 : stars)

  useEffect(() => {
    if (!animate) { setShown(stars); return }
    setShown(0)
    const timers = []
    for (let i = 1; i <= stars; i++) {
      timers.push(setTimeout(() => {
        setShown(i)
        sounds.star()
      }, i * 450))
    }
    return () => timers.forEach(clearTimeout)
  }, [stars, animate])

  return (
    <div className={styles.container} role="img" aria-label={`${stars} estrellas de 3`}>
      {[1, 2, 3].map(n => (
        <span
          key={n}
          className={`${styles.star} ${n <= shown ? styles.earned : styles.empty}`}
          aria-hidden="true"
        >
          ⭐
        </span>
      ))}
    </div>
  )
}
