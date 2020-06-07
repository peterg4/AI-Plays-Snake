class Snake {
  
  constructor(brain) {
  	this.body = [];
    this.body[0] = createVector(floor(w/2), floor(h/2));
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.len = 0;

    this.score = 0;
    this.fitness = 0;
    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(5, 8, 4); //x,y head, x,y food, len
    }
  }
  
  dispose() {
    this.brain.dispose();
  }

  mutate() {
    this.brain.mutate(0.1);
  }

  setVelocity(x, y) {
    if(Math.abs(x - this.xVelocity) != 2 &&  Math.abs(y - this.yVelocity) != 2) {
      this.xVelocity = x;
      this.yVelocity = y;
    }
  }
  
  update() {
  	let head = this.body[this.body.length-1].copy();
    this.body.shift();
    head.x += this.xVelocity;
    head.y += this.yVelocity;
    this.body.push(head);
  }
  
  grow() {
  	let head = this.body[this.body.length-1].copy();
    this.len++;
    this.body.push(head);
  }
  
  endGame() {
  	let x = this.body[this.body.length-1].x;
    let y = this.body[this.body.length-1].y;
    if(x > w-1 || x < 0 || y > h-1 || y < 0) {
       return true;
    }
    for(let i = 0; i < this.body.length-1; i++) {
    	let part = this.body[i];
      if(part.x == x && part.y == y) {
      	return true;
      }
    }
    return false;
  }
  
  eat(pos) {
    this.score++;
  	let x = this.body[this.body.length-1].x;
    let y = this.body[this.body.length-1].y;
    if(x == pos.x && y == pos.y) {
      this.grow();
      return true;
    }
    return false;
  }
  

  think(food) {
    let inputs = [];
    inputs[0] = this.y / height;
    inputs[1] = food.y / height;
    inputs[2] = food.x / width;
    inputs[3] = this.x / width;
    inputs[4] = this.len;
    let output = this.brain.predict(inputs);
    let choice = Math.max(output[0], output[1], output[2], output[3]);
   // console.log(choice, output);
    switch(choice) {
      case output[0]: snake.setVelocity(-1, 0); break;
      case output[1]: snake.setVelocity(1, 0); break;
      case output[2]: snake.setVelocity(0, -1); break;
      case output[3]: snake.setVelocity(0, 1); break;
    }
  }

  show() {
  	for(let i = 0; i < this.body.length; i++) {
    	fill(0);
      noStroke();
      rect(this.body[i].x, this.body[i].y, 1, 1)
    }
  }

}