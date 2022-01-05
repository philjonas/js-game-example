import {drawSquareSprite, isColliding} from '../canvas';
import {
  puzzleTileDown,
  puzzleTileFast,
  puzzleTileHorizontal,
  puzzleTileMinus,
  puzzleTilePlus,
  puzzleTileSlow,
  puzzleTileUp,
  puzzleTileVertical,
} from '../data';
import {
  PUZZLE_FAST,
  PUZZLE_HORIZONTAL,
  PUZZLE_DOWN,
  PUZZLE_MINUS,
  PUZZLE_PLUS,
  PUZZLE_UP,
  PUZZLE_SLOW,
  PUZZLE_TYPE_DIRECTION,
  PUZZLE_TYPE_ORIENTATION,
  PUZZLE_TYPE_SIGNS,
  PUZZLE_TYPE_SPEED,
  PUZZLE_VERTICAL,
} from '../data/stagesPuzzle';
import {OFF_SCREEN} from './gradius.helpers';

/**
 * DO NOT EXPORT THIS!!!
 */
const puzzleImages = {
  [PUZZLE_TYPE_SIGNS]: {
    [PUZZLE_MINUS]: puzzleTileMinus,
    [PUZZLE_PLUS]: puzzleTilePlus,
  },
  [PUZZLE_TYPE_ORIENTATION]: {
    [PUZZLE_HORIZONTAL]: puzzleTileHorizontal,
    [PUZZLE_VERTICAL]: puzzleTileVertical,
  },
  [PUZZLE_TYPE_SPEED]: {
    [PUZZLE_FAST]: puzzleTileFast,
    [PUZZLE_SLOW]: puzzleTileSlow,
  },
  [PUZZLE_TYPE_DIRECTION]: {
    [PUZZLE_DOWN]: puzzleTileDown,
    [PUZZLE_UP]: puzzleTileUp,
  },
};

/**
 *
 * @param {number[]} playerAttempt
 * @param {number[]} solution
 * @returns {boolean}
 */
export function checkPuzzle(playerAttempt, solution) {
  if (playerAttempt.length !== solution.length) {
    return false;
  }
  let payload = true;
  playerAttempt.forEach((v, i) => {
    if (v !== solution[i]) {
      payload = false;
    }
  });
  return payload;
}

export function wrapAroundAdder(prevVal, newVal, max) {
  return (prevVal + newVal) % max;
}

/**
 *
 * @param {number} index
 * @param {number[]} puzzle
 * @param {number} maxValue
 * @returns {number[]}
 */
export function mutatePuzzle(index, puzzle, maxValue) {
  return puzzle.map((v, i) => {
    if (i === index) {
      return wrapAroundAdder(v, 1, maxValue);
    } else {
      return v;
    }
  });
}

export function handleBulletsPuzzle(context, index) {
  const {
    currentStageData: {bullets, puzzleTiles, maxValue, puzzle, solution},
  } = context;
  if (checkPuzzle(puzzle, solution)) {
    return;
  }
  if (bullets[index].x < 1) {
    for (let index2 = 0; index2 < puzzleTiles.length; index2++) {
      if (isColliding(bullets[index], puzzleTiles[index2])) {
        context.currentStageData.bullets[index].x = OFF_SCREEN;
        context.currentStageData.puzzle = mutatePuzzle(
          index2,
          puzzle,
          maxValue
        );
      }
    }
  }
}

function getPuzzleTileImage(type, value) {
  return puzzleImages[type][value];
}

export function drawPuzzleTiles(context) {
  const {
    currentStageData: {puzzle, puzzleTiles, puzzleType},
  } = context;
  puzzleTiles.forEach((v, i) => {
    drawSquareSprite(context.ctx, v, getPuzzleTileImage(puzzleType, puzzle[i]));
  });
}

export const isTimedCheck = (previousTimeInSeconds, timeInSeconds) =>
  timeInSeconds % 2 === 0 && previousTimeInSeconds !== timeInSeconds;
