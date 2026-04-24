import styles from './LuffyHat.module.css'

/** Sombrero de Luffy flotante — mascota permanente de la pantalla */
export default function LuffyHat() {
  return (
    <div className={styles.mascot} aria-hidden="true">
      {/* SVG simplificado del sombrero de paja */}
      <svg viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg" className={styles.hatSvg}>
        {/* Ala del sombrero */}
        <ellipse cx="40" cy="42" rx="38" ry="12" fill="#D4A017" stroke="#1A1A1A" strokeWidth="2.5"/>
        {/* Copa del sombrero */}
        <path d="M16 42 Q18 18 40 16 Q62 18 64 42 Z" fill="#E8C547" stroke="#1A1A1A" strokeWidth="2.5"/>
        {/* Banda roja */}
        <path d="M18 36 Q40 32 62 36" stroke="#D32F2F" strokeWidth="5" fill="none" strokeLinecap="round"/>
        {/* Sombra interior */}
        <ellipse cx="40" cy="38" rx="20" ry="6" fill="rgba(0,0,0,0.1)"/>
      </svg>
    </div>
  )
}
