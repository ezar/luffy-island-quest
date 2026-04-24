import LuffyHatSvg from './LuffyHatSvg'
import styles from './LuffyHat.module.css'

export default function LuffyHat() {
  return (
    <div className={styles.mascot} aria-hidden="true">
      <LuffyHatSvg size={70} />
    </div>
  )
}
