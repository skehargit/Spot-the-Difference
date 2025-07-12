import React, { useState, useEffect } from 'react';
import { useGameContext } from '../context/GameContext';

const GameSelector = ({ onGameSelected }) => {
  const [catalog, setCatalog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { updateGameConfig } = useGameContext();

  useEffect(() => {
    // Load the game catalog
    fetch('/data/game_catalog.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load game catalog');
        }
        return response.json();
      })
      .then(data => {
        console.log('Game catalog loaded:', data);
        setCatalog(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading game catalog:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSelectGame = (configFile) => {
    console.log('Loading game config:', configFile);
    
    // Load the selected game configuration
    fetch(`/data/${configFile}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load game config: ${configFile}`);
        }
        return response.json();
      })
      .then(gameConfig => {
        console.log('Game config loaded:', gameConfig);
        updateGameConfig(gameConfig);
        
        // Notify parent component that a game was selected
        if (onGameSelected) {
          onGameSelected(gameConfig);
        }
      })
      .catch(err => {
        console.error('Error loading game config:', err);
        setError(err.message);
      });
  };

  if (loading) {
    return <div className="loading">Loading games...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="game-selector">
      <h2>Choose a Game</h2>
      
      <div className="game-grid">
        {catalog && catalog.games && catalog.games.map(game => (
          <div 
            key={game.id} 
            className="game-card"
            onClick={() => handleSelectGame(game.configFile)}
          >
            <div className="game-thumbnail">
              <img 
                src={`/assets/${game.thumbnail}`} 
                alt={game.title} 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/assets/placeholder.jpg';
                }}
              />
            </div>
            <div className="game-info">
              <h3>{game.title}</h3>
              <p>{game.description}</p>
              <span className={`difficulty ${game.difficulty}`}>
                {game.difficulty}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameSelector;
