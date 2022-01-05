import {getActualDim} from './helpers';

const FULL_SCREEN = {x: 0, y: 0, width: 1, height: 1};

/**
 * A static background
 * @param {object} ctx canvas context
 * @param {Image} img the JS image object
 */
export function drawStaticBG(ctx, img) {
  if (!ctx) {
    return;
  }
  const d = getActualDim(FULL_SCREEN, ctx.canvas);
  ctx.drawImage(img, d.x, d.y, d.width, d.height);
}
