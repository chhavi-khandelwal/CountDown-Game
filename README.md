## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Features:
1. Derive a word from a jumbled collection of 9 letters.
2. A sound button to toggle the sound effects while playing. Sound effects:
  - When one fails
  - When one wins
  - Clock ticking sound
3. It is desktop compatible

Hierarchy of components/containers

          App
           |
           Dashboard
              |
              Game
                |
                GameBoard
                    |
                  Audio | Notification | PickListContainer | ParcelListContainer | Clock | Result
                                                |                  |
                                            PickList             ParcelList
                                              |                     |
                                              |________Card_________|

## Architecture:
Assets : This contains images and audio files to be played for the game
Components: All the folders of react components used in the game
Each folder contains a jsx file for rendering and a scss file for styling + test files for testing the functionality of the game.
Containers: Drag and Drop Logic to be moved inside them
Services: this contains service files like WordService which creates and manages the words picked for a frame in the Game.
styles: contains all the common scss files which defines mixins, variables, etc to be used by the components scss files.

DataStorage: contains dictionary which contains collection of words to be served to Wordservice

## Special Mention:
 - Clock is made in pure HTML/CSS
 - Additional Feature of Score is added
 - Sound on wrong attempt, clock ticking and cheer on correct attempt added
 - Added unit tests for WordService, Clock Component
 - Game deployed on herokuapp - 

## Improvements:
- Logic for onDrag/onDrop to be moved to Pick and Parcel Containers
- Add end to end tests
- Dictionary can have image based hints key associated with a word dictionary = [{word: 'bat', hints: []}, ...]
- To add support for mobile by adding touch events
- Save game state in localstorage for persistence
- Typescript missing

## Assumptions
- Only one word can be created from the collection of letters

## third-party libraries
  node-sass - to write scss based css
  react-dnd | react-dnd-html5-backend - drag and drop lib
  react-sound - add sounds in game
