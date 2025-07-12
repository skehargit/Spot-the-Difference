import React from 'react';

/**
 * Component for displaying the list of differences
 */
const DifferencesList = ({ differences, removeDifference }) => {
  return (
    <div className="differences-list">
      <h3>Differences ({differences.length})</h3>
      {differences.length === 0 ? (
        <p>
          No differences added yet. Click on the right image to place
          differences.
        </p>
      ) : (
        <ul>
          {differences.map((diff, index) => (
            <li key={index}>
              <div className="difference-item-content">
                Difference #{index + 1}: X: {diff.x}, Y: {diff.y}, Size:{" "}
                {diff.size}
              </div>
              <div className="difference-item-actions">
                <button onClick={() => removeDifference(index)}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DifferencesList;
