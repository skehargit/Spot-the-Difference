import { useGameContext } from '../context/GameContext';
import { Link, useNavigate } from 'react-router-dom';
import './VictoryMessage.css';

const VictoryMessage = () => {
  const { 
    foundDifferences, 
    totalDifferences, 
    elapsedTime, 
    formatTime, 
    restartGame 
  } = useGameContext();
  
  const navigate = useNavigate();

  // Handle restart game
  const handleRestartGame = () => {
    restartGame();
    // Force a small delay to ensure the game state is reset before starting again
    setTimeout(() => {
      window.location.reload(); // Force reload to ensure clean restart
    }, 100);
  };

  // Handle navigation to games catalog
  const handleGoToGames = () => {
    navigate('/games');
  };

  return (
    <div className="victory-message animate-fade-in">
      <h2 className="victory-title">Congratulations!</h2>
      <p className="victory-text">
        You found all {totalDifferences} differences in {formatTime(elapsedTime)}!
      </p>
      
      <div className="victory-buttons">
        <button 
          onClick={handleRestartGame}
          className="btn-play-again"
        >
          Play Again
        </button>
        
        <button 
          onClick={handleGoToGames}
          className="btn-games"
        >
          More Games
        </button>
      </div>
    </div>
  );
};

export default VictoryMessage;
