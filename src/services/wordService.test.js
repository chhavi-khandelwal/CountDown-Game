import { wordService } from './wordService';

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
