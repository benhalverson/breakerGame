const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const ballRadius = 10;
const paddleHeight = 10;
const paddleWidth = 75;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = 2;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;

const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
const bricks = [];
for (let column = 0; column < brickColumnCount; column += 1) {
  bricks[column] = [];
  for (let row = 0; row < brickRowCount; row += 1) {
    bricks[column][row] = { x: 0, y: 0 };
  }
}

function drawBricks() {
  for (let column = 0; column < brickColumnCount; column += 1) {
    for (let row = 0; row < brickRowCount; row += 1) {
      const brickX = (column * (brickWidth + brickPadding)) + brickOffsetLeft;
      const brickY = (row * (brickHeight + brickPadding)) + brickOffsetTop;
      bricks[column][row].x = brickX;
      bricks[column][row].y = brickY;
      ctx.beginPath();
      ctx.rect(0, 0, brickWidth, brickHeight);
      ctx.fillStyle = '#0095DD';
      ctx.fill();
      ctx.closePath();
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      document.location.reload();
    }
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
}

function keyDownHandler(e) {
  if (e.keyCode === 39) {
    rightPressed = true;
  }

  if (e.keyCode === 37) {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.keyCode === 39) {
    rightPressed = false;
  }

  if (e.keyCode === 37) {
    leftPressed = false;
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
setInterval(draw, 10);
