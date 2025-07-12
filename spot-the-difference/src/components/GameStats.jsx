import { useGameContext } from '../context/GameContext';
import VictoryMessage from './VictoryMessage';
import './GameStats.css';

const GameStats = () => {
  const { 
    foundDifferences, 
    totalDifferences, 
    elapsedTime, 
    wrongAttempts, 
    gameCompleted,
    formatTime 
  } = useGameContext();

  return (
    <div className="game-stats">
      <div className="stat-item counter-box">
        <span className="stat-value">{foundDifferences.length}/{totalDifferences}</span>
      </div>
      <div className="stat-item timer-box">
        <span className="stat-label">Time:</span>
        <span className="stat-value">{formatTime(elapsedTime)}</span>
      </div>
      <div className="stat-item wrong-indicator">
        <span className="stat-label">Misses:</span>
        <span className="stat-value">{wrongAttempts}</span>
      </div>
      
      {/* Victory message */}
      {gameCompleted && <VictoryMessage />}
    </div>
  );
};

export default GameStats;
