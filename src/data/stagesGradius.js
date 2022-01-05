import {BG_BLUE, BG_PURPLE} from './palette';

export const dataGradius = {
  isArrowUp: false,
  isArrowDown: false,
  isArrowLeft: false,
  isArrowRight: false,
  isSpacebar: false,
  ship: {x: 0.1, y: 0.5, width: 0.1, height: 0.1},
  currentBulletIndex: 0,
  bullets: [],
  enemies: [],
  isGameOver: false,
  score: 0,
  maxScore: 6,
  text: {6: 'txt1'},
  isCooldown: false,
  coolDownTimerStart: 0,
  previousTime: 0,
  bgX: 0,
};

export const stagesGradius = [
  {
    id: 3,
    nextID: 4,
    type: 'GRADIUS',
    data: {
      ...dataGradius,
      maxScore: 6,
      text: {3: 'gradius1_1', 6: 'gradius1_2'},
      draw: {3: 'BG_13a', 6: 'BG_13b'},
      color: BG_BLUE,
    },
  },
  {
    id: 10,
    nextID: 11,
    type: 'GRADIUS',
    data: {
      ...dataGradius,
      maxScore: 12,
      text: {6: 'gradius2_1', 12: 'gradius2_2'},
      draw: {6: 'BG_13a', 12: 'BG_13b'},
      color: BG_PURPLE,
    },
  },
  {
    id: 17,
    nextID: 18,
    type: 'GRADIUS',
    data: {
      ...dataGradius,
      maxScore: 18,
      text: {6: 'gradius3_1', 12: 'gradius3_2', 18: 'gradius3_3'},
      draw: {6: 'BG_13a', 12: 'BG_13b', 18: 'BG_13c'},
      color: BG_PURPLE,
    },
  },
];
