import {deepClone} from './helpers';
import {BG_13a} from './images';

describe('deepClone', () => {
  it('returns a copy of the original data', () => {
    const originalData = {
      a: 1,
      b: {c: 2},
      d: function () {
        return NaN;
      },
    };
    const clonedData = deepClone(originalData);
    originalData.a = 2;
    originalData.b.c = 0;
    originalData.d = null;

    expect(clonedData.a).toBe(1);
    expect(clonedData.b.c).toBe(2);
    expect(clonedData.d()).toBe(NaN);
  });

  it('clones an image correctly', () => {
    const originalData = {image: BG_13a};
    const clonedData = deepClone(originalData);
    expect(clonedData.image).toBeTruthy();
  });
});
