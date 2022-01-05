import {BG_BLUE, BG_PURPLE} from './palette';
import {dataGradius} from './stagesGradius';

export const PUZZLE_MINUS = 0;
export const PUZZLE_PLUS = 1;
export const PUZZLE_TYPE_SIGNS = 'signs';

export const PUZZLE_VERTICAL = 0;
export const PUZZLE_HORIZONTAL = 1;
export const PUZZLE_TYPE_ORIENTATION = 'orientation';

export const PUZZLE_DOWN = 0;
export const PUZZLE_UP = 1;
export const PUZZLE_TYPE_DIRECTION = 'direction';

export const PUZZLE_FAST = 0;
export const PUZZLE_SLOW = 1;
export const PUZZLE_TYPE_SPEED = 'speed';

const dataPuzzle = {
  puzzle: [],
  solution: [],
  maxValue: 2,
  puzzleTiles: [],
  previousTimeInSeconds: 0,
  puzzleType: '',
};

export const stagesPuzzle = [
  {
    id: 2,
    nextID: 3,
    type: 'PUZZLE',
    data: {
      ...dataGradius,
      ...dataPuzzle,
      puzzle: [PUZZLE_PLUS],
      solution: [PUZZLE_MINUS],
      puzzleTiles: [{x: 0.5, y: 0.45, width: 0.1, height: 0.1}],
      text: 'puzzle1',
      puzzleType: PUZZLE_TYPE_SIGNS,
      color: BG_BLUE,
    },
  },
  {
    id: 5,
    nextID: 6,
    type: 'PUZZLE',
    data: {
      ...dataGradius,
      ...dataPuzzle,
      puzzle: [PUZZLE_UP],
      solution: [PUZZLE_DOWN],
      puzzleTiles: [{x: 0.45, y: 0.35, width: 0.1, height: 0.1}],
      draw: 'puzzle2',
      text: 'puzzle2',
      puzzleType: PUZZLE_TYPE_DIRECTION,
      color: BG_BLUE,
    },
  },
  {
    id: 7,
    nextID: 8,
    type: 'PUZZLE',
    data: {
      ...dataGradius,
      ...dataPuzzle,
      puzzle: [PUZZLE_HORIZONTAL, PUZZLE_HORIZONTAL],
      solution: [PUZZLE_VERTICAL, PUZZLE_VERTICAL],
      puzzleTiles: [
        {x: 0.3, y: 0.65, width: 0.1, height: 0.1},
        {x: 0.8, y: 0.65, width: 0.1, height: 0.1},
      ],
      text: 'puzzle3',
      puzzleType: PUZZLE_TYPE_ORIENTATION,
      color: BG_BLUE,
    },
  },
  {
    id: 9,
    nextID: 10,
    type: 'PUZZLE',
    data: {
      ...dataGradius,
      ...dataPuzzle,
      puzzle: [PUZZLE_DOWN, PUZZLE_DOWN],
      solution: [PUZZLE_UP, PUZZLE_DOWN],
      puzzleTiles: [
        {x: 0.3, y: 0.15, width: 0.1, height: 0.1},
        {x: 0.625, y: 0.15, width: 0.1, height: 0.1},
      ],
      text: 'puzzle4',
      draw: 'puzzle4',
      puzzleType: PUZZLE_TYPE_DIRECTION,
      color: BG_BLUE,
    },
  },
  {
    id: 12,
    nextID: 13,
    type: 'PUZZLE',
    data: {
      ...dataGradius,
      ...dataPuzzle,
      puzzle: [PUZZLE_SLOW, PUZZLE_SLOW],
      solution: [PUZZLE_FAST, PUZZLE_SLOW],
      puzzleTiles: [
        {x: 0.5, y: 0.3, width: 0.1, height: 0.1},
        {x: 0.5, y: 0.65, width: 0.1, height: 0.1},
      ],
      text: 'puzzle5',
      puzzleType: PUZZLE_TYPE_SPEED,
      color: BG_BLUE,
    },
  },
  {
    id: 14,
    nextID: 15,
    type: 'PUZZLE',
    data: {
      ...dataGradius,
      ...dataPuzzle,
      puzzle: [PUZZLE_HORIZONTAL, PUZZLE_HORIZONTAL],
      solution: [PUZZLE_VERTICAL, PUZZLE_VERTICAL],
      puzzleTiles: [
        {x: 0.4, y: 0.15, width: 0.1, height: 0.1},
        {x: 0.5, y: 0.5, width: 0.1, height: 0.1},
      ],
      text: 'puzzle6',
      draw: 'puzzle6',
      puzzleType: PUZZLE_TYPE_ORIENTATION,
      color: BG_PURPLE,
    },
  },
  {
    id: 16,
    nextID: 17,
    type: 'PUZZLE',
    data: {
      ...dataGradius,
      ...dataPuzzle,
      puzzle: [PUZZLE_MINUS, PUZZLE_MINUS, PUZZLE_MINUS],
      solution: [PUZZLE_MINUS, PUZZLE_PLUS, PUZZLE_MINUS],
      puzzleTiles: [
        {x: 0.425, y: 0.05, width: 0.1, height: 0.1},
        {x: 0.4, y: 0.3, width: 0.1, height: 0.1},
        {x: 0.5, y: 0.55, width: 0.1, height: 0.1},
      ],
      text: 'puzzle7',
      draw: 'puzzle6',
      puzzleType: PUZZLE_TYPE_SIGNS,
      color: BG_PURPLE,
    },
  },
];
