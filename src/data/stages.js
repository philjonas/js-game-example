import {deepClone} from './helpers';
import {stagesGradius} from './stagesGradius';
import {stagesNPC} from './stagesNPC';
import {stagesPuzzle} from './stagesPuzzle';

export const stages = [...stagesGradius, ...stagesNPC, ...stagesPuzzle];

export const FIRST_STAGE_ID = 1;
export const LAST_STAGE_ID = 18;

export function getStageByID(id) {
  return stages.find(x => x.id === id);
}

export function getStageType(id) {
  const stage = getStageByID(id);
  if (!stage) {
    return '';
  }
  return stage.type;
}

export function getNextStageID(id) {
  const stage = getStageByID(id);
  if (!stage) {
    return -1;
  }
  return stage.nextID;
}

/**
 * returns a deep clone of the stage data
 * @param {number} id
 */
export function cloneStageData(id) {
  const payload = deepClone(getStageByID(id));
  return payload ? payload.data : {};
}
