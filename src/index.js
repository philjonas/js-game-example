import {createMachine, interpret} from 'xstate';
import './index.css';
import {gameStateConfig, gameStateOptions} from './state';

import lang from './text/language_en.json';
import {initCanvas} from './canvas';
import {createCanvas} from './state/helpers';

createCanvas();
const gameStateChart = createMachine(
  {...gameStateConfig},
  {...gameStateOptions}
);

const gameFSM = interpret(gameStateChart).start();
gameStateChart.config.context.languageJSON = lang;
initCanvas(gameStateChart.config.context);

gameFSM.onTransition(state => {
  if (state.value !== 'pause') {
    gameStateChart.config.context.previousStateName = state.value;
  }
});

window.addEventListener('FSM', function (e) {
  gameFSM.send(e.detail);
});
