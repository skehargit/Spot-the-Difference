import React from "react";
import FormActions from "./FormActions";

const StepOne = ({
  formErrors,
  handleNextStep,
  setLeftImage,
  setRightImage,
  setTitle,
  title,
  leftImage,
  rightImage,
  setFormErrors,
}) => {
  // The validation is now handled by the useFormSteps hook in the parent component
  return (
    <div className="dev-form-container">
      <div className="form-step">
        <div className="form-step-header">
          <div className="step-number">1</div>
          <div className="form-step-title">Basic Information</div>
        </div>

        <div className="form-step-content">
          <div className="form-group">
            <label className="required-field">Game Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter game title"
              className={formErrors.title ? "error" : ""}
            />
            {formErrors.title && (
              <div className="error-message">{formErrors.title}</div>
            )}
          </div>

          <div className="form-group">
            <label className="required-field">Left Image:</label>
            <input
              type="text"
              value={leftImage}
              onChange={(e) => setLeftImage(e.target.value)}
              placeholder="e.g., reading_book_1.jpg"
              className={formErrors.leftImage ? "error" : ""}
            />
            {formErrors.leftImage && (
              <div className="error-message">{formErrors.leftImage}</div>
            )}
          </div>

          <div className="form-group">
            <label className="required-field">Right Image:</label>
            <input
              type="text"
              value={rightImage}
              onChange={(e) => setRightImage(e.target.value)}
              placeholder="e.g., reading_book_2.jpg"
              className={formErrors.rightImage ? "error" : ""}
            />
            {formErrors.rightImage && (
              <div className="error-message">{formErrors.rightImage}</div>
            )}
          </div>

          <FormActions
            onSave={handleNextStep}
            saveLabel="Next: Preview"
            disableSave={!title || !leftImage || !rightImage}
            onPrevious={null}
          />
        </div>
      </div>
    </div>
  );
};

export default StepOne;
