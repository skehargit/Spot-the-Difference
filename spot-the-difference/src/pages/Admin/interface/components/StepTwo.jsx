import React from "react";
import ImagePreview from "./ImagePreview";
import DifferenceControls from "./DifferenceControls";
import DifferencesList from "./DifferencesList";
import FormActions from "./FormActions";

const StepTwo = ({
  title,
  leftImageRef,
  leftImage,
  rightImage,
  rightImageRef,
  handleRightImageClick,
  currentDifference,
  differences,
  setCurrentDifference,
  addDifference,
  removeDifference,
  saveGame,
  handlePreviousStep,
}) => {
  return (
    <div className="dev-form-container">
      <div className="form-step">
        <div className="form-step-header">
          <div className="form-step-title">Image Preview & Differences</div>
        </div>

        <div className="form-step-content">
          <div className="preview-container">
            <ImagePreview
              leftImage={leftImage}
              rightImage={rightImage}
              leftImageRef={leftImageRef}
              rightImageRef={rightImageRef}
              handleRightImageClick={handleRightImageClick}
              differences={differences}
              currentDifference={currentDifference}
            />

            <DifferenceControls
              currentDifference={currentDifference}
              setCurrentDifference={setCurrentDifference}
              addDifference={addDifference}
            />

            <DifferencesList
              differences={differences}
              removeDifference={removeDifference}
            />

            <FormActions
              onPrevious={handlePreviousStep}
              onSave={saveGame}
              disableSave={
                !title ||
                !leftImage ||
                !rightImage ||
                differences.length === 0
              }
              previousLabel="Back to Basic Info"
              saveLabel="Save Game"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
