function nextGeneration() {
  
  for (let i = 0; i < snakeCount; i++) {
    snakePopulation[i] = pickOne();
  }
  for (let i = 0; i < snakeCount; i++) {
    savedSnakes[i].dispose();
  }
  savedSnakes = [];
}

function pickOne() {
  let snake = savedSnakes[snakeCount-1];
  let child = new Snake(snake.brain);
  child.mutate();
  return child;
}