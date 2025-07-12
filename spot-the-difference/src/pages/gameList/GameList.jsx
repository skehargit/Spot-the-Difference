import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './GameList.css';

const GameList = () => {
  const [catalog, setCatalog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handleGameClick = (gameId) => {
    // Navigate to the game page with the selected game ID
    navigate(`/game/${gameId}`);
  };

  if (loading) {
    return <div className="game-list-loading">Loading games...</div>;
  }

  if (error) {
    return <div className="game-list-error">Error: {error}</div>;
  }

  return (
    <div className="game-list-container">
      <div className="game-grid">
        {catalog && catalog.games && catalog.games.map(game => (
          <div 
            key={game.id} 
            className="game-card"
            onClick={() => handleGameClick(game.id)}
          >
            <div className="game-thumbnail">
              <img 
                src={`/assets/${game.thumbnail}`} 
                alt={game.title} 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                }}
              />
            </div>
            <div className="game-info">
              <h3>{game.title}</h3>
              {game.description && <p>{game.description}</p>}
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

export default GameList;