import React from 'react';

/**
 * Component for form navigation and action buttons
 */
const FormActions = ({ 
  onPrevious, 
  onSave, 
  disableSave = false,
  previousLabel = "Back",
  saveLabel = "Save"
}) => {
  return (
    <div className="form-actions">
      {onPrevious && (
        <button
          className="btn btn-secondary"
          onClick={onPrevious}
        >
          {previousLabel}
        </button>
      )}

      <button
        className={onPrevious ? "btn btn-success" : "btn btn-primary"}
        onClick={onSave}
        disabled={disableSave}
      >
        {saveLabel}
      </button>
    </div>
  );
};

export default FormActions;
