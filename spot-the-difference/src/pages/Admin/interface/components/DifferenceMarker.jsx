import React from 'react';

/**
 * Renders a marker for a difference on the image
 * 
 */
const DifferenceMarker = ({ x, y, size, type, index }) => {
  return (
    <div
      className={`marker ${type}`}
      style={{
        left: x,
        top: y,
        width: `${size}vmin`,
        height: `${size}vmin`,
      }}
    >
      {type === 'existing' && (index + 1)}
    </div>
  );
};

export default DifferenceMarker;
