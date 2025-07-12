/**
 * Coordinates module for the Spot the Difference game
 * Handles coordinate calculations and click position logging
 */

const GameCoordinates = {
  // Track current mode (default: user mode)
  isDeveloperMode: false,
  
  /**
   * Initialize click position logging and mode switching
   */
  initClickPositionLogging: function() {
    const image1 = document.getElementById('image1');
    const image2 = document.getElementById('image2');
    const image1Wrapper = document.querySelector('.image-wrapper.left');
    const image2Wrapper = document.querySelector('.image-wrapper.right');
    
    // Add click event listeners
    image1.addEventListener('click', (e) => this.handleImageClick(e, image1, image1Wrapper, 'Left image'));
    image2.addEventListener('click', (e) => this.handleImageClick(e, image2, image2Wrapper, 'Right image'));
    
    // Set up mode toggle buttons
    this.setupModeToggle();
  },
  
  /**
   * Set up mode toggle buttons
   */
  setupModeToggle: function() {
    const userModeBtn = document.getElementById('user-mode-btn');
    const devModeBtn = document.getElementById('dev-mode-btn');
    
    userModeBtn.addEventListener('click', () => {
      this.isDeveloperMode = false;
      userModeBtn.classList.add('active');
      devModeBtn.classList.remove('active');
      console.log('Switched to User Mode');
      
      // Refresh the game display for user mode
      this.refreshGameDisplay();
    });
    
    devModeBtn.addEventListener('click', () => {
      this.isDeveloperMode = true;
      devModeBtn.classList.add('active');
      userModeBtn.classList.remove('active');
      console.log('Switched to Developer Mode');
      
      // Refresh the game display for developer mode
      this.refreshGameDisplay();
    });
  },
  
  /**
   * Handle image clicks based on current mode
   */
  handleImageClick: function(event, imageElement, wrapper, imageName) {
    if (this.isDeveloperMode) {
      this.logClickPosition(event, imageElement, wrapper, imageName);
    }
    // In user mode, the clicks are handled by the differences module
  },
  
  /**
   * Calculate and log percentage position when an image is clicked
   * @param {Event} event - Click event
   * @param {HTMLElement} imageElement - The image element that was clicked
   * @param {HTMLElement} wrapper - The wrapper containing the image
   * @param {string} imageName - Name of the image for logging purposes
   */
  logClickPosition: function(event, imageElement, wrapper, imageName) {
    const rect = imageElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Calculate percentages
    const xPercent = (x / rect.width * 100).toFixed(2);
    const yPercent = (y / rect.height * 100).toFixed(2);
    
    // Log to console
    console.log(`${imageName} clicked at: x: "${xPercent}%", y: "${yPercent}%", size: 5`);
    
    // Create a visual marker at the click position
    this.createClickMarker(xPercent, yPercent, wrapper);
  },
  
  /**
   * Create a visual marker at the click position
   * @param {string} xPercent - X position as percentage
   * @param {string} yPercent - Y position as percentage
   * @param {HTMLElement} wrapper - The wrapper to add the marker to
   */
  createClickMarker: function(xPercent, yPercent, wrapper) {
    const marker = document.createElement('div');
    marker.style.position = 'absolute';
    marker.style.left = `${xPercent}%`;
    marker.style.top = `${yPercent}%`;
    marker.style.width = '5vmin';
    marker.style.height = '5vmin';
    marker.style.backgroundColor = 'rgba(0, 0, 255, 0.5)';
    marker.style.borderRadius = '50%';
    marker.style.transform = 'translateX(-50%) translateY(-50%)';
    marker.style.zIndex = '100';
    wrapper.appendChild(marker);
  },
  
  /**
   * Refresh the game display based on current mode
   */
  refreshGameDisplay: function() {
    // Update display of all difference markers based on mode
    const differenceMarkers = document.querySelectorAll('.difference');
    differenceMarkers.forEach(marker => {
      if (!this.isDeveloperMode && !marker.classList.contains('found')) {
        marker.style.backgroundColor = 'transparent';
        marker.style.border = 'none';
        marker.style.boxShadow = 'none';
      } else {
        marker.style.backgroundColor = '';
        marker.style.border = '';
        marker.style.boxShadow = '';
      }
    });
    
    // Update test marker visibility
    const testMarker = document.getElementById('test-marker');
    if (testMarker) {
      testMarker.style.display = this.isDeveloperMode ? 'block' : 'none';
    }
    
    // Reinitialize the game to update click handlers
    if (window.GameDifferences && window.GameConfig && window.GameConfig.currentGameData) {
      window.GameDifferences.initGame(window.GameConfig.currentGameData);
    }
  }
};

// Export for ES modules compatibility
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GameCoordinates;
}
