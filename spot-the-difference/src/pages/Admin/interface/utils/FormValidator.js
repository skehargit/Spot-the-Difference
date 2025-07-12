/**
 * Validates the game creation form
 * @param {Object} formData - The form data to validate
 * @returns {Object} - Object containing any validation errors
 */
export const validateGameForm = (formData) => {
  const { title, leftImage, rightImage } = formData;
  const errors = {};

  if (!title?.trim()) {
    errors.title = "Game title is required";
  }

  if (!leftImage?.trim()) {
    errors.leftImage = "Left image is required";
  }

  if (!rightImage?.trim()) {
    errors.rightImage = "Right image is required";
  }

  return errors;
};

/**
 * Checks if the form has any validation errors
 * @param {Object} errors - The errors object
 * @returns {boolean} - True if the form is valid, false otherwise
 */
export const isFormValid = (errors) => {
  return Object.keys(errors).length === 0;
};
