import React from 'react';
import DifferenceMarker from './DifferenceMarker';

/**
 * Component for displaying image previews with difference markers
 */
const ImagePreview = ({ 
  leftImage, 
  rightImage, 
  leftImageRef, 
  rightImageRef, 
  handleRightImageClick, 
  differences, 
  currentDifference 
}) => {
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
  };

  return (
    <div className="image-container">
      <div className="image-wrapper">
        <h3>Left</h3>
        {leftImage ? (
          <img
            ref={leftImageRef}
            src={`/assets/${leftImage}`}
            alt="Left"
            onError={handleImageError}
          />
        ) : (
          <div className="image-placeholder">
            Left image will appear here
          </div>
        )}
      </div>

      <div className="image-wrapper">
        <h3>Right(Click to Place Differences)</h3>
        {rightImage ? (
          <div style={{ position: "relative" }}>
            <img
              ref={rightImageRef}
              src={`/assets/${rightImage}`}
              alt="Right"
              onClick={handleRightImageClick}
              onError={handleImageError}
            />

            {/* Show existing differences */}
            {differences.map((diff, index) => (
              <DifferenceMarker
                key={index}
                x={diff.x}
                y={diff.y}
                size={diff.size}
                type="existing"
                index={index}
              />
            ))}

            {/* Show current difference marker */}
            <DifferenceMarker
              x={currentDifference.x}
              y={currentDifference.y}
              size={currentDifference.size}
              type="current"
            />
          </div>
        ) : (
          <div className="image-placeholder">
            Right image will appear here
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagePreview;
