import {store} from '../data';
import {enterPuzzle} from './puzzle';
import {enterGameOver} from './gameOver';
import {enterPause} from './pause';
import {enterStart} from './start';
import {enterNPC} from './npc';
import {enterGradius} from './gradius';
import {clearAppState} from './helpers';

export const gameStateConfig = {
  id: 'gameApp',
  initial: 'start',
  context: {...store},
  states: {
    start: {
      entry: ['enterStart'],
      exit: ['clearAppState'],
      on: {
        PUZZLE: 'puzzle',
        NPC: 'npc',
        GRADIUS: 'gradius',
        PAUSE: 'pause',
        START: 'start',
      },
    },
    puzzle: {
      entry: ['enterPuzzle'],
      exit: ['clearAppState'],
      on: {
        PAUSE: 'pause',
        GAMEOVER: 'gameOver',
        NPC: 'npc',
        GRADIUS: 'gradius',
        START: 'start',
      },
    },
    pause: {
      entry: ['enterPause'],
      exit: ['clearAppState'],
      on: {
        PUZZLE: 'puzzle',
        NPC: 'npc',
        GRADIUS: 'gradius',
        PAUSE: 'pause',
        START: 'start',
      },
    },
    gameOver: {
      entry: ['enterGameOver'],
      exit: ['clearAppState'],
      on: {
        START: 'start',
        PAUSE: 'pause',
        PUZZLE: 'puzzle',
        NPC: 'npc',
        GRADIUS: 'gradius',
      },
    },
    npc: {
      entry: ['enterNPC'],
      exit: ['clearAppState'],
      on: {
        PAUSE: 'pause',
        GAMEOVER: 'gameOver',
        PUZZLE: 'puzzle',
        GRADIUS: 'gradius',
        START: 'start',
      },
    },
    gradius: {
      entry: ['enterGradius'],
      exit: ['clearAppState'],
      on: {
        PAUSE: 'pause',
        GAMEOVER: 'gameOver',
        PUZZLE: 'puzzle',
        NPC: 'npc',
        START: 'start',
      },
    },
  },
};

export const gameStateOptions = {
  actions: {
    enterPause,
    clearAppState,
    enterStart,
    enterPuzzle,
    enterGameOver,
    enterNPC,
    enterGradius,
  },
};
