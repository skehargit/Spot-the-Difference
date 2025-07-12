/**
 * Game Configuration Module
 */
const GameConfig = {
  // Store the current game data for access across modules
  currentGameData: null,
  
  /**
   * Load game data from JSON file
   * @param {string} gameFile - Path to the game JSON file
   * @returns {Promise} - Promise resolving to game data
   */
  loadGameData: function(gameFile = 'data/reading_book.json') {
    return fetch(gameFile)
      .then(response => response.json())
      .then(data => {
        // Store the current game data
        this.currentGameData = data;
        this.initializeGame(data);
        return data;
      })
      .catch(error => {
        console.error('Error loading game data:', error);
        return null;
      });
  },
  
  /**
   * Initialize the game with the loaded data
   * @param {Object} data - Game configuration data
   */
  initializeGame: function(data) {
    // Update title
    document.querySelector('.game-header h1').textContent = data.gameTitle;
    document.title = "Spot the Difference";
    
    // Set images
    document.getElementById('image1').src = data.images.image1;
    document.getElementById('image2').src = data.images.image2;
    
    // Initialize game with the loaded data
    if (typeof GameDifferences.initGame === 'function') {
      GameDifferences.initGame(data);
    }
  }
};

// Export for ES modules compatibility
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GameConfig;
}
