import { GameProvider } from './context/GameContext'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import GameList from './pages/gameList/GameList'
import GamePage from './pages/game/Game'
import './App.css'
import AdminInterface from './pages/Admin/interface/AdminInterface'
import Intructions from './pages/Admin/instructions/Intructions'

function App() {
  return (
    <div className="container">
      <GameProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/games" />} />
            <Route path="/games" element={<GameList />} />
            <Route path="/game/:id" element={<GamePage />} />
            <Route path="/admin" element={<AdminInterface/>} />
            <Route path="/instructions" element={<Intructions/>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </GameProvider>
    </div>
  )
}

export default App
