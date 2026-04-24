import { useGameStore } from './store/gameStore'
import { useLang } from './i18n/useLang'
import StartScreen from './screens/StartScreen'
import MapScreen from './screens/MapScreen'
import IslandScreen from './screens/IslandScreen'
import ResultScreen from './screens/ResultScreen'
import EndScreen from './screens/EndScreen'
import LuffyHat from './components/LuffyHat'
import Footer from './components/Footer'
import styles from './App.module.css'

export default function App() {
  const phase = useGameStore(s => s.phase)
  const { t, toggleLang } = useLang()

  return (
    <>
      {phase === 'start' && <StartScreen />}
      {phase === 'map' && <MapScreen />}
      {(phase === 'island' || phase === 'minigame') && <IslandScreen />}
      {phase === 'result' && <ResultScreen />}
      {phase === 'end' && <EndScreen />}
      <LuffyHat />
      <button className={styles.langBtn} onClick={toggleLang} aria-label="Toggle language">
        {t.langToggle}
      </button>
      <Footer />
    </>
  )
}
