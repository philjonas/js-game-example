import {mutatePuzzle, checkPuzzle, wrapAroundAdder} from './puzzle.helpers';

describe('checkPuzzle', () => {
  it('finds equal arrays', () => {
    const attempt = [0, 0, 1, 0];
    const solution = [0, 0, 1, 0];
    expect(checkPuzzle(attempt, solution)).toBe(true);
  });

  it('finds different arrays', () => {
    const attempt = [0, 0, 1, 0];
    const solution = [0, 1, 1, 0];
    expect(checkPuzzle(attempt, solution)).toBe(false);
  });
});

describe('wrapAroundAdder', () => {
  it('returns correct value under max', () => {
    expect(wrapAroundAdder(0, 1, 3)).toBe(1);
  });

  it('returns correct value over max', () => {
    expect(wrapAroundAdder(0, 5, 3)).toBe(2);
  });

  it('returns correct value over max even if prevVal is wrong', () => {
    expect(wrapAroundAdder(3, 4, 3)).toBe(1);
  });
});

describe('mutatePuzzle', () => {
  it('matches outcome', () => {
    const attempt = mutatePuzzle(0, [1, 0, 0, 0], 2);
    const outcome = [0, 0, 0, 0];
    expect(checkPuzzle(attempt, outcome)).toBe(true);
  });

  it('matches outcome 2', () => {
    const attempt = mutatePuzzle(1, [1, 0, 0, 0], 2);
    const outcome = [1, 1, 0, 0];
    expect(checkPuzzle(attempt, outcome)).toBe(true);
  });
});
