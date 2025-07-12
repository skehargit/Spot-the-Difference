# Spot the Difference Game

A fun and interactive game where players identify differences between two similar images. Test your observation skills across multiple puzzles with varying difficulty levels.

## Live Demo

Play the game online at: [https://spot-the-difference-omega.vercel.app/games](https://spot-the-difference-omega.vercel.app/games)

## Project Overview

This repository contains two implementations of the Spot the Difference game:

1. **Vanilla JavaScript Version** - A simple implementation using plain HTML, CSS, and JavaScript
   - For setup and usage instructions, see the README in the `plain` directory

2. **React Version** - A more feature-rich implementation built with React and modern web technologies
   - For setup and usage instructions, see the README in the `spot-the-difference` directory

## Game Features

- Multiple puzzles with different difficulty levels
- Interactive gameplay with visual feedback
- Game catalog system for selecting different puzzles
- Responsive design for various screen sizes

## Game Configuration

Both versions use JSON configuration files to define games. Each game requires:

- Two images (left and right versions)
- Coordinates of the differences
- Metadata like title, description, and difficulty

In the React version, games are managed through the `game_catalog.json` file, which contains metadata about each game including title, description, thumbnail image, difficulty level, and the path to the game's configuration file.

No backend is required - all game data is managed through JSON files and assets stored locally.