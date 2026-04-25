import { useEffect } from 'react'
import { useGameStore } from './store/gameStore'
import { useLang } from './i18n/useLang'
import StartScreen from './screens/StartScreen'
import MapScreen from './screens/MapScreen'
import IslandScreen from './screens/IslandScreen'
import ResultScreen from './screens/ResultScreen'
import EndScreen from './screens/EndScreen'
import LuffyHat from './components/LuffyHat'
import Footer from './components/Footer'
import SoundToggle from './components/SoundToggle'
import { unlockAudio, startBgMusic } from './audio/soundEngine'
import styles from './App.module.css'

export default function App() {
  const phase = useGameStore(s => s.phase)
  const { t, toggleLang } = useLang()

  useEffect(() => {
    const onFirstGesture = () => {
      unlockAudio()
      startBgMusic()
      window.removeEventListener('pointerdown', onFirstGesture)
    }
    window.addEventListener('pointerdown', onFirstGesture)
    return () => window.removeEventListener('pointerdown', onFirstGesture)
  }, [])

  return (
    <>
      {phase === 'start' && <StartScreen />}
      {phase === 'map' && <MapScreen />}
      {(phase === 'island' || phase === 'minigame') && <IslandScreen />}
      {phase === 'result' && <ResultScreen />}
      {phase === 'end' && <EndScreen />}
      <LuffyHat />
      <SoundToggle />
      <button className={styles.langBtn} onClick={toggleLang} aria-label="Toggle language">
        {t.langToggle}
      </button>
      <Footer />
    </>
  )
}
