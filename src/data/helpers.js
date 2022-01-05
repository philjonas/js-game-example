/**
 * https://javascript.plainenglish.io/the-most-efficient-ways-to-clone-objects-in-javascript-2021-c8e4d04096a5
 * @param {*} obj
 */
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object' || 'isActiveClone' in obj) {
    return obj;
  }

  let temp;
  if (obj instanceof Date) {
    temp = new obj.constructor();
  } else if (obj instanceof HTMLImageElement) {
    temp = new Image();
    temp.src = obj.src;
  } else {
    temp = obj.constructor();
  }

  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      obj['isActiveClone'] = null;
      temp[key] = deepClone(obj[key]);
      delete obj['isActiveClone'];
    }
  }
  return temp;
}
