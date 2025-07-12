# Spot the Difference Game

A responsive web-based game where players find differences between two similar images.

## About the Game

This is a classic "Spot the Difference" game built with HTML, CSS, and JavaScript. The game shows two similar images side by side, and players need to find all the differences between them.

## Features

- Responsive design that works on desktop and mobile devices
- Timer to track how long it takes to find all differences
- Counter showing how many differences have been found
- Misses indicator to track incorrect attempts
- Sound effects for clicks, correct finds, and wrong attempts
- Victory message when all differences are found

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript (no frameworks)
- JSON for game configuration

## How to Play

1. Open the game in your browser using Live Server in VS Code
2. Click the "Start Game" button to begin
3. Find differences by clicking on the right image
4. The game ends when all differences are found

## Running the Game Locally

### Using Visual Studio Code:

1. Install Visual Studio Code if you don't have it already
2. Install the "Live Server" extension:
   - Click on the Extensions icon in the sidebar
   - Search for "Live Server"
   - Click "Install" on the extension by Ritwick Dey
3. Open the project folder in VS Code
4. Right-click on `index.html` and select "Open with Live Server"
5. The game will open in your default web browser

### Using any web server:

You can also use any web server to host the game files. Simply serve the directory containing the game files and access it through your browser.

## Game Structure

- `index.html` - Main HTML file
- `style.css` - CSS styling
- `js/` - JavaScript files:
  - `app.js` - Main application file
  - `audio.js` - Handles sound effects
  - `differences.js` - Manages difference detection and marking
  - `timer.js` - Handles game timer
  - `coordinates.js` - Manages coordinate system
  - `config.js` - Configuration settings
- `data/` - JSON configuration files:
  - `reading_book.json` - Contains difference coordinates
- `assets/` - Sound effects and images

## Adding New Image Sets

To add new image sets:

1. Add your image pairs to the `assets` folder
2. Create a new JSON file in the `data` folder with the difference coordinates
3. Update the `configPath` in `app.js` to point to your new JSON file

## Developer Mode

The game includes a hidden developer mode that can be enabled by uncommenting the mode toggle buttons in the HTML. This mode helps with:

- Showing all difference markers visibly
- Logging coordinates when clicking on images
- Testing and configuring new image sets

## Credits

Created by Sudhansu Sekhar Behera
