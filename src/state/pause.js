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
import {resumeStage, loadGame} from './helpers';
import {BG_intro} from '../data';
import {BG_BLUE, BG_ORANGE} from '../data/palette';

const btnList = [
  {
    x: 0.03,
    y: 0.01,
    width: 0.2,
    height: 0.15,
  },
  {
    x: 0.03,
    y: 0.18,
    width: 0.2,
    height: 0.15,
  },
  {
    x: 0.03,
    y: 0.69,
    width: 1,
    height: 0.15,
  },
];

const [btnResume, btnTut] = btnList;

let previousStateName;
export const enterPause = (context, event) => {
  document.onmousedown = evt => {
    const mousePos = getMousePos(context.canvas, evt);

    if (isPointInRect(mousePos, getActualDim(btnResume, context.canvas))) {
      resumeStage(context);
    }
  };

  previousStateName = context.previousStateName;
  updateCanvas(context, draw);
};

function draw(context) {
  clearCanvas(context);
  drawBGColor(context, BG_BLUE);
  drawStaticBG(context.ctx, BG_intro);

  drawSingleLineLabel(
    context.ctx,
    btnResume,
    context.languageJSON.pause_resume
  );

  updateCanvas(context, draw);
}
