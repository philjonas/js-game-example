import {calculateFontSize} from '.';
import {getActualSquare, setHeight} from './helpers';

describe('getActualSquare', () => {
  it('returns a square', () => {
    const width = 1280;
    const squareData = getActualSquare(
      {x: 0, y: 0, width: 0.1, height: 0.1},
      {width, height: setHeight(width)}
    );
    expect(squareData.height).toBe(squareData.width);
  });
});

describe('calculateFontSize', () => {
  it('returns correct font size', () => {
    expect(calculateFontSize('start', {width: 0.8}, {width: 800})).toBe(12.8);
    expect(calculateFontSize('New Game', {width: 0.8}, {width: 800})).toBe(8);
  });
});
