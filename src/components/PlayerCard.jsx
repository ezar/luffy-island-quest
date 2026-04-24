import styles from './PlayerCard.module.css'
import { characters } from '../data/characters'

/**
 * Tarjeta de un jugador con personaje, nombre y puntuación.
 * @param {object} props
 * @param {{id:number,name:string,characterId:string,berries:number,stars:number}} props.player
 * @param {boolean} [props.active=false] - si es el turno actual
 * @param {boolean} [props.compact=false] - versión compacta para HUD
 */
export default function PlayerCard({ player, active = false, compact = false }) {
  const char = characters.find(c => c.id === player.characterId) || characters[0]

  return (
    <div
      className={`${styles.card} ${active ? styles.active : ''} ${compact ? styles.compact : ''}`}
      style={{ '--player-color': char.color }}
      aria-label={`${player.name}: ${player.berries} berries, ${player.stars} estrellas`}
    >
      <span className={styles.emoji}>{char.emoji}</span>
      <div className={styles.info}>
        <div className={styles.name}>{player.name}</div>
        {!compact && <div className={styles.char}>{char.name}</div>}
      </div>
      <div className={styles.score}>
        <span className={styles.berries}>🍖 {player.berries}</span>
        {!compact && <span className={styles.stars}>⭐ {player.stars}</span>}
      </div>
    </div>
  )
}
