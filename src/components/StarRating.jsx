import { useEffect, useState } from 'react'
import styles from './StarRating.module.css'

/**
 * Muestra 1-3 estrellas con animación de aparición escalonada.
 * @param {object} props
 * @param {number} props.stars - 1, 2 o 3
 * @param {boolean} [props.animate=true] - si animar la aparición
 */
export default function StarRating({ stars, animate = true }) {
  const [shown, setShown] = useState(animate ? 0 : stars)

  useEffect(() => {
    if (!animate) { setShown(stars); return }
    setShown(0)
    const timers = []
    for (let i = 1; i <= stars; i++) {
      timers.push(setTimeout(() => setShown(i), i * 450))
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
