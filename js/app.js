/**
 * Main application file for the Spot the Difference game
 * Initializes the game and coordinates all modules
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Default configuration path
  const configPath = 'data/reading_book.json';
  
  // Initialize the game
  initializeGame(configPath);
  
  // Initialize click position logging
  GameCoordinates.initClickPositionLogging();
  
  // Initialize the timer
  GameTimer.init();
  
  // Initialize audio system
  if (window.GameAudio) {
    GameAudio.init();
  }
  
  // Disable image interactions until game starts
  document.querySelectorAll('.image-wrapper img').forEach(img => {
    img.style.pointerEvents = 'none';
  });
  
  // Apply blur effect to the right image until game starts
  const rightImageWrapper = document.getElementById('right-image-container');
  if (rightImageWrapper) {
    rightImageWrapper.classList.add('blurred');
  }
});

/**
 * Initialize the game with the specified configuration
 * @param {string} configPath - Path to the game configuration file
 */
function initializeGame(configPath) {
  // Load game data from JSON file
  GameConfig.loadGameData(configPath)
    .then(data => {
      // Initialize the game with the loaded data
      GameConfig.initializeGame(data);
    })
    .catch(error => {
      console.error('Failed to initialize game:', error);
      document.querySelector('.game-header h1').textContent = 'Error loading game';
    });
}
