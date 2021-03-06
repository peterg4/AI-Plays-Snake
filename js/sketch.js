const snakeCount = 300;
let snakePopulation = [];
let savedSnakes = [];
let bestSnake;
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

let playable = false;

let playing = true;
let cycleCount = 1;
let cycleSlider;
let previousSnake;
let nextSnake;

let saveBest;
let uploadSnake;
let loadedSnake;
let loaded = false;

var snakeSelector = 0;
let currentSnake;

function setup() {
  createCanvas(400, 400).parent('canvas-container');
  chart.render();
  counter = createP('Generation: 0').parent('sketch-head');
  generationCountDisplay = createP('300').parent('sketch-head').id('gen-counter');
  bestFitDisplay = createP('0').parent('best-fit').class('best-counter').id('best-fit');
  bestLengthDisplay = createP('0').parent('best-length').class('best-counter').id('best-len');
  cycleSlider = createSlider(1,50, 1, 1).parent('speed-container').id('speed-control');
  previousSnake = createButton('<i class="fa fa-chevron-left" aria-hidden="true"></i> Previous Snake').parent('button-container');
  nextSnake = createButton('Next Snake <i class="fa fa-chevron-right" aria-hidden="true"></i>').parent('button-container');
  nextSnake.mousePressed(changeSnake);
  saveBest = createButton('Save Snake').parent('io-container');
  saveBest.mousePressed(saveSnake);
  previousSnake.mousePressed(downchangeSnake);
  uploadSnake = createButton('Load Snake').parent('io-container');
  uploadSnake.mousePressed(loadSnake);

  w = floor(width);
  h = floor(height);
  frameRate(24);
  tf.setBackend('cpu');
  for (let i = 0; i < snakeCount; i++) {
    snakePopulation[i] = new Snake();
  }
  document.getElementById('cover').style.display = 'none';
}

function keyPressed() {
  switch(keyCode) {
    case LEFT_ARROW: snake.setVelocity(-1, 0); break;
    case RIGHT_ARROW: snake.setVelocity(1, 0); break;
    case UP_ARROW: snake.setVelocity(0, -1); break;
    case DOWN_ARROW: snake.setVelocity(0, 1); break;
    case 65: snake.setVelocity(-1, 0); break;
    case 68: snake.setVelocity(1, 0); break;
    case 87: snake.setVelocity(0, -1); break;
    case 83: snake.setVelocity(0, 1); break; 
    case 32: 
      if(playing) {
        playing = false;
        noLoop()
      } else {
        playing = true;
        loop()
      }
      break;
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

function saveSnake() {
  bestSnake.brain.download();
}

function loadSnake() {
  loadedSnake = new Snake();
  loadedSnake.brain.upload();
  loaded = true;
}

function draw() {
  background(16, 17, 17);
  if(loaded) {
    loadedSnake.think();
    loadedSnake.update();
    if(loadedSnake.endGame() || loadedSnake.lifespan <= 0 || loadedSnake.score < 0) {
      console.log("dead loaded snake");
      loaded = false;
    }
    if(loaded) {
      loadedSnake.eat();
      noStroke();
      fill(loadedSnake.r, loadedSnake.g, loadedSnake.b);
      loadedSnake.show();
      noStroke();
      fill(loadedSnake.r, loadedSnake.g, loadedSnake.b);
      rect(loadedSnake.food.x, loadedSnake.food.y, rez, rez);
    }
    return;
  }
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