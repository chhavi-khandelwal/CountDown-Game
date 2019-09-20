## Description
​Countdown​ game build in ReactJs.
One can create the word from given collection of words by drag and drop.

## Demo Link
[https://countdownalph.herokuapp.com/](https://countdownalph.herokuapp.com/)

## Setup
 - `npm install`
To install dependencies

 - `npm start`
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

 - `npm test`
To run tests

## How to play:
1. Click on start button.
2. Start creating word from jumbled letters.
3. Word to be created is of length < jumbled letters, has to be dropped in the empty containers by dragging from filled containers.
4. Each correct word adds up to score.
5. A sound button to toggle the sound effects while playing. Sound effects:
  - When one fails
  - When one wins
  - Clock ticking sound
6. Click on Next/Try Again button for next query.

## Directory Structure of components/containers
          App
           |
           Dashboard
              |
              Game
                |
                GameBoard
                    |
                  Audio | Notification | PickListContainer | ParcelListContainer | Clock | Result
                                              |                     |
                                            PickList             ParcelList
                                              |                     |
                                              |________Card_________|

## Architecture:
- Assets : This contains images and audio files to be played for the game
- Components: All the folders of react components used in the game
Each folder contains a jsx file for rendering and a scss file for styling + test files for testing the functionality of the game.
- Containers: Drag and Drop Logic to be moved inside them
- Services: this contains service files like WordService which creates and manages the words picked for a frame in the Game.
- styles: contains all the common scss files which defines mixins, variables, etc to be used by the components scss files.
- DataStorage: contains dictionary which contains collection of words to be served to Wordservice

## Special Mention:
 - Clock is made in pure HTML/CSS
 - Additional Feature of Score is added
 - Sound on wrong attempt, clock ticking and cheer on correct attempt added ( turn on the system volume :) )
 - Covered tests for main business logic : WordService, Clock Component, dnd service(drag and drop)
 - Game deployed on herokuapp - [https://countdownalph.herokuapp.com/](https://countdownalph.herokuapp.com/)

## Improvements:
- Logic for onDrag/onDrop to be moved to Pick and Parcel Containers
- Add end to end tests/ unit for left components

- To add support for mobile by adding touch events
- Save game state in localstorage for persistence
- Typescript missing
- image pre-caching
- Use of store(redux based system)

## Future feature additions
- Dictionary can have image based hints key associated with a word dictionary = [{jumbledword:word: ['bat'], hints: []}, ...]
- can have bonus points on difficult words(based on length)

## Assumptions
- Only one word can be created from the collection of letters
- Desktop compatible

## third-party libraries
- node-sass: to write scss based css
- react-dnd | react-dnd-html5-backend: drag and drop lib
- react-sound: add sounds in game
