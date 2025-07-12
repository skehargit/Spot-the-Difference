import { useState } from 'react';

/**
 * Custom hook for managing form state in the admin interface
 * 
 * @param {Object} initialState - Initial form state values
 * @returns {Object} - Form state and setters
 */
export const useFormState = (initialState = {
  title: '',
  leftImage: '',
  rightImage: ''
}) => {
  const [title, setTitle] = useState(initialState.title);
  const [leftImage, setLeftImage] = useState(initialState.leftImage);
  const [rightImage, setRightImage] = useState(initialState.rightImage);

  return {
    title,
    setTitle,
    leftImage,
    setLeftImage,
    rightImage,
    setRightImage,
    
    // Helper function to get all form values as an object
    getFormValues: () => ({
      title,
      leftImage,
      rightImage
    }),
    
    // Helper function to reset form to initial values
    resetForm: () => {
      setTitle(initialState.title);
      setLeftImage(initialState.leftImage);
      setRightImage(initialState.rightImage);
    }
  };
};
