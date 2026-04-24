import styles from './OceanBackground.module.css'

/**
 * Fondo oceánico animado con 3 capas de olas.
 * @param {object} props
 * @param {React.ReactNode} [props.children]
 * @param {'night'|'day'|'sky'} [props.variant='night']
 */
export default function OceanBackground({ children, variant = 'night' }) {
  return (
    <div className={`${styles.ocean} ${styles[variant]}`}>
      <div className={`${styles.wave} ${styles.wave1}`} aria-hidden="true" />
      <div className={`${styles.wave} ${styles.wave2}`} aria-hidden="true" />
      <div className={`${styles.wave} ${styles.wave3}`} aria-hidden="true" />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}
