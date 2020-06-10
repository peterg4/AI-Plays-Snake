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
let bestLength = 0;

var bestLengthDisplay;
var bestFitDisplay;
var averageFitDisplay;
var counter;
var generationCount = 0;

let cycleCount = 1;
let cycleSlider;

function setup() {
  createCanvas(400, 400).parent('canvas-container');
  counter = createP('Generation: 0').parent('canvas-container');
  bestFitDisplay = createP('Best Fitness: 0').parent('canvas-container');
  bestLengthDisplay = createP('Best Length: 0').parent('canvas-container')
  cycleSlider = createSlider(1,50, 1, 1).parent('canvas-container');

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
  background(255);
  for(let c = 0; c < cycleSlider.value(); c++) {
    let k = 0;
    for (let snake of snakePopulation) {
      
      snake.think();
      
      snake.update();
      if(snake.endGame() || snake.lifespan <= 0 || snake.score < 0) {
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
      bestLengthDisplay.html('Best Length: ' + bestLength);
    }

  //  for (let snake of snakePopulation) {
        noStroke();
        fill(snakePopulation[0].r, snakePopulation[0].g, snakePopulation[0].b);
        snakePopulation[0].show();
        noStroke();
        fill(snakePopulation[0].r, snakePopulation[0].g, snakePopulation[0].b);
        rect(snakePopulation[0].food.x, snakePopulation[0].food.y, 1, 1);
    }
 // }


}