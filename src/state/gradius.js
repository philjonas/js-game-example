import {fsmSend, goToNextStage, getValueFromScore} from './helpers';
import {
  clearCanvas,
  updateCanvas,
  drawSprite,
  drawSingleLineLabel,
  drawStaticBG,
  drawHorizontalScrollingBG,
  drawSquareSprite,
  drawBGColor,
} from '../canvas';
import {
  getStageType,
  BG_scroll,
  STATIC_GRADIUS_BACKGROUNDS,
  heroCaptain,
} from '../data';
import {
  initBullets,
  drawBullets,
  initEnemies,
  drawEnemies,
  moveShip,
  listenKeyboardAndSpacebar,
  handleBulletsEnemies,
} from './gradius.helpers';

const txtLabel = {x: 0, y: 0.8, width: 1, height: 0.2};

export const enterGradius = (context, event) => {
  initBullets(context);
  initEnemies(context);
  listenKeyboardAndSpacebar(context);
  updateCanvas(context, drawGradius);
};

function drawGradius(context, dt) {
  if (getStageType(context.stageID) !== 'GRADIUS') {
    return;
  }
  clearCanvas(context);

  const {
    currentStageData: {isGameOver, maxScore, score, text, color},
  } = context;

  drawBGColor(context, color);

  if (isGameOver) {
    fsmSend('GAMEOVER');
    return;
  }

  if (score >= maxScore) {
    goToNextStage(context);
    return;
  }

  moveShip(context, dt);

  if (context.currentStageData.hasOwnProperty('draw')) {
    drawStaticBG(
      context.ctx,
      STATIC_GRADIUS_BACKGROUNDS[
        getValueFromScore(context.currentStageData.draw, score)
      ]
    );
  }

  context.currentStageData.bgX = drawHorizontalScrollingBG(
    context.ctx,
    BG_scroll,
    context.currentStageData.bgX,
    0.0005
  );

  drawSprite(context.ctx, context.currentStageData.ship, heroCaptain);
  drawBullets(context, handleBulletsEnemies);
  drawEnemies(context);

  const newKey = getValueFromScore(text, score);
  const label = context.languageJSON[newKey];
  drawSingleLineLabel(context.ctx, txtLabel, label);

  updateCanvas(context, drawGradius);
}
