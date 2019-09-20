import { dnd } from './dnd';
import { NotificationEnum } from '../enums/NotificationEnum';

let validWord, callbacks;
beforeEach(() => {
  validWord = 'test';
  callbacks = {
    stopGame: jest.fn(),
    updateScore: jest.fn()
  };
});

describe('dnd service: ', () => {
  describe('getDroppedLettersConfig', () => {
    it('builds correct word if correct letter is dropped', () => {
      const lastDraggedItem = { name: 'e', position: 1 },
        to = 1;
      let droppedLetters = [{name: 't'}, {name: '_'}, {name: 's'}, {name: 't'}], wrongAttempt = 1;
      const config = dnd.getDroppedLettersConfig(lastDraggedItem, droppedLetters, to, validWord, wrongAttempt, callbacks)
      const word = dnd.getDroppedLettersWord(config.droppedLetters, '_');
      expect(word).toBe('test');
      expect(callbacks.updateScore.mock.calls.length).toBe(1);
    });
    
    it('notifies failure on 3 wrong attempts', () => {
      let droppedLetters = [{name: '_'}, {name: '_'}, {name: '_'}, {name: '_'}], wrongAttempt = 0;
    
      let config = dnd.getDroppedLettersConfig({ name: 'e', position: 0 }, droppedLetters, 0, validWord, wrongAttempt, callbacks);
      config = dnd.getDroppedLettersConfig({ name: 't', position: 1 }, droppedLetters, 1, validWord, config.wrongAttempt, callbacks);
      config = dnd.getDroppedLettersConfig({ name: 't', position: 2 }, droppedLetters, 2, validWord, config.wrongAttempt, callbacks);
      expect(config.wrongAttempt).toBe(3);
      expect(config.notification).toBe(NotificationEnum.INCORRECT_THRESHOLD);
      expect(callbacks.stopGame.mock.calls.length).toBe(1);
    });
    
    it('notifies on 1 wrong attempt', () => {
      let droppedLetters = [{name: '_'}, {name: '_'}, {name: '_'}, {name: '_'}], wrongAttempt = 0;
    
      let config = dnd.getDroppedLettersConfig({ name: 'e', position: 0 }, droppedLetters, 0, validWord, wrongAttempt, callbacks);
      expect(config.wrongAttempt).toBe(1);
      expect(config.notification).toBe(NotificationEnum.INCORRECT_INSERTION);
      expect(callbacks.stopGame.mock.calls.length).toBe(0);
    });

    it('returns same dropped letters given as input when name is not mentioned', () => {
      let droppedLetters = [{name: '_'}, {name: '_'}, {name: '_'}, {name: '_'}], wrongAttempt = 0;
    
      let config = dnd.getDroppedLettersConfig({ name: '_', position: 0 }, droppedLetters, 0, validWord, wrongAttempt, callbacks);
      expect(config.droppedLetters).toBe(droppedLetters);
    });
  });
});
