/**
 * Creates and downloads a game configuration JSON file
 * @param {Object} gameData - The game data to save
 * @returns {string} - The filename of the saved game
 */
export const saveGameConfig = (gameData) => {
  const { title, leftImage, rightImage, differences } = gameData;
  
  // Validate that we have all required data
  if (!title || !leftImage || !rightImage || differences.length === 0) {
    throw new Error("Missing required game data");
  }

  const newGameConfig = {
    title,
    leftImage,
    rightImage,
    differences,
  };

  // Create a JSON string of the game config
  const jsonContent = JSON.stringify(newGameConfig, null, 2);

  // Create a download link for the JSON file
  const blob = new Blob([jsonContent], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  // Generate a filename based on the title
  const filename = title.toLowerCase().replace(/[^a-z0-9]/g, "_") + ".json";

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  return filename;
};
