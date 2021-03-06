function nextGeneration() {
  getAverageFit();
  dps.push({
    x: generationCount+1,
    y: averageFitness
  });
  updateChart(generationCount);
  savedSnakes.sort((a, b) => (a.score > b.score) ? 1 : -1);
  for (let i = 0; i < snakeCount; i++) {
    snakePopulation[i] = pickOne();
  }
  for (let i = 0; i < snakeCount; i++) {
    if(savedSnakes[i] != bestSnake)
      savedSnakes[i].dispose();
  }
  savedSnakes = [];
}

function pickOne() {
  let snake1 = savedSnakes[snakeCount-floor(random(1,floor(snakeCount*.2)))];
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
    if(savedSnakes[i].len > bestLength){
      bestLength = savedSnakes[i].len;
      bestSnake = savedSnakes[i];
    }
  }
  averageFitness/=snakeCount;
}