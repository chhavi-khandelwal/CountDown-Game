import { dictionary } from '../dataStorage/dictionary';

export const wordService = {
  wordCollection: dictionary,

  //get unique random word from dictionary
  getValidWord: function(dict) {
    const dictionaryData = dict || dictionary;
    const randomIndex = this.getRandomNumber(0, dictionaryData.length);
    return this.wordCollection.splice(randomIndex, 1)[0].toUpperCase();
  },

  getRandomNumber: function(min, max) {
    return Math.floor(Math.random() * (+max - +min)) + +min; 
  },

  //create a collection of jumbled letters from valid word
  getJumbledWord: function(validWord, length) {
    const extraCharactersNeeded = length - validWord.length;
    let jumbledCollection = [];
    let i = 0;
    while(i < extraCharactersNeeded) {
      const charCode = this.getRandomNumber(65, 91);
      jumbledCollection.push(String.fromCharCode(charCode));
      i ++;
    }
    jumbledCollection = jumbledCollection.concat(validWord.split(''));
    i = 0;
    while(i < length) {
      const rand = this.getRandomNumber(0, length);
      jumbledCollection = this.swapJumbledCollection(jumbledCollection, i, rand);
      i ++;
    }

    return jumbledCollection.join('').toUpperCase();
  },

  swapJumbledCollection: function(arr, index1, index2) {
    const temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
    return arr;
  }
};
