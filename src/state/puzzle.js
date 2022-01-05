import {goToNextStage} from './helpers';
import {
  clearCanvas,
  updateCanvas,
  drawSprite,
  drawSingleLineLabel,
  drawStaticBG,
  drawBGColor,
} from '../canvas';
import {getStageType, BG_scroll, heroCaptain, puzzleImages} from '../data';
import {
  initBullets,
  drawBullets,
  moveShip,
  listenKeyboardAndSpacebar,
} from './gradius.helpers';
import {
  checkPuzzle,
  drawPuzzleTiles,
  handleBulletsPuzzle,
  isTimedCheck,
} from './puzzle.helpers';

const txtLabel = {x: 0, y: 0.8, width: 1, height: 0.2};

export const enterPuzzle = (context, event) => {
  initBullets(context);
  listenKeyboardAndSpacebar(context);
  updateCanvas(context, drawPuzzle);
};

function drawPuzzle(context, dt) {
  if (getStageType(context.stageID) !== 'PUZZLE') {
    return;
  }
  clearCanvas(context);

  const {
    currentStageData: {text, puzzle, solution, previousTimeInSeconds, color},
  } = context;

  drawBGColor(context, color);

  const timeInSeconds = Math.floor(dt / 1000);
  if (
    isTimedCheck(previousTimeInSeconds, timeInSeconds) &&
    checkPuzzle(puzzle, solution)
  ) {
    goToNextStage(context);
    return;
  }
  context.currentStageData.previousTimeInSeconds = timeInSeconds;

  moveShip(context, dt);

  const bgImage = context.currentStageData.hasOwnProperty('draw')
    ? puzzleImages[context.currentStageData.draw]
    : BG_scroll;

  drawStaticBG(context.ctx, bgImage);
  drawBullets(context, handleBulletsPuzzle);
  drawPuzzleTiles(context);
  drawSprite(context.ctx, context.currentStageData.ship, heroCaptain);

  const label = context.languageJSON[text];
  drawSingleLineLabel(context.ctx, txtLabel, label);

  updateCanvas(context, drawPuzzle);
}
