import {
  drawSingleLineLabel,
  clearCanvas,
  updateCanvas,
  drawStaticBG,
  drawBGColor,
} from '../canvas';
import {fsmSend, restartStage} from './helpers';
import {LAST_STAGE_ID, BG_intro} from '../data';
import {BG_GREEN, BG_PURPLE} from '../data/palette';

const rectGameOver = {
  x: 0.2,
  y: 0.4,
  width: 0.6,
  height: 0.2,
};

let buttonLabel;

function onUserAction(gameWon, context) {
  if (gameWon) {
    fsmSend('START');
  } else {
    restartStage(context);
  }
}

export const enterGameOver = (context, event) => {
  const gameWon = context.stageID > LAST_STAGE_ID;

  document.onmousedown = evt => onUserAction(gameWon, context);

  document.onkeydown = evt => onUserAction(gameWon, context);

  buttonLabel = gameWon
    ? context.languageJSON.gameOver_congrats
    : context.languageJSON.gameOver_tooBad;
  updateCanvas(context, draw);
};

function draw(context) {
  const gameWon = context.stageID > LAST_STAGE_ID;
  clearCanvas(context);
  drawBGColor(context, BG_GREEN);
  drawStaticBG(context.ctx, BG_intro);
  drawSingleLineLabel(context.ctx, rectGameOver, buttonLabel);

  updateCanvas(context, draw);
}
