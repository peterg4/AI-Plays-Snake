const snakeCount = 4;
let snakePopulation = [];
let savedSnakes = [];
let snake;
let rez = 20;
let food;
let w;
let h;

function setup() {
  createCanvas(600, 600);
  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(10);
  tf.setBackend('cpu');
  var button = createButton('Restart');
  button.mousePressed(restart);
  for (let i = 0; i < snakeCount; i++) {
    snakePopulation[i] = new Snake();
  }
  foodLocation();
}

function foodLocation() {
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);

}

function keyPressed() {
  switch(keyCode) {
    case LEFT_ARROW: snake.setVelocity(-1, 0); break;
    case RIGHT_ARROW: snake.setVelocity(1, 0); break;
    case UP_ARROW: snake.setVelocity(0, -1); break;
    case DOWN_ARROW: snake.setVelocity(0, 1); break;
  }
}

function restart() {
  snake = new Snake();
  foodLocation()
  background(220);
  loop();
}

function draw() {
  scale(rez);
  background(220);

  let k = 0;
  for (let snake of snakePopulation) {
    snake.think(food);
    snake.update();
    if (snake.eat(food)) {
      foodLocation();
    }
    if(snake.endGame()) {
      savedSnakes.push(snakePopulation.splice(k, 1)[0]);
    }
    k++;
  }

  if (snakePopulation.length === 0) {
    counter = 0;
    nextGeneration();
    pipes = [];
  }


  for (let snake of snakePopulation) {
    snake.show();
  }

  noStroke();
  fill(255, 0, 0);
  rect(food.x, food.y, 1, 1);
}