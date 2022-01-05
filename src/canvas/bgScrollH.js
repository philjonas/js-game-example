import {getActualDim} from './helpers';

/**
 * A sprite ;)
 * @param {object} ctx canvas context
 * @param {object} rectObj x, y, width, height
 * @param {number} x where the first image lies on the X axis
 * @param {number} xSpeed
 */
export function drawHorizontalScrollingBG(ctx, img, x, xSpeed = 0) {
  if (!ctx) {
    return;
  }
  let newX = x - xSpeed;
  if (x < -1 || x > 1) {
    newX = 0;
  }

  const scrollingScreen1 = {x: newX, y: 0, width: 1, height: 1};
  const scrollingScreen2 = {x: 1 + newX, y: 0, width: 1, height: 1};
  const scrollingScreen3 = {x: -1 + newX, y: 0, width: 1, height: 1};
  const d1 = getActualDim(scrollingScreen1, ctx.canvas);
  const d2 = getActualDim(scrollingScreen2, ctx.canvas);
  const d3 = getActualDim(scrollingScreen3, ctx.canvas);

  ctx.drawImage(img, d1.x, d1.y, d1.width, d1.height);
  ctx.drawImage(img, d2.x, d2.y, d2.width, d2.height);
  ctx.drawImage(img, d3.x, d3.y, d3.width, d3.height);

  return newX;
}
