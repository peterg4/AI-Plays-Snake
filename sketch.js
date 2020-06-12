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
var generationCountDisplay;
var counter;
var generationCount = 0;

let cycleCount = 1;
let cycleSlider;
let previousSnake;
let nextSnake;
var snakeSelector = 0;
let currentSnake;

function setup() {
  createCanvas(400, 400).parent('canvas-container');
  chart.render();
  counter = createP('Generation: 0').parent('sketch-head');
  generationCountDisplay = createP('300').parent('sketch-head').id('gen-counter');
  bestFitDisplay = createP('0').parent('best-fit').class('best-counter').id('best-fit');
  bestLengthDisplay = createP('0').parent('best-length').class('best-counter').id('best-len');
  cycleSlider = createSlider(1,50, 1, 1).parent('control-panel').id('speed-control');
  previousSnake = createButton('<i class="fa fa-chevron-left" aria-hidden="true"></i> Previous Snake').parent('button-container');
  nextSnake = createButton('Next Snake <i class="fa fa-chevron-right" aria-hidden="true"></i>').parent('button-container');
  nextSnake.mousePressed(changeSnake);
  previousSnake.mousePressed(downchangeSnake);

  w = floor(width);
  h = floor(height);
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

function changeSnake() {
  snakeSelector += 1;
  snakeSelector = constrain(snakeSelector, 0, snakePopulation.length-1)
}

function downchangeSnake() {
  snakeSelector -= 1;
  snakeSelector = constrain(snakeSelector, 0, snakePopulation.length-1)
}

function draw() {
  background(16, 17, 17);
  for(let c = 0; c < cycleSlider.value(); c++) {
    let k = 0;
    for (let snake of snakePopulation) {
      snake.think();
      snake.update();
      if(snake.endGame() || snake.lifespan <= 0 || snake.score < 0) {
        savedSnakes.push(snakePopulation.splice(k, 1)[0]);
        snakeSelector = constrain(snakeSelector, 0, snakePopulation.length-1);
        generationCountDisplay.html(snakePopulation.length);
      }
      snake.eat();
      k++;
    }

    if (snakePopulation.length === 0) {
      nextGeneration();
      generationCount++;
      counter.html('Generation: '+ generationCount);
      bestFitDisplay.html(bestFitness.toFixed(0));
      bestLengthDisplay.html(bestLength);
      generationCountDisplay.html(snakePopulation.length);
    }

    currentSnake = snakePopulation[snakeSelector];
    noStroke();
    fill(currentSnake.r, currentSnake.g, currentSnake.b);
    currentSnake.show();
    noStroke();
    fill(currentSnake.r, currentSnake.g, currentSnake.b);
    rect(currentSnake.food.x, currentSnake.food.y, rez, rez);
  }

}