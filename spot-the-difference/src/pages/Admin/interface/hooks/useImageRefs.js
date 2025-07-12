import { useRef } from 'react';

/**
 * Custom hook for managing image references in the admin interface
 * 
 * @returns {Object} - Image references
 */
export const useImageRefs = () => {
  const leftImageRef = useRef(null);
  const rightImageRef = useRef(null);

  return {
    leftImageRef,
    rightImageRef
  };
};
