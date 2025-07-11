/**
 * Timer module for the Spot the Difference game
 * Handles game timer functionality
 */

const GameTimer = {
  // Timer properties
  startTime: null,
  timerInterval: null,
  isRunning: false,
  elapsedSeconds: 0,
  
  /**
   * Initialize the timer functionality
   */
  init: function() {
    // Get DOM elements
    const startButton = document.getElementById('start-game-btn');
    const timerDisplay = document.getElementById('timer');
    
    // Set initial timer display
    timerDisplay.textContent = this.formatTime(0);
    
    // Add event listener to start button
    startButton.addEventListener('click', () => {
      this.startGame();
    });
  },
  
  /**
   * Start the game and timer
   */
  startGame: function() {
    // Only start if not already running
    if (this.isRunning) return;
    
    const startButton = document.getElementById('start-game-btn');
    const wrongIndicator = document.getElementById('wrong-indicator');
    const rightImageWrapper = document.getElementById('right-image-container');
    
    // Reset game state
    this.resetTimer();
    GameDifferences.resetGame();
    
    // Update UI
    startButton.textContent = 'Game Started';
    startButton.classList.add('disabled');
    startButton.disabled = true;
    
    // Remove blur from right image
    if (rightImageWrapper) {
      rightImageWrapper.classList.remove('blurred');
    }
    
    // Enable all difference markers
    document.querySelectorAll('.difference').forEach(marker => {
      marker.style.pointerEvents = 'auto';
    });
    
    // Initialize the timer
    this.startTime = Date.now();
    this.isRunning = true;
    
    // Start the timer interval
    this.timerInterval = setInterval(() => {
      this.updateTimer();
    }, 1000);
    
    // Enable game interactions
    document.querySelectorAll('.image-wrapper img').forEach(img => {
      img.style.pointerEvents = 'auto';
    });
    
    // Reset wrong indicator
    if (wrongIndicator) {
      wrongIndicator.textContent = 'Misses: 0';
    }
  },
  
  /**
   * Update the timer display
   */
  updateTimer: function() {
    if (!this.isRunning) return;
    
    const now = Date.now();
    this.elapsedSeconds = Math.floor((now - this.startTime) / 1000);
    
    const timerDisplay = document.getElementById('timer');
    timerDisplay.textContent = this.formatTime(this.elapsedSeconds);
  },
  
  /**
   * Reset the timer
   */
  resetTimer: function() {
    // Clear any existing interval
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    
    // Reset timer properties
    this.startTime = null;
    this.isRunning = false;
    this.elapsedSeconds = 0;
    
    // Reset timer display
    const timerDisplay = document.getElementById('timer');
    timerDisplay.textContent = this.formatTime(0);
  },
  
  /**
   * Stop the timer
   */
  stopTimer: function() {
    if (!this.isRunning) return;
    
    // Stop the timer
    clearInterval(this.timerInterval);
    this.isRunning = false;
    
    return this.elapsedSeconds;
  },
  
  /**
   * Format seconds into MM:SS
   * @param {number} seconds - Total seconds
   * @returns {string} - Formatted time string
   */
  formatTime: function(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    
    return `${formattedMinutes}:${formattedSeconds}`;
  },
  
  /**
   * Show completion message with time
   * @param {number} foundDifferences - Number of differences found
   * @param {number} totalDifferences - Total number of differences
   */
  showCompletionMessage: function(foundDifferences, totalDifferences) {
    const finalTime = this.formatTime(this.elapsedSeconds);
    
    // Get the victory message element
    const victoryMessage = document.getElementById('victory-message');
    
    // Update the message text
    victoryMessage.textContent = `Congratulations! You found all ${foundDifferences} differences in ${finalTime}!`;
    
    // Show the victory message
    victoryMessage.style.display = 'block';
    
    console.log('Victory message displayed!');
    
    // Add a click event to reset the game when clicking anywhere
    setTimeout(() => {
      document.addEventListener('click', function resetGameOnClick() {
        // Reset the game
        document.removeEventListener('click', resetGameOnClick);
        location.reload();
      });
    }, 1500);
  },
  
  /**
   * Reset the game
   */
  resetGame: function() {
    const startButton = document.getElementById('start-game-btn');
    
    // Reset timer
    this.resetTimer();
    
    // Reset button
    startButton.textContent = 'Start Game';
    startButton.classList.remove('disabled');
    startButton.disabled = false;
    
    // Disable game interactions until started again
    document.querySelectorAll('.image-wrapper img').forEach(img => {
      img.style.pointerEvents = 'none';
    });
  }
};

// Export for ES modules compatibility
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GameTimer;
}
