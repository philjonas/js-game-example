import {calculateFontSize} from '.';
import {getActualDim} from './helpers';

/**
 * A "button" ;)
 * @param {object} ctx canvas context
 * @param {object} rectObj x, y, width, height
 * @param {string} label
 */
export function drawSingleLineLabel(ctx, rectObj, label) {
  if (!ctx) {
    return;
  }
  const d = getActualDim(rectObj, ctx.canvas);

  ctx.beginPath();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fill();
  ctx.fillRect(d.x, d.y, d.width, d.height);

  ctx.font = `normal ${calculateFontSize(label, rectObj, ctx.canvas)}em Arial`;
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.fillText(
    label,
    d.x + Math.floor(d.width / 2),
    d.y + Math.floor(d.height / 2)
  );

  ctx.closePath();
}
