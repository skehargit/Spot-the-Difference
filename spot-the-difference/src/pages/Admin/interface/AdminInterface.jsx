import React from "react";
import "./AdminInterface.css";
import StepOne from "./components/StepOne";
import StepTwo from "./components/StepTwo";
import Header from "./components/Header";
import { useImageClick } from "./hooks/useImageClick";
import { useFormSteps } from "./hooks/useFormSteps";
import { useSaveGame } from "./hooks/useSaveGame";
import { useImageRefs } from "./hooks/useImageRefs";
import { useFormState } from "./hooks/useFormState";
const AdminInterface = () => {

  // Use custom hook for form state
  const {
    title,
    setTitle,
    leftImage,
    setLeftImage,
    rightImage,
    setRightImage,
    getFormValues
  } = useFormState();

  // Use custom hooks for form steps and validation
  const {
    formStep,
    formErrors,
    setFormErrors,
    handleNextStep,
    handlePreviousStep
  } = useFormSteps();

  // Use custom hook for handling image clicks and differences
  const {
    currentDifference,
    setCurrentDifference,
    differences,
    setDifferences,
    addDifference,
    removeDifference
  } = useImageClick();

  // Use custom hook for image references
  const { leftImageRef, rightImageRef } = useImageRefs();

  // We're now using the useFormSteps hook for form validation and navigation

  // Use the save game hook
  const { saveGame } = useSaveGame();

  const handleRightImageClick = (e) => {
    if (!rightImageRef.current) return;
    
    // Use the handleImageClick from our custom hook by passing the event and ref
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setCurrentDifference({
      ...currentDifference,
      x: `${x.toFixed(2)}%`,
      y: `${y.toFixed(2)}%`,
    });
  };
  
  // Function to handle saving the game with the current form data
  const handleSaveGame = () => {
    const formValues = getFormValues();
    const gameData = {
      ...formValues,
      differences,
    };
    
    saveGame(gameData);
  };

  return (
    <div className="admin-interface">
      <Header />
      {formStep === 1 ? (
        <StepOne
          formErrors={formErrors}
          handleNextStep={() => handleNextStep(getFormValues())}
          setLeftImage={setLeftImage}
          setRightImage={setRightImage}
          setTitle={setTitle}
          title={title}
          leftImage={leftImage}
          rightImage={rightImage}
          setFormErrors={setFormErrors}
        />
      ) : (
        <StepTwo
          title={title}
          leftImageRef={leftImageRef}
          leftImage={leftImage}
          rightImage={rightImage}
          rightImageRef={rightImageRef}
          handleRightImageClick={handleRightImageClick}
          currentDifference={currentDifference}
          differences={differences}
          setCurrentDifference={setCurrentDifference}
          addDifference={addDifference}
          removeDifference={removeDifference}
          saveGame={handleSaveGame}
          handlePreviousStep={handlePreviousStep}
        />
      )}
    </div>
  );
};

export default AdminInterface;
