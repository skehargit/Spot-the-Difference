import React from 'react';

/**
 * Component for controlling the current difference marker
 */
const DifferenceControls = ({ currentDifference, setCurrentDifference, addDifference }) => {
  const handlePositionChange = (axis, value) => {
    setCurrentDifference({
      ...currentDifference,
      [axis]: value
    });
  };

  const handleSizeChange = (size) => {
    setCurrentDifference({
      ...currentDifference,
      size: parseInt(size) || 5
    });
  };

  return (
    <div className="difference-controls">
      <h3>Current Difference</h3>
      <div className="form-group">
        <label>X Position:</label>
        <input
          type="text"
          value={currentDifference.x}
          onChange={(e) => handlePositionChange('x', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Y Position:</label>
        <input
          type="text"
          value={currentDifference.y}
          onChange={(e) => handlePositionChange('y', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Size:</label>
        <input
          type="number"
          value={currentDifference.size}
          onChange={(e) => handleSizeChange(e.target.value)}
          min="1"
          max="20"
        />
      </div>

      <button className="btn btn-primary" onClick={addDifference}>
        Add Difference
      </button>
    </div>
  );
};

export default DifferenceControls;
