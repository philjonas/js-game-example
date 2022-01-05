import {getActualDim, getActualSquare} from './helpers';

/**
 * A sprite ;)
 * @param {object} ctx canvas context
 * @param {object} rectObj x, y, width, height
 * @param {Image} img the JS image object
 */
export function drawSprite(ctx, rectObj, img, isSquare = false) {
  if (!ctx) {
    return;
  }
  const d = isSquare
    ? getActualSquare(rectObj, ctx.canvas)
    : getActualDim(rectObj, ctx.canvas);
  // document.body.appendChild(img);
  ctx.drawImage(img, d.x, d.y, d.width, d.height);
}

export const drawSquareSprite = (ctx, rectObj, img) =>
  drawSprite(ctx, rectObj, img, true);
