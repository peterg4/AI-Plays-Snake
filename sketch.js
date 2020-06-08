const snakeCount = 300;
let snakePopulation = [];
let savedSnakes = [];
let snake;
let rez = 20;
let food;
let w;
let h;
let averageFitness = 0;
let bestFitness = 0;


var bestFitDisplay;
var averageFitDisplay;
var counter;
var generationCount = 0;

function setup() {
  createCanvas(600, windowHeight).parent('canvas-container');
  counter = createP('Generation: 0')
  counter.parent('data-container');
  bestFitDisplay = createP('Best Fitness: 0');
  bestFitDisplay.parent('data-container');
  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(24);
  tf.setBackend('cpu');
  for (let i = 0; i < snakeCount; i++) {
    snakePopulation[i] = new Snake();
  }
}

function keyPressed() {
  switch(keyCode) {
    case LEFT_ARROW: snake.setVelocity(-1, 0); break;
    case RIGHT_ARROW: snake.setVelocity(1, 0); break;
    case UP_ARROW: snake.setVelocity(0, -1); break;
    case DOWN_ARROW: snake.setVelocity(0, 1); break;
  }
}

function draw() {
  scale(rez);
  background(220);

  let k = 0;
  for (let snake of snakePopulation) {
    
    snake.think();
    
    snake.update();
    if(snake.endGame() || snake.age > snake.lifespan || snake.score < 0) {
      savedSnakes.push(snakePopulation.splice(k, 1)[0]);
    }
    snake.eat();
    k++;
  }

  if (snakePopulation.length === 0) {
    nextGeneration();
    generationCount++;
    counter.html('Generation: '+ generationCount);
    bestFitDisplay.html('Best Fitness: ' + bestFitness.toFixed(2));
    //createP('Average Fitness: ' + averageFitness.toFixed(2)).parent('data-container');

  }

  for (let snake of snakePopulation) {
      noStroke();
      fill(snake.r, snake.g, snake.b);
      snake.show();
      noStroke();
      fill(snake.r, snake.g, snake.b);
      rect(snake.food.x, snake.food.y, 1, 1);
  }


}