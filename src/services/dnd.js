import { delimiter, wrongAttemptThreshold } from '../enums/constants';
import { NotificationEnum } from '../enums/NotificationEnum';
import { GameStatus } from '../enums/GameStatus';

export const dnd = {
  /**
   * check if letter draggable to make correct word
   * @param { droppedLetters }
   * @param { dragIndex }
   */
  isDraggable: (droppedLetters, dragIndex) => {
    for (let i = 0; i < droppedLetters.length; i++) {
      if (droppedLetters[i].from === dragIndex) { return false; }
    }
    return true;
  },

  /**
   * is letter droppable such that it build correct word
   * @param { droppedLetters }
   * @param { dropIndex }
   */
  isDroppable: (droppedLetters, dropIndex) => {
    for (let i = 0; i < droppedLetters.length; i++) {
      //drop if 
      if (droppedLetters[i].to === dropIndex) { return false; }
    }
    return true;
  },

  /**
   * derive word from dropped letters
   * @param { droppedLetters }
   * @param { delimiter }
   */
  getDroppedLettersWord: (droppedLetters, delimiter) => {
    return droppedLetters.reduce((word, letter) =>  word += (letter.name === delimiter ? '' : letter.name), '');
  },

   /**
   * returns dropped letterConfig
   * @param { lastDraggedItem } last dragged item
   * @param { droppedLetters } dropped letters
   * @param { to } to dropped on
   * @param { wrongAttempt } number of wrong  Attempts
   * @param { callbacks } collection of callbacks
   * @param { validWord } valid word
   * returns { droppedLetters, notification, isWrongAttempt, isWordCorrect, gongSound }
   */
  getDroppedLettersConfig: (lastDraggedItem, droppedLetters, to, validWord, wrongAttempt, callbacks) => {
    let isCorrect = true, notification = '', isWordCorrect = false, gongSound = false;

    if (!lastDraggedItem.name) { return { droppedLetters }; }
    
    //logic for wrong attempts
    if (validWord[to] !== lastDraggedItem.name) {
      wrongAttempt++;
      isCorrect = false;
      if (wrongAttempt < wrongAttemptThreshold) {
        return { droppedLetters, notification: NotificationEnum.INCORRECT_INSERTION, wrongAttempt };
      }
    }

    const currentDroppedLetter = { name: lastDraggedItem.name, from: lastDraggedItem.position, to, isCorrect };
    if (!isNaN(currentDroppedLetter.to)) {
      droppedLetters[currentDroppedLetter.to] = currentDroppedLetter;
    }

    //add third wrong letter to dropped collection to show in the UI with incorrect insertion
    if (wrongAttempt === wrongAttemptThreshold) {
      callbacks.stopGame(GameStatus.FAIL);
      isWordCorrect = false;
      gongSound = true;
      return { droppedLetters: droppedLetters, notification: NotificationEnum.INCORRECT_THRESHOLD, isWordCorrect, gongSound, wrongAttempt };
    }

    //logic for correct word completion
    const word = dnd.getDroppedLettersWord(droppedLetters, delimiter);
    if (word.length === validWord.length && word === validWord) {
      callbacks.updateScore();
      callbacks.stopGame(GameStatus.PASS);
      notification = NotificationEnum.SUCCESS;
      isWordCorrect = true;
    }

    return { droppedLetters: droppedLetters, notification: notification, isWordCorrect };
  }
}