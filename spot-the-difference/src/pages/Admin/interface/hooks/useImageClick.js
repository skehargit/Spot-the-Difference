import { useState } from 'react';

/**
 * Custom hook for handling image click interactions in the admin interface
 * 
 * @param {Object} initialPosition - Initial marker position and size
 * @returns {Object} - Methods and state for handling image clicks
 */
export const useImageClick = (initialPosition = { x: "50%", y: "50%", size: 5 }) => {
  const [currentDifference, setCurrentDifference] = useState(initialPosition);
  const [differences, setDifferences] = useState([]);

  /**
   * Handles click events on the right image to place difference markers
   * @param {Event} e - Click event
   * @param {Object} imageRef - Reference to the image element
   */
  const handleImageClick = (e, imageRef) => {
    if (!imageRef.current) return;

    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setCurrentDifference({
      ...currentDifference,
      x: `${x.toFixed(2)}%`,
      y: `${y.toFixed(2)}%`,
    });
  };

  /**
   * Adds the current difference to the list of differences
   */
  const addDifference = () => {
    if (currentDifference.x && currentDifference.y && currentDifference.size) {
      setDifferences([...differences, currentDifference]);
      // Reset to center of image with default size
      setCurrentDifference({ x: "50%", y: "50%", size: 5 });
    }
  };

  /**
   * Removes a difference at the specified index
   * @param {number} index - Index of the difference to remove
   */
  const removeDifference = (index) => {
    const newDifferences = [...differences];
    newDifferences.splice(index, 1);
    setDifferences(newDifferences);
  };

  return {
    currentDifference,
    setCurrentDifference,
    differences,
    setDifferences,
    handleImageClick,
    addDifference,
    removeDifference
  };
};
