# Spot the Difference Game

A React-based spot-the-difference game where users can select from multiple puzzles and test their observation skills. The live version is available at [https://spot-the-difference-omega.vercel.app/games](https://spot-the-difference-omega.vercel.app/games).

## Features

- Multiple game selection from a catalog
- Different difficulty levels
- Interactive gameplay with visual feedback
- Responsive design for various screen sizes

## Installation

To set up the project locally, follow these steps:

```bash
# Clone the repository (if you haven't already)
git clone <repository-url>
cd spot-the-difference

# Install dependencies
npm install

# or if you use yarn
yarn install
```

## Running the Development Server

To start the development server:

```bash
# Start the development server
npm run dev

# or with yarn
yarn dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is already in use).


## Adding or Editing Games

Since there is no backend, games are managed through the `game_catalog.json` file. To add or edit games:

1. Open the project in VSCode or your preferred editor
2. Navigate to the `game_catalog.json` file
3. Add a new game entry or edit an existing one following this structure:

```json
{
  "games": [
    {
      "id": "unique-game-id",
      "title": "Game Title",
      "description": "Brief description of the game",
      "thumbnail": "path/to/thumbnail.jpg",
      "difficulty": "easy|medium|hard",
      "configPath": "path/to/game-config.json"
    }
  ]
}
```

4. Add the necessary image assets to the `public/assets/images/` directory
5. Create or update the game configuration file as specified in `configPath`

## Game Configuration

Each game requires a configuration file that defines the differences between images. The format is:

```json
{
  "leftImage": "path/to/original.jpg",
  "rightImage": "path/to/modified.jpg",
  "differences": [
    {
      "x": "100%",
      "y": "150%",
      "size": 20
    },
    // More difference points...
  ]
}
```

## Deployment

The application is currently deployed on Vercel. Users can access and play the games at:
[https://spot-the-difference-omega.vercel.app/games](https://spot-the-difference-omega.vercel.app/games)

## Contributing

Contributions are welcome! Feel free to submit pull requests or open issues for any bugs or feature requests.
