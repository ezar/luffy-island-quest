import { useState } from 'react'
import { getMuted, setMuted } from '../audio/soundEngine'
import styles from './SoundToggle.module.css'

export default function SoundToggle() {
  const [muted, setLocal] = useState(getMuted)

  const toggle = () => {
    const next = !muted
    setMuted(next)
    setLocal(next)
  }

  return (
    <button
      className={styles.btn}
      onClick={toggle}
      aria-label={muted ? 'Activar sonido' : 'Silenciar'}
      title={muted ? 'Activar sonido' : 'Silenciar'}
    >
      {muted ? '🔇' : '🔊'}
    </button>
  )
}
