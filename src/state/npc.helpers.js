import {drawHorizontalScrollingBG, drawSprite} from '../canvas';
import {BG_scroll, cloudNPC} from '../data';
import {bindValue, getValueFromScore} from './helpers';

const BG_SPEED = 0.025;

function getBGPosX(context) {
  const {
    currentStageData: {
      ship: {x},
      bgX,
      score,
      isArrowRight,
      isArrowLeft,
    },
  } = context;

  if (isArrowRight) {
    return bgX - BG_SPEED;
  }

  if (isArrowLeft && (score > 0 || bgX < 0)) {
    return bgX + BG_SPEED;
  }

  return bgX;
}

export function biDirectionalBG(context) {
  let x = getBGPosX(context);
  if (context.currentStageData.score < 0) {
    x = 0;
    context.currentStageData.score = 0;
  }
  context.currentStageData.bgX = drawHorizontalScrollingBG(
    context.ctx,
    BG_scroll,
    x,
    0
  );
}

export function trackingScore(context) {
  const {
    currentStageData: {bgX, score, isArrowRight, isArrowLeft},
  } = context;

  if (bgX !== 0 || score < 0) {
    return;
  }

  if (isArrowRight) {
    context.currentStageData.score += 1;
    context.currentStageData.bgX += 0.001;
    return;
  }

  if (isArrowLeft) {
    context.currentStageData.score -= 1;
    context.currentStageData.bgX -= 0.001;
  }
}

const NPC_POS = {x: 0, y: 0.3, width: 0.1, height: 0.1};
export function drawNPCSprite(context) {
  const {
    currentStageData: {
      isArrowLeft,
      score,
      text,
      npcX,
      previousLabel,
      bgX,
      isArrowRight,
      ship,
      maxScore,
    },
  } = context;

  if (score >= maxScore) {
    return;
  }

  const label = getValueFromScore(text, score);

  let x = npcX;

  if (label !== previousLabel) {
    x = isArrowLeft ? 0 : 1 - NPC_POS.width;
    context.currentStageData.previousLabel = label;
  } else if (isArrowRight) {
    x = npcX - BG_SPEED / 2;
  } else if (isArrowLeft) {
    x = npcX + BG_SPEED / 2;
  }

  x = bindValue(x, 0, 1 - NPC_POS.width);

  drawSprite(context.ctx, {...NPC_POS, x}, cloudNPC);
  context.currentStageData.npcX = x;
}
