import { useGameContext } from "../../../../context/GameContext";
import { saveGameConfig } from "../utils/GameSaver";

/**
 * Custom hook for handling game saving functionality
 * 
 * @returns {Object} - Methods for saving games
 */
export const useSaveGame = () => {
  const { updateGameConfig } = useGameContext();

  /**
   * Saves the game configuration and updates the game context
   * @param {Object} gameData - The game data to save
   * @returns {boolean} - True if save was successful
   */
  const saveGame = (gameData) => {
    const { title, leftImage, rightImage, differences } = gameData;
    
    // Validate that we have all required data
    if (!title || !leftImage || !rightImage || differences.length === 0) {
      alert("Please fill in all required fields and add at least one difference");
      return false;
    }

    try {
      // Use the utility function to save the game
      const filename = saveGameConfig(gameData);
      
      // Update the game config in context
      updateGameConfig(gameData);

      alert(
        `Game "${title}" saved successfully! JSON file "${filename}" has been downloaded.`
      );
      return true;
    } catch (error) {
      alert(`Error saving game: ${error.message}`);
      return false;
    }
  };

  return { saveGame };
};
