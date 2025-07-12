import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const GameContext = createContext();

// Custom hook to use the game context
export const useGameContext = () => useContext(GameContext);

// Provider component
export const GameProvider = ({ children }) => {
  // Game state
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [foundDifferences, setFoundDifferences] = useState([]);
  const [totalDifferences, setTotalDifferences] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [isDeveloperMode, setIsDeveloperMode] = useState(false);

  // Game configuration
  const [gameConfig, setGameConfig] = useState(null);

  // Audio references
  const [audio, setAudio] = useState({
    clickSound: null,
    correctSound: null,
    loseSound: null,
  });

  // Load game configuration
  useEffect(() => {
    const loadGameConfig = async () => {
      try {
        // Try to load from localStorage first (for developer mode persistence)
        const savedConfig = localStorage.getItem("spotDifferenceGameConfig");
        if (savedConfig) {
          const data = JSON.parse(savedConfig);
          setGameConfig(data);
          setTotalDifferences(data.differences.length);
          // console.log('Loaded game config from localStorage with', data.differences.length, 'differences');
          return;
        }

        // Fall back to default game
        const response = await fetch("/data/reading_book.json");
        const data = await response.json();
        setGameConfig(data);
        setTotalDifferences(data.differences.length);
        // console.log('Loaded default game config with', data.differences.length, 'differences');
      } catch (error) {
        console.error("Error loading game configuration:", error);
      }
    };

    loadGameConfig();

    // Initialize audio
    setAudio({
      clickSound: new Audio("/assets/click.wav"),
      correctSound: new Audio("/assets/correct.wav"),
      loseSound: new Audio("/assets/lose.wav"),
    });

    return () => {
      // Cleanup
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, []);

  // Start game function
  const startGame = () => {
    if (gameStarted) return;

    setGameStarted(true);
    setFoundDifferences([]);
    setWrongAttempts(0);
    setElapsedTime(0);
    setGameCompleted(false);

    // Start timer
    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    setTimerInterval(interval);
  };

  // Handle difference found
  const handleDifferenceFound = (index) => {
    // Play correct sound
    audio.clickSound?.play();
    audio.correctSound?.play();

    setFoundDifferences((prev) => {
      // Add the index to the array if not already included
      if (!prev.includes(index)) {
        const newFoundDifferences = [...prev, index];

        // Check if game is completed
        if (newFoundDifferences.length >= totalDifferences) {
          handleGameCompletion();
        }

        return newFoundDifferences;
      }
      return prev;
    });
  };

  // Handle wrong click
  const handleWrongClick = () => {
    // Play wrong sound
    audio.clickSound?.play();
    audio.loseSound?.play();

    setWrongAttempts((prev) => prev + 1);
  };

  // Handle game completion
  const handleGameCompletion = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
    }

    setGameCompleted(true);
    setGameStarted(false);
  };

  // Format time (seconds to MM:SS)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Toggle developer mode
  const toggleDeveloperMode = (value) => {
    // console.log('Toggling developer mode to:', value);
    setIsDeveloperMode(
      value !== undefined
        ? value
        : (prev) => {
            // console.log('Previous developer mode:', prev);
            return !prev;
          }
    );
  };

  // Update game configuration (for developer mode)
  const updateGameConfig = (newConfig) => {
    // console.log('Updating game config:', newConfig);
    setGameConfig(newConfig);

    // Reset game state when game changes
    setGameStarted(false);
    setGameCompleted(false);
    setFoundDifferences([]);
    setWrongAttempts(0);
    setElapsedTime(0);

    // Clear existing timer if any
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }

    // Update total differences when game config changes
    if (newConfig && newConfig.differences) {
      setTotalDifferences(newConfig.differences.length);
      // console.log('Updated total differences to:', newConfig.differences.length);
    }

    // If we're in developer mode, also save to localStorage for persistence
    if (isDeveloperMode) {
      try {
        localStorage.setItem(
          "spotDifferenceGameConfig",
          JSON.stringify(newConfig)
        );
        // console.log('Game config saved to localStorage');
      } catch (error) {
        console.error("Error saving game config to localStorage:", error);
      }
    }
  };

  // Restart game function
  const restartGame = () => {
    setGameStarted(false);
    setGameCompleted(false);
    setFoundDifferences([]);
    setWrongAttempts(0);
    setElapsedTime(0);

    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  };

  // Context value
  const value = {
    gameStarted,
    gameCompleted,
    foundDifferences,
    totalDifferences,
    wrongAttempts,
    elapsedTime,
    isDeveloperMode,
    gameConfig,
    startGame,
    handleDifferenceFound,
    handleWrongClick,
    formatTime,
    toggleDeveloperMode,
    updateGameConfig,
    restartGame,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
