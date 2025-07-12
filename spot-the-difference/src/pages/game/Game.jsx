import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGameContext } from "../../context/GameContext";
import "./Game.css";
import ImageContainer from "../../components/ImageContainer";
import GameStats from "../../components/GameStats";
import VictoryMessage from "../../components/VictoryMessage";
const GamePage = () => {
  const { gameConfig, gameCompleted } = useGameContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateGameConfig, startGame } = useGameContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const gameStartedRef = useRef(false);
  const configLoadedRef = useRef(false);

  // Load game configuration only once
  useEffect(() => {
    // Prevent multiple loads
    if (configLoadedRef.current) return;

    if (!id) {
      navigate("/games");
      return;
    }

    configLoadedRef.current = true;

    // First, fetch the game catalog to find the config file path
    fetch("/data/game_catalog.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load game catalog");
        }
        return response.json();
      })
      .then((catalog) => {
        // Find the game with matching ID
        const game = catalog.games.find((g) => g.id === id);

        if (!game) {
          throw new Error(`Game with ID "${id}" not found`);
        }

        // Now fetch the specific game configuration
        return fetch(`/data/${game.configFile}`);
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load game configuration");
        }
        return response.json();
      })
      .then((gameConfig) => {
        // Update the game context with the loaded configuration
        updateGameConfig(gameConfig);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading game:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [id, navigate, updateGameConfig]);

  // Start game only once when loading is complete
  useEffect(() => {
    if (!loading && !gameStartedRef.current && !error) {
      gameStartedRef.current = true;

      // Use a timeout to ensure the UI is fully rendered
      const timer = setTimeout(() => {
        startGame();
        console.log("Game started");
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [loading, error, startGame]);

  if (loading) {
    return (
      <div className="game-page-loading">
        <div className="loading-spinner"></div>
        <p>Loading game...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="game-page-error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate("/games")}>Back to Games</button>
      </div>
    );
  }

  return (
    <div className="game-page">
      <div className="game">
        <div className="game-content">
          <div className="image-container">
            {/* Left image */}
            {gameConfig && (
              <ImageContainer
                imageSrc={`/assets/${gameConfig.leftImage}`}
                differences={[]} // No differences on left image
                isRightImage={false}
              />
            )}

            {/* Counter and timer */}
            <GameStats />

            {/* Right image */}
            {gameConfig && (
              <ImageContainer
                imageSrc={`/assets/${gameConfig.rightImage}`}
                differences={gameConfig.differences}
                isRightImage={true}
              />
            )}
          </div>
        </div>

        {/* Victory message */}
        {gameCompleted && <VictoryMessage />}

        {/* Audio elements */}
        <audio id="click-sound" src="/assets/click.wav" preload="auto"></audio>
        <audio
          id="correct-sound"
          src="/assets/correct.wav"
          preload="auto"
        ></audio>
        <audio id="lose-sound" src="/assets/lose.wav" preload="auto"></audio>
      </div>
    </div>
  );
};

export default GamePage;
