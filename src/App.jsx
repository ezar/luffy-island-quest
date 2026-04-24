import { useGameStore } from './store/gameStore'
import StartScreen from './screens/StartScreen'
import MapScreen from './screens/MapScreen'
import IslandScreen from './screens/IslandScreen'
import ResultScreen from './screens/ResultScreen'
import EndScreen from './screens/EndScreen'
import LuffyHat from './components/LuffyHat'

export default function App() {
  const phase = useGameStore(s => s.phase)

  return (
    <>
      {phase === 'start' && <StartScreen />}
      {phase === 'map' && <MapScreen />}
      {(phase === 'island' || phase === 'minigame') && <IslandScreen />}
      {phase === 'result' && <ResultScreen />}
      {phase === 'end' && <EndScreen />}
      <LuffyHat />
    </>
  )
}
