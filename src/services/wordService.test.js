import { wordService } from './wordService';

describe('Word Service: ', () => {
  describe('getJumbledWord ', () => {
    it('returns jumbled words of correct length', () => {
      const jumbledWord = wordService.getJumbledWord('test', 7);

      expect(jumbledWord).not.toBe('test');
      expect(jumbledWord.length).toBe(7);
    });

    it('returns jumbled words of correct length', () => {
      const jumbledWord = wordService.getJumbledWord('test', 7);

      expect(jumbledWord).not.toBe('test');
      expect(jumbledWord.length).toBe(7);
      expect(jumbledWord).toContain('T');
      expect(jumbledWord).toContain('E');
      expect(jumbledWord).toContain('S');
      expect(jumbledWord).toContain('T');
    });
  });

  describe('getValidWord ', () => {
    it('returns unique word from dictionary everytime getValidWord is called with a given dictionary as param', () => {
      const word1 = wordService.getValidWord(['test', 'man', 'women'], 7);
      const word2 = wordService.getValidWord(['test', 'man', 'women'], 7);
      const word3 = wordService.getValidWord(['test', 'man', 'women'], 7);

      expect(word1).not.toBe(word2);
      expect(word2).not.toBe(word3);
      expect(word3).not.toBe(word1);
    });
  });
});
