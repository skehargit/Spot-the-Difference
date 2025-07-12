import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useGameContext } from '../context/GameContext';

const ImageContainer = ({ imageSrc, differences, isRightImage }) => {
  const imageRef = useRef(null);
  const wrapperRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [markers, setMarkers] = useState([]);
  const { 
    gameStarted, 
    isDeveloperMode, 
    foundDifferences, 
    handleDifferenceFound, 
    handleWrongClick 
  } = useGameContext();

  // Handle image load event
  const handleImageLoad = () => {
    if (imageRef.current) {
      const { width, height } = imageRef.current.getBoundingClientRect();
      setImageDimensions({ width, height });
      // console.log('Image loaded with dimensions:', width, height);
      setImageLoaded(true);
      
      // Process markers when image is loaded
      if (isRightImage && differences.length > 0) {
        prepareMarkers();
      }
    }
  };
  
  // Prepare markers data for rendering - wrapped in useCallback to avoid dependency issues
  const prepareMarkers = useCallback(() => {
    // console.log('Preparing markers for differences:', differences.length);
    const markersData = differences.map((diff, index) => {
      // Parse the coordinates from the JSON data
      // Remove any % sign and convert to a number
      const xPercent = parseFloat(diff.x.toString().replace('%', ''));
      const yPercent = parseFloat(diff.y.toString().replace('%', ''));
      
      // Get the exact size from JSON - this is a raw number, not a percentage
      const sizeValue = diff.size ? parseInt(diff.size) : 5; // Default size if not specified
      
      // console.log(`Prepared marker ${index} at position ${xPercent}%, ${yPercent}% with size ${sizeValue}`);
      
      return {
        id: index,
        x: xPercent,
        y: yPercent,
        size: sizeValue, // Store the raw size value
        isFound: foundDifferences.includes(index)
      };
    });
    
    setMarkers(markersData);
  }, [differences, foundDifferences]);

  // Update markers when relevant state changes
  useEffect(() => {
    if (isRightImage && differences.length > 0 && imageLoaded) {
      // console.log('Updating markers for differences:', differences.length);
      // console.log('Developer mode:', isDeveloperMode);
      prepareMarkers();
    }
  }, [differences, isDeveloperMode, foundDifferences, isRightImage, imageLoaded, prepareMarkers]);
  
  // Handle marker click
  const handleMarkerClick = (index, e) => {
    e.stopPropagation();
    // console.log(`Marker ${index} clicked`);
    handleDifferenceFound(index);
  };

  // Handle clicks on the image (for wrong clicks)
  const handleImageClick = (e) => {
    if (!gameStarted || !isRightImage) return;
    
    // Only count as wrong click if clicked directly on the image, not on a marker
    if (e.target === imageRef.current) {
      handleWrongClick();
    }
  };

  // Add CSS styles to ensure proper display in developer mode
  const wrapperStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    filter: isRightImage && !gameStarted && !isDeveloperMode ? 'blur(5px)' : 'none',
    opacity: 1
  };

  // Marker styles based on state
  const getMarkerStyle = (marker) => {
    const isFound = foundDifferences.includes(marker.id);
    
    // Use the raw size value from the JSON directly
    // This ensures different markers have different sizes as specified in the JSON
    const sizeInVmin = marker.size; // This is already a number from the JSON
    
    // console.log(`Applying style for marker ${marker.id} with size ${sizeInVmin}vmin`);
    
    const baseStyle = {
      position: 'absolute',
      left: `${marker.x}%`,
      top: `${marker.y}%`,
      // Apply the size directly in vmin units for consistent sizing
      width: `${sizeInVmin}vmin`,
      height: `${sizeInVmin}vmin`,
      // Additional properties to maintain perfect squares/circles
      aspectRatio: '1 / 1',
      borderRadius: '100%',
      transform: 'translate(-50%, -50%)',
      pointerEvents: gameStarted ? 'auto' : 'none',
      cursor: 'pointer',
      zIndex: 100,
      boxSizing: 'border-box',
    };
    
    if (isDeveloperMode) {
      return {
        ...baseStyle,
        backgroundColor: isFound ? 'rgba(0, 255, 0, 0.7)' : 'rgba(255, 0, 0, 0.7)',
        border: isFound ? '0.3vw solid lime' : '0.3vw solid red',
        boxShadow: '0 0 1vw rgba(255, 0, 0, 1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 1,
        visibility: 'visible'
      };
    } else {
      return {
        ...baseStyle,
        backgroundColor: isFound ? 'rgba(0, 255, 0, 0.5)' : 'transparent',
        border: isFound ? '2px solid green' : 'none',
        boxShadow: isFound ? '0 0 5px rgba(0, 255, 0, 0.7)' : 'none'
      };
    }
  };

  return (
    <div 
      ref={wrapperRef}
      className="image-wrapper"
      onClick={handleImageClick}
      style={wrapperStyle}
    >
      <img 
        ref={imageRef}
        src={imageSrc} 
        alt="Spot the difference" 
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'contain',
          opacity: isRightImage && !gameStarted && !isDeveloperMode ? '0.7' : '1'
        }}
        onLoad={handleImageLoad}
      />
      
      {/* Render markers using React */}
      {isRightImage && imageLoaded && markers.map(marker => {
        // Determine the class based on state
        const markerClass = isDeveloperMode
          ? `difference dev-marker ${foundDifferences.includes(marker.id) ? 'found' : ''}`
          : `difference ${foundDifferences.includes(marker.id) ? 'found' : ''}`;
          
        return (
          <div
            key={`marker-${marker.id}`}
            className={markerClass}
            style={getMarkerStyle(marker)}
            onClick={(e) => handleMarkerClick(marker.id, e)}
            data-size={`${marker.size}vmin`}
            data-marker-id={marker.id}
          >
            {isDeveloperMode && (
              <span style={{ color: 'white', fontSize: '1vw', fontWeight: 'bold' }}>
                {marker.id + 1}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ImageContainer;
