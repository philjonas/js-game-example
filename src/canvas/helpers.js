/**
 *
 * @param {*} relativeDimensions x, y, width, height from 0.0 to 1.0
 * @param {*} canvas
 * @returns {*} x, y, width, height in actual dimensions
 */
export function getActualDim(relativeDimensions, canvas) {
  return {
    x: Math.trunc(relativeDimensions.x * canvas.width),
    y: Math.trunc(relativeDimensions.y * canvas.height),
    width: Math.trunc(relativeDimensions.width * canvas.width),
    height: Math.trunc(relativeDimensions.height * canvas.height),
  };
}

export function getMousePos(canvas, evt) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((evt.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
    y: ((evt.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height,
  };
}

export function isPointInRect(point, rect) {
  return (
    point.x > rect.x &&
    point.x < rect.x + rect.width &&
    point.y < rect.y + rect.height &&
    point.y > rect.y
  );
}

export function isColliding(thisObj, otherObj) {
  const myleft = thisObj.x;
  const myright = thisObj.x + thisObj.width;
  const mytop = thisObj.y;
  const mybottom = thisObj.y + thisObj.height;
  const otherleft = otherObj.x;
  const otherright = otherObj.x + otherObj.width;
  const othertop = otherObj.y;
  const otherbottom = otherObj.y + otherObj.height;
  let crash = true;
  if (
    mybottom < othertop ||
    mytop > otherbottom ||
    myright < otherleft ||
    myleft > otherright
  ) {
    crash = false;
  }
  return crash;
}

export const HEIGHT_RATIO = 9 / 16;
export function setHeight(width) {
  return width * HEIGHT_RATIO;
}

export function setAspectRatio(context) {
  context.canvas.width = context.canvas.clientWidth;
  context.canvas.height = setHeight(context.canvas.width);
  context.ctx = context.canvas.getContext('2d');
}

/**
 *
 * @param {*} context Xstate context
 */
export function initCanvas(context) {
  context.canvas = document.getElementById('app');
  context.ctx = context.canvas.getContext('2d');
}

/**
 *
 * @param {*} context Xstate context
 */
export function clearCanvas(context) {
  context.ctx.clearRect(0, 0, context.canvas.width, context.canvas.height);
  setAspectRatio(context);
}

/**
 *
 * @param {*} context Xstate context
 * @param {function} draw
 */
export function updateCanvas(context, draw) {
  context.frameID = window.requestAnimationFrame(dt => draw(context, dt));
}

/**
 *
 * @param {*} relativeDimensions x, y, width, height from 0.0 to 1.0
 * @param {*} canvas
 * @returns {*} x, y, width, height in actual dimensions
 */
export function getActualSquare(relativeDimensions, canvas) {
  const actualDimensions = getActualDim(relativeDimensions, canvas);
  const height = actualDimensions.width;
  return {...actualDimensions, height};
}

/**
 *
 * @param {*} label
 * @param {*} rectObj
 * @param {*} actualObj
 * @returns font size in em
 */
export function calculateFontSize(label, rectObj, canvas) {
  const length = label.length > 5 ? label.length : 5;
  return (rectObj.width / length) * (canvas.width / 10);
}

/**
 *
 * @param {*} context Xstate context
 * @param {string} color
 */
export function drawBGColor(context, color) {
  context.ctx.fillStyle = color;
  context.ctx.fillRect(0, 0, context.canvas.width, context.canvas.height);
}
