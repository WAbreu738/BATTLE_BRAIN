# Project 3 - Brain Battle (Trivia)

![License](https://img.shields.io/badge/License-MIT-brightgreen)

## Description

Get ready for a battle of the brains! This trivia web application allows you and a friend to compete in various trivia categories and see who comes out on top. Answer correctly and quickly and your opponent will lose health. Last one standing wins! In addition there is a single player mode to challenge the leaderboard and answer the most questions in a row.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [Deployment](#deployment)
- [Contributers](#credits)
- [License](#license)

## Installation

N/A

## Screenshot

<image src="https://i.imgur.com/Vv9YQPT.png">
<image src="https://i.imgur.com/egtmW3i.png">

## Usage

After logging in to the website, the user has the option to select their avatar and choose between a singleplayer or multiplayer mode. When playing multiplayer, the player will be given the option to create their own lobby or join an existing lobby with a room code. From the lobby menu, the player can select a trivia category and a difficulty before starting the match. Once the match starts, the player will be presented with a trivia question fitting their selected options.

If playing multiplayer, the other player is presented with the same question in the same match. If one player gets the answer correct and the other doesn't, then the incorrect player will take damage based off how fast the correct player answered. If both players answer correctly, then whichever player answered first deals damage to their opponent. When one player reaches 0 health, the match ends and the surviving player is declared the winner.

If playing singleplayer, the player will gain points based on how quickly they correctly answer the question. The match will continue on until the player gets three question incorrects, at which point their current score will be logged. Their high score will then be saved on the applications database.

## Credits

Technology Used

- React
- MongoDB
- Mongoose
- GraphQL
- Apollo
- The Trivia API
- Tailwind CSS

Support

- JD Tadlock

## Deployment

- Battle Brain Deployment - [Repo](https://nameless-inlet-80123-f3bf2fedf73b.herokuapp.com/singleplayer)
- Battle Brain - [Repo](https://github.com/WAbreu738/trivia_battle)

## Contributers

- [Trevor Irwin](https://github.com/TIrwin19)
- [Muhsin Tarik Orgerim](https://github.com/tarikorg)
- [Wesley Abreu](https://github.com/WAbreu738)
- [Thomas Stranick](https://github.com/ThStranick15)
- [Alice Ayres](https://github.com/Neppit)

## License

Please refer to the MIT LICENSE in the repo
