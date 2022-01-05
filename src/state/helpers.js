import {
  LAST_STAGE_ID,
  getStageType,
  cloneStageData,
  FIRST_STAGE_ID,
  getNextStageID,
} from '../data';

export const fsmSend = msg =>
  window.dispatchEvent(new CustomEvent('FSM', {detail: msg}));

function goToStage(id) {
  fsmSend(getStageType(id));
}

/**
 * Increments stage ID and resets all stage data
 * @param {*} context Xstate context
 */
export function goToNextStage(context) {
  window.cancelAnimationFrame(context.frameID);
  context.stageID = getNextStageID(context.stageID);
  if (context.stageID > LAST_STAGE_ID) {
    fsmSend('GAMEOVER');
    return;
  }
  resetStageData(context);
  saveGame(context);
  goToStage(context.stageID);
}

/**
 * This function should be used from the PAUSE state as it doesn't change stage data
 * @param {*} context Xstate context
 */
export function resumeStage(context) {
  goToStage(context.stageID);
}

export function startNewGame(context) {
  context.stageID = FIRST_STAGE_ID;
  resetStageData(context);
  goToStage(context.stageID);
}

/**
 * This function should be used from the GAMEOVER state as it changes stage data
 * @param {*} context Xstate context
 */
export function restartStage(context) {
  resetStageData(context);
  goToStage(context.stageID);
}

function resetStageData(context) {
  context.currentStageData = cloneStageData(context.stageID);
}

/**
 *
 * @param {*} context Xstate context
 */
export function clearAppState(context) {
  document.onkeydown = evt => evt.preventDefault();
  document.onkeyup = null;
  document.onmousedown = null;
  document.onmouseup = null;
  document.onmousemove = null;
  window.cancelAnimationFrame(context.frameID);
}

export function bindValue(val, min, max) {
  return Math.min(max, Math.max(val, min));
}

export function sortNumericStrings(arr) {
  return arr.sort((a, b) => parseFloat(a) - parseFloat(b));
}

export function getSortedKeys(obj) {
  return sortNumericStrings(Object.entries(obj).map(x => x[0]));
}

export function getValueFromScore(txtDict, score) {
  const orderedKeys = getSortedKeys(txtDict);
  let payload = '';
  orderedKeys.forEach(key => {
    if (payload === '' && score < parseFloat(key)) {
      payload = txtDict[key];
    }
  });
  return payload;
}

export function createCanvas() {
  const canvas = document.createElement('canvas');

  canvas.id = 'app';
  canvas.width = '100%';
  canvas.style.border = '0px solid';
  canvas.style.objectFit = 'contain';

  const body = document.getElementsByTagName('body')[0];
  body.appendChild(canvas);

  // const cursorLayer = document.getElementById('app');
  // console.log(cursorLayer);
}

export function saveGame(context) {
  // TODO: save game
}

export function loadGame(context) {
  // TODO: load game
}
