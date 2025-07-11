/**
 * Differences module for the Spot the Difference game
 * Handles positioning and interaction with difference markers
 */

const GameDifferences = {
  // Track game statistics
  foundDifferences: 0,
  totalDifferences: 0,
  wrongAttempts: 0,
  
  /**
   * Initialize the game with loaded data
   * @param {Object} gameData - Game configuration data
   */
  initGame: function(gameData) {
    const differencesContainer = document.getElementById('differences-container');
    const image1 = document.getElementById('image1');
    const image2 = document.getElementById('image2');
    const rightImageWrapper = document.querySelector('.image-wrapper.right');
    
    // Store total number of differences
    this.totalDifferences = gameData.differences.length;
    this.foundDifferences = 0;
    
    // Update the counter display
    this.updateDifferenceCounter();
    
    // Clear any existing difference markers
    differencesContainer.innerHTML = '';
    
    // Remove any existing click handlers first
    const oldRightWrapper = rightImageWrapper.cloneNode(true);
    rightImageWrapper.parentNode.replaceChild(oldRightWrapper, rightImageWrapper);
    
    // Re-select the new wrapper
    const newRightWrapper = document.querySelector('.image-wrapper.right');
    
    // Add click handler for wrong clicks on the right image (only in user mode)
    if (!GameCoordinates.isDeveloperMode) {
      newRightWrapper.addEventListener('click', (e) => {
        // Check if the click is on a difference marker
        const isOnDifferenceMarker = e.target.classList && e.target.classList.contains('difference');
        
        // If the click is not on a difference marker, it's a wrong click
        if (!isOnDifferenceMarker) {
          this.handleWrongClick();
        }
      });
    }
    
    // Wait for images to load before positioning differences
    window.addEventListener('load', () => {
      this.positionDifferences(gameData);
    });
    
    // If images are already loaded, position the differences
    if (image2.complete) {
      this.positionDifferences(gameData);
    } else {
      image2.addEventListener('load', () => {
        this.positionDifferences(gameData);
      });
    }
  },
  
  /**
   * Position difference markers on the right image
   * @param {Object} gameData - Game configuration data
   */
  positionDifferences: function(gameData) {
    const differencesContainer = document.getElementById('differences-container');
    const rightImageWrapper = document.querySelector('.image-wrapper.right');
    
    // Clear any existing difference markers
    differencesContainer.innerHTML = '';
    
    // Position the differences container over the right image
    if (rightImageWrapper) {
      // Make sure the differences container is properly positioned
      differencesContainer.style.position = 'absolute';
      differencesContainer.style.top = '0';
      differencesContainer.style.left = '0';
      differencesContainer.style.width = '100%';
      differencesContainer.style.height = '100%';
            // Create difference markers for the right image with more visibility
      gameData.differences.forEach((diff, index) => {
        const marker = document.createElement('div');
        marker.className = 'difference';
        marker.id = `difference-${index}`;
        
        // Use percentage values directly from the JSON
        marker.style.left = diff.x;
        marker.style.top = diff.y;
        
        // Set fixed width and height using vmin units for consistent square shape
        const sizeValue = parseInt(diff.size);
        marker.style.width = `${sizeValue}vmin`;
        marker.style.height = `${sizeValue}vmin`;
        
        // Additional properties to maintain perfect squares/circles
        marker.style.aspectRatio = "1 / 1";
        marker.style.display = "block";
        
        // Set visibility based on current mode
        if (!GameCoordinates.isDeveloperMode) {
          marker.style.backgroundColor = 'transparent';
          marker.style.border = 'none';
          marker.style.boxShadow = 'none';
          
          // Only make clickable if game has started
          marker.style.pointerEvents = GameTimer && GameTimer.isRunning ? 'auto' : 'none';
        }
        
        // Add click event to mark differences as found
        marker.addEventListener('click', () => {
          // Play click sound for any click
          if (window.GameAudio) {
            window.GameAudio.playClickSound();
          }
          console.log('Difference clicked',window.GameAudio);
          
          // Only count the difference if it hasn't been found yet
          if (!marker.classList.contains('found')) {
            // Make the marker visible when found, regardless of mode
            marker.classList.add('found');
            marker.style.backgroundColor = '';
            marker.style.border = '';
            marker.style.boxShadow = '';
            
            // Play correct sound when finding a difference
            if (window.GameAudio) {
              window.GameAudio.playCorrectSound();
            }
            
            this.foundDifferences++;
            this.checkGameCompletion();
          }
        });
        
        differencesContainer.appendChild(marker);
        
        // Log each difference position for debugging
        console.log(`Difference ${index} positioned at: x=${diff.x}, y=${diff.y}, size=${diff.size}`);
      });
      
      // Add a visible test circle to verify positioning (can be removed in production)
      this.addTestMarker(differencesContainer);
    } else {
      console.error('Right image wrapper not found');
    }
  },
  
  /**
   * Add a test marker to help with positioning
   * @param {HTMLElement} container - The container to add the test marker to
   */
  addTestMarker: function(container) {
    // Only add test marker in developer mode
    if (GameCoordinates.isDeveloperMode) {
      const testMarker = document.createElement('div');
      testMarker.className = 'difference test';
      testMarker.id = 'test-difference';
      testMarker.style.left = '2%';
      testMarker.style.top = '2%';
      testMarker.style.width = '4vmin';
      testMarker.style.height = '4vmin';
      testMarker.style.aspectRatio = '1 / 1';
      testMarker.style.backgroundColor = 'blue';
      container.appendChild(testMarker);
    }
  },
  
  /**
   * Handle wrong clicks on the image
   */
  handleWrongClick: function() {
    // Increment wrong attempts counter
    this.wrongAttempts++;
    
    // Play click sound for any click
    if (window.GameAudio) {
      window.GameAudio.playClickSound();
      
      // Play lose sound for wrong attempts
      window.GameAudio.playLoseSound();
    }
    
    // Show the wrong indicator
    const wrongIndicator = document.getElementById('wrong-indicator');
    if (wrongIndicator) {
      // Update the text to only show the number of misses
      wrongIndicator.textContent = `Misses: ${this.wrongAttempts}`;
      // Reset the animation to allow it to play again
      wrongIndicator.style.animation = 'none';
      setTimeout(() => {
        wrongIndicator.style.animation = 'fadeIn 0.3s, shake 0.5s';
      }, 10);
      
      console.log(`Wrong attempt #${this.wrongAttempts}`);
    }
  },
  
  /**
   * Update the difference counter display
   */
  updateDifferenceCounter: function() {
    const foundCountElement = document.getElementById('found-count');
    const totalCountElement = document.getElementById('total-count');
    
    if (foundCountElement && totalCountElement) {
      foundCountElement.textContent = this.foundDifferences;
      totalCountElement.textContent = this.totalDifferences;
    }
  },
  
  /**
   * Reset the game state
   */
  resetGame: function() {
    // Reset counters
    this.foundDifferences = 0;
    this.wrongAttempts = 0;
    
    // Update the counter display
    this.updateDifferenceCounter();
    
    // Reset all difference markers
    const differenceMarkers = document.querySelectorAll('.difference');
    differenceMarkers.forEach(marker => {
      marker.classList.remove('found');
      
      // Reset styles based on mode
      if (!GameCoordinates.isDeveloperMode) {
        marker.style.backgroundColor = 'transparent';
        marker.style.border = 'none';
        marker.style.boxShadow = 'none';
      } else {
        marker.style.backgroundColor = '';
        marker.style.border = '';
        marker.style.boxShadow = '';
      }
    });
    
    // Reset wrong indicator
    const wrongIndicator = document.getElementById('wrong-indicator');
    if (wrongIndicator) {
      wrongIndicator.textContent = `Misses: 0`;
    }
  },
  
  /**
   * Check if all differences have been found
   */
  checkGameCompletion: function() {
    // Update the counter display
    this.updateDifferenceCounter();
    
    console.log(`Checking game completion: ${this.foundDifferences}/${this.totalDifferences} differences found`);
    console.log(`Timer running: ${GameTimer.isRunning}`);
    
    if (this.foundDifferences === this.totalDifferences && GameTimer.isRunning) {
      console.log('All differences found! Showing completion message...');
      // Stop the timer
      const finalTime = GameTimer.stopTimer();
      
      // Show completion message with time
      GameTimer.showCompletionMessage(this.foundDifferences, this.totalDifferences);
    }
  }
};

// Export for ES modules compatibility
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GameDifferences;
}
