import { useState } from 'react';
import { validateGameForm, isFormValid } from '../utils/FormValidator';

/**
 * Custom hook for managing form steps and validation in the admin interface
 * 
 * @returns {Object} - Methods and state for handling form steps
 */
export const useFormSteps = () => {
  const [formStep, setFormStep] = useState(1); // 1: Basic Info, 2: Image Preview & Differences
  const [formErrors, setFormErrors] = useState({});

  /**
   * Validates the form data and returns if it's valid
   * @param {Object} formData - The form data to validate
   * @returns {boolean} - True if the form is valid
   */
  const validateForm = (formData) => {
    const errors = validateGameForm(formData);
    setFormErrors(errors);
    return isFormValid(errors);
  };

  /**
   * Moves to the next form step if validation passes
   * @param {Object} formData - The form data to validate
   */
  const handleNextStep = (formData) => {
    if (validateForm(formData)) {
      setFormStep(2);
    }
  };

  /**
   * Moves to the previous form step
   */
  const handlePreviousStep = () => {
    setFormStep(1);
  };

  return {
    formStep,
    formErrors,
    setFormErrors,
    validateForm,
    handleNextStep,
    handlePreviousStep
  };
};
