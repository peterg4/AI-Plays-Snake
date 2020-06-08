function nextGeneration() {
  getAverageFit();
  savedSnakes.sort((a, b) => (a.score > b.score) ? 1 : -1);
  for (let i = 0; i < snakeCount; i++) {
    snakePopulation[i] = pickOne();
  }
  for (let i = 0; i < snakeCount; i++) {
    savedSnakes[i].dispose();
  }
  savedSnakes = [];
}

function pickOne() {
  let snake1 = savedSnakes[snakeCount-floor(random(1,30))];
  let snake2 = savedSnakes[snakeCount-2];
 // console.log(savedSnakes[snakeCount-floor(random(1,30))]);
  let child = new Snake(snake1.brain);
  child.mutate();
  return child;
}

function getAverageFit(){
  averageFitness = 0;
  for (let i = 0; i < snakeCount; i++) {
    averageFitness += savedSnakes[i].score;
    if(savedSnakes[i].score > bestFitness)
    bestFitness = savedSnakes[i].score;
  }
  averageFitness/=snakeCount;
}