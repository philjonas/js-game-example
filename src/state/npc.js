import {goToNextStage, getValueFromScore} from './helpers';
import {
  clearCanvas,
  updateCanvas,
  drawSprite,
  drawSingleLineLabel,
  drawBGColor,
} from '../canvas';
import {getStageType, heroCaptain} from '../data';
import {
  moveShip,
  drawBullets,
  initBullets,
  listenKeyboardAndSpacebar,
} from './gradius.helpers';
import {biDirectionalBG, drawNPCSprite, trackingScore} from './npc.helpers';

const txtLabel = {x: 0, y: 0.8, width: 1, height: 0.2};

export const enterNPC = (context, event) => {
  listenKeyboardAndSpacebar(context);
  initBullets(context);
  updateCanvas(context, drawNPC);
};

function drawNPC(context, dt) {
  if (getStageType(context.stageID) !== 'NPC') {
    return;
  }
  clearCanvas(context);

  const {
    currentStageData: {maxScore, score, text, color},
  } = context;

  drawBGColor(context, color);

  if (score >= maxScore) {
    goToNextStage(context);
    return;
  }

  moveShip(context, dt);

  biDirectionalBG(context);
  trackingScore(context);
  drawNPCSprite(context);

  drawSprite(context.ctx, context.currentStageData.ship, heroCaptain);
  drawBullets(context);

  const newKey = getValueFromScore(text, score);
  const label = context.languageJSON[newKey];
  drawSingleLineLabel(context.ctx, txtLabel, label);

  updateCanvas(context, drawNPC);
}
