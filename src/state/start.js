import {
  drawSingleLineLabel,
  getActualDim,
  getMousePos,
  isPointInRect,
  clearCanvas,
  updateCanvas,
  drawStaticBG,
  drawBGColor,
} from '../canvas';
import {startNewGame, loadGame} from './helpers';
import {BG_intro} from '../data';
import {BG_BLUE, BG_ORANGE} from '../data/palette';

const btnList = [
  {
    x: 0,
    y: 0,
    width: 1,
    height: 0.15,
  },
  {
    x: 0.03,
    y: 0.6,
    width: 0.2,
    height: 0.15,
  },
  {
    x: 0.03,
    y: 0.8,
    width: 0.2,
    height: 0.15,
  },
];

const [btnTitle, btnNew, btnLoad] = btnList;

export const enterStart = (context, event) => {
  document.onmousedown = evt => {
    const mousePos = getMousePos(context.canvas, evt);

    if (isPointInRect(mousePos, getActualDim(btnNew, context.canvas))) {
      startNewGame(context);
    }

    if (isPointInRect(mousePos, getActualDim(btnLoad, context.canvas))) {
      loadGame(context);
    }
  };

  updateCanvas(context, draw);
};

function draw(context) {
  clearCanvas(context);
  drawBGColor(context, BG_ORANGE);
  drawStaticBG(context.ctx, BG_intro);

  drawSingleLineLabel(context.ctx, btnTitle, context.languageJSON.start_title);
  drawSingleLineLabel(context.ctx, btnNew, context.languageJSON.start_new);
  drawSingleLineLabel(context.ctx, btnLoad, context.languageJSON.start_load);

  updateCanvas(context, draw);
}
