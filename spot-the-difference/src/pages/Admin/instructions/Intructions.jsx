import React from "react";
import { Link } from "react-router-dom";
import "./Instructions.css";

const Intructions = () => {
  return (
    <div className="instructions-container">
      <div className="instructions-header">
        <h1>Instructions</h1>
        <Link to="/admin" className="back-link">
          Back to Admin
        </Link>
      </div>
      
      <div className="instructions-content">
        <h2>Create a New Spot the Difference Game</h2>
        <p>Follow these steps to set up your custom game:</p>

        <ol>
          <li>
            First, add <strong>two identical images</strong> in the{" "}
            <code>/public/assets/</code> folder.
          </li>
          <li>
            Enter the exact <strong>file names</strong> of these images in the
            input fields provided on the admin page.
          </li>
          <li>
            Add a descriptive <strong>title</strong> for your game.
          </li>
          <li>
            Click <strong>Next</strong> to preview the images.
            <div className="warning">
              ⚠️ If the preview does not appear, it means:
              <ul>
                <li>
                  The image files are not inside <code>/public/assets/</code>
                </li>
                <li>You've entered incorrect file names in the form</li>
              </ul>
            </div>
          </li>
          <li>
            On the image preview screen:
            <ul>
              <li>
                Click on the spots where the differences are — the positions will
                show up in the current position display
              </li>
              <li>
                Click <strong>Add Difference</strong> to mark each difference
              </li>
              <li>You can add multiple positions this way</li>
              <li>
                Adjust the circle size using the size input to resize the
                clickable area
              </li>
            </ul>
          </li>
          <li>
            Once done, click <strong>Save Game</strong> — a <code>.json</code> file
            will be downloaded automatically.
          </li>
          <li>
            Move the downloaded JSON file into your <code>/public/data/</code>{" "}
            folder.
          </li>
          <li>
            Open <code>game_catalog.json</code> and:
            <ul>
              <li>
                Add an entry for your new game with the correct path to the new
                JSON file
              </li>
              <li>
                Include the game title and image references, just like the other
                games listed
              </li>
            </ul>
          </li>
          <li>Done! You'll now see your new game appear in the game list 🎉</li>
        </ol>
      </div>
    </div>
  );
};

export default Intructions;
