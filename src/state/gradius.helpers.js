import {drawSprite, isColliding} from '../canvas';
import {bindValue, fsmSend} from './helpers';
import {gradiusBullet, gradiusObstacle} from '../data';

export const OFF_SCREEN = -1;
const MAX_BULLETS_ON_SCREEN = 10;
const MAX_OBSTACLES_ON_SCREEN = 5;
const RELOAD_TIME = 0.3;

export function initBullets(context) {
  let newBullets = [];
  while (newBullets.length < MAX_BULLETS_ON_SCREEN) {
    newBullets.push({
      x: OFF_SCREEN,
      y: OFF_SCREEN,
      width: 0.05,
      height: 0.05,
    });
  }
  context.currentStageData.bullets = [...newBullets];
}

export function handleBulletsEnemies(context, index) {
  const {
    currentStageData: {bullets, enemies},
  } = context;
  if (bullets[index].x < 1) {
    for (let index2 = 0; index2 < enemies.length; index2++) {
      if (isColliding(bullets[index], enemies[index2])) {
        context.currentStageData.bullets[index].x = OFF_SCREEN;
        context.currentStageData.enemies[index2].isHit = true;
      }
    }
  }
}

export function drawBullets(context, handleEnemies) {
  const {
    currentStageData: {bullets},
  } = context;
  for (let index = 0; index < bullets.length; index++) {
    if (bullets[index].x > 1) {
      context.currentStageData.bullets[index].x = OFF_SCREEN;
    } else if (bullets[index].x > 0) {
      context.currentStageData.bullets[index].x = bindValue(
        bullets[index].x + 0.01,
        0,
        1
      );

      if (handleEnemies) {
        handleEnemies(context, index);
      }

      drawSprite(
        context.ctx,
        context.currentStageData.bullets[index],
        gradiusBullet
      );
    }
  }
}

export function initEnemies(context) {
  if (context.currentStageData.enemies.length > 0) {
    return;
  }
  let newEnemies = [];
  while (newEnemies.length < MAX_OBSTACLES_ON_SCREEN) {
    newEnemies.push({
      x: OFF_SCREEN,
      y: OFF_SCREEN,
      width: 0.1,
      height: 0.1,
      isHit: false,
    });
  }
  context.currentStageData.enemies = [...newEnemies];
}

export function drawEnemies(context) {
  const {
    currentStageData: {enemies, ship},
  } = context;

  for (let index = 0; index < enemies.length; index++) {
    if (isColliding(enemies[index], ship)) {
      context.currentStageData.isGameOver = true;
    }

    if (enemies[index].isHit) {
      context.currentStageData.enemies[index].y -= 0.005;
      if (enemies[index].y < -0.2) {
        context.currentStageData.enemies[index].x = OFF_SCREEN;
        context.currentStageData.enemies[index].y = 0.7;
        context.currentStageData.enemies[index].isHit = false;
        context.currentStageData.score++;
      }
    } else if (enemies[index].x > -0.2) {
      context.currentStageData.enemies[index].x -= 0.005;
    } else {
      if (
        index === 0 ||
        isReadyforNextObstacle(context.currentStageData.enemies[index - 1].x)
      ) {
        context.currentStageData.enemies[index].x = 1.1;
        context.currentStageData.enemies[index].y = bindValue(
          Math.random(),
          0.1,
          0.6
        );
      }
    }

    drawSprite(
      context.ctx,
      context.currentStageData.enemies[index],
      gradiusObstacle
    );
  }
}

export function isReadyforNextObstacle(val) {
  return val < 0.75 && val > 0;
}

export function shootBullet(context, x, y, dt) {
  const {
    currentStageData: {ship, currentBulletIndex},
  } = context;
  context.currentStageData.bullets[currentBulletIndex].x = x + ship.width;
  context.currentStageData.bullets[currentBulletIndex].y =
    y + ship.height / 2 - context.currentStageData.bullets[0].height / 2;
  context.currentStageData.currentBulletIndex =
    (currentBulletIndex + 1) % MAX_BULLETS_ON_SCREEN;
  startCooldown(context, dt);
}

export function startCooldown(context, dt) {
  context.currentStageData.isSpacebar = false;
  context.currentStageData.isCooldown = true;
  context.currentStageData.coolDownTimerStart = dt;
}

export function stopCooldown(context, dt) {
  const secondsPassed =
    (dt - context.currentStageData.coolDownTimerStart) / 1000;
  if (secondsPassed > RELOAD_TIME) {
    context.currentStageData.isCooldown = false;
  }
}

export function moveShip(context, dt) {
  const {
    currentStageData: {
      isArrowUp,
      isArrowDown,
      isArrowLeft,
      isArrowRight,
      isSpacebar,
      ship,
      isCooldown,
      previousTime,
    },
  } = context;

  let x = ship.x;
  let y = ship.y;
  const currentTime = dt - previousTime;
  const shipSpeed = (0.01 * currentTime) / 25;
  context.currentStageData.previousTime = dt;

  if (isArrowUp) {
    y = bindValue(ship.y - shipSpeed, 0, 0.8 - ship.height);
  } else if (isArrowDown) {
    y = bindValue(ship.y + shipSpeed, 0, 0.8 - ship.height);
  }

  if (isArrowLeft) {
    x = bindValue(ship.x - shipSpeed, 0, 1 - ship.width);
  } else if (isArrowRight) {
    x = bindValue(ship.x + shipSpeed, 0, 1 - ship.width);
  }

  if (isSpacebar) {
    shootBullet(context, x, y, dt);
  }

  if (isCooldown) {
    stopCooldown(context, dt);
  }

  context.currentStageData.ship = {...ship, x, y};
}

function listenKeyboard(context, isListenSpacebar) {
  document.onmousedown = evt => {
    if (isListenSpacebar && !context.currentStageData.isCooldown) {
      context.currentStageData.isSpacebar = true;
    }
  };

  document.onkeyup = evt => {
    evt.preventDefault();
    if (evt.key === 'Escape') {
      fsmSend('PAUSE');
    }

    if (evt.key === 'ArrowUp') {
      context.currentStageData.isArrowUp = false;
    } else if (evt.key === 'ArrowDown') {
      context.currentStageData.isArrowDown = false;
    }

    if (evt.key === 'ArrowLeft') {
      context.currentStageData.isArrowLeft = false;
    } else if (evt.key === 'ArrowRight') {
      context.currentStageData.isArrowRight = false;
    }
  };

  document.onkeydown = evt => {
    evt.preventDefault();
    if (evt.key === 'ArrowUp') {
      context.currentStageData.isArrowUp = true;
    } else if (evt.key === 'ArrowDown') {
      context.currentStageData.isArrowDown = true;
    }

    if (evt.key === 'ArrowLeft') {
      context.currentStageData.isArrowLeft = true;
    } else if (evt.key === 'ArrowRight') {
      context.currentStageData.isArrowRight = true;
    }

    if (
      isListenSpacebar &&
      evt.key === ' ' &&
      !context.currentStageData.isCooldown
    ) {
      context.currentStageData.isSpacebar = true;
    }
  };
}

export const listenKeyboardAndSpacebar = context =>
  listenKeyboard(context, true);
export const listenKeyboardNoSpacebar = context =>
  listenKeyboard(context, false);
