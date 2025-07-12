/**
 * Audio module for the Spot the Difference game
 * Using the same approach as the working audio-test.html file
 */

// Make sure to expose GameAudio as a global variable
window.GameAudio = {
  // Debug mode for logging
  debug: true,
  
  /**
   * Initialize audio system
   */
  init: function() {
    if (this.debug) console.log('Initializing audio system...');
    
    // Check if audio elements exist
    const clickSound = document.getElementById('click-sound');
    const correctSound = document.getElementById('correct-sound');
    const loseSound = document.getElementById('lose-sound');
    
    if (!clickSound || !correctSound || !loseSound) {
      console.error('Audio elements not found in the DOM');
      return false;
    }
    
    if (this.debug) console.log('Audio elements found successfully');
    return true;
  },
  
  /**
   * Play the click sound
   */
  playClickSound: function() {
    this.playSound('click-sound');
  },
  
  /**
   * Play the correct sound
   */
  playCorrectSound: function() {
    this.playSound('correct-sound');
  },
  
  /**
   * Play the lose sound
   */
  playLoseSound: function() {
    this.playSound('lose-sound');
  },
  
  /**
   * Play a sound by its element ID
   * Using the exact same approach as the working audio-test.html
   */
  playSound: function(id) {
    if (this.debug) console.log(`Attempting to play sound: ${id}`);
    
    const sound = document.getElementById(id);
    
    if (!sound) {
      console.error(`Error: Could not find audio element with id "${id}"`);
      return;
    }
    
    try {
      // Reset to beginning
      sound.currentTime = 0;
      
      // Play the sound
      const playPromise = sound.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            if (this.debug) console.log(`Successfully playing ${id}`);
          })
          .catch(error => {
            console.error(`Error playing ${id}:`, error);
          });
      }
    } catch (error) {
      console.error(`Error playing ${id}:`, error);
    }
  }
};

// Export for ES modules compatibility
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GameAudio;
}
