# AI-Plays-Snake
AI learns to play Snake using deep learning with neural networks and a genetic algorithm. Built with TensorFlow.js and p5.js.

## Game
The snake plays on a 20x20 board, and grows in length each time it eats an 'apple'. If the snake touches any walls or its own body, it dies.

## Evolution
The evolution process is based loosely on real life evolution. Snakes are born in generations of 300, and when all the snakes in a given generation die, the next generation is created based on the best snakes in the previous. In this case, the brains are randomly created neural networks constisting of 14 input neurons, 10-16 hidden neurons, and 4 output neurons, which correspond with up, down, left, and right. When a new generation is created, the best neural networks are copied and used as the base for the new snakes' neural networks. These neural nets are then tweaked, or mutated, the ensure genetic diversity.

## Results
In this implementation one should expect relatively poor performance for the first 50 or so generations, followed by a sharp increase in performance that steadily increases until the average snake eats around 30 apples. 
The highest score I've seen a snake reach is 127, or around 30% coverage.

## Demo
https://peterg4.github.io/AI-Plays-Snake/
