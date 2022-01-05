import {
  bindValue,
  sortNumericStrings,
  getSortedKeys,
  getValueFromScore,
} from './helpers';

describe('bindValue', () => {
  it('binds values correctly', () => {
    expect(bindValue(1.2, 0, 1)).toBe(1);
    expect(bindValue(0.9, 0, 1)).toBe(0.9);
    expect(bindValue(-1, 0, 1)).toBe(0);
  });
});

describe('sortNumericStrings', () => {
  it('sorts values correctly', () => {
    expect(
      sortNumericStrings(['3', '8', '-10', '23', '19', '-4', '-14', '27'])
    ).toStrictEqual(['-14', '-10', '-4', '3', '8', '19', '23', '27']);
    expect(sortNumericStrings(['-1', '-2', '-3'])).toStrictEqual([
      '-3',
      '-2',
      '-1',
    ]);
  });
});

describe('getSortedKeys', () => {
  it('sorts keys correctly', () => {
    expect(getSortedKeys({4: 'txt1', 8: 'txt2', 12: 'txt3'})).toStrictEqual([
      '4',
      '8',
      '12',
    ]);
  });
});

describe('getValueFromScore', () => {
  it('returns text correctly', () => {
    const dict = {4: 'txt1', 8: 'txt2', 12: 'txt3'};
    expect(getValueFromScore(dict, 7)).toBe('txt2');
    expect(getValueFromScore(dict, 9)).toBe('txt3');
    expect(getValueFromScore(dict, 11)).toBe('txt3');
    expect(getValueFromScore(dict, 0)).toBe('txt1');
  });
});
