function nextGeneration() {
  let targetFitness = calculateFitness();
  for (let i = 0; i < snakeCount; i++) {
    snakePopulation[i] = pickOne(targetFitness);
  }
  for (let i = 0; i < snakeCount; i++) {
    savedSnakes[i].dispose();
  }
  savedSnakes = [];
}

function pickOne(target) {
  let index = 0;
 /* let r = random(1);
  while (r > 0) {
    r = r - savedSnakes[index].fitness;
    index++;
  }
  index--;*/
  let bestSnake;
  for(let snake in savedSnakes) {
    if (snake.fitness > target-.01)
      bestSnake = snake.brain;
  }
//  let snake = savedSnakes[index];
  let child = new Snake(bestSnake);
  child.mutate();
  return child;
}

function calculateFitness() {
  let sum = 0;
  for (let snake of savedSnakes) {
    sum += snake.score;
  }
  let best = 0;
  for (let snake of savedSnakes) {
    snake.fitness = snake.score / sum;
    if(snake.fitness > best ){
      best = snake.fitness;
    }
  }
  console.log(best);
  return best;
}