class Snake {
  
  constructor(brain) {
  	this.body = [];
    this.body[0] = createVector(floor(w/2), floor(h/2));
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.len = 1;
    this.grow();
    this.prevDist = 10000;
    this.r = floor(random(255));
    this.g = floor(random(255));
    this.b = floor(random(255));

    this.food = this.foodLocation();

    this.lifespan = 200;
    this.age = 0;
    this.score = 0;
    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(6, 24, 4); //x,y head, x,y food, len
    }
  }
  
  foodLocation() {
    let x = floor(random(w));
    let y = floor(random(h));
    return createVector(x, y);
  
  }

  dispose() {
    this.brain.dispose();
  }

  mutate() {
    this.brain.mutate(0.13);
  }

  setVelocity(x, y) {
    if(Math.abs(x - this.xVelocity) != 2 &&  Math.abs(y - this.yVelocity) != 2) {
      this.xVelocity = x;
      this.yVelocity = y;
    }
  }
  
  update() {
    this.age++;
    let head = this.body[this.body.length-1].copy();
    if(this.prevDist > dist(head.x, head.y, this.food.x, this.food.y)) {
      this.score++;
    } else { 
      this.score-=1.5;
    }
    this.prevDist = dist(head.x, head.y, this.food.x, this.food.y);
    this.body.shift();
    head.x += this.xVelocity;
    head.y += this.yVelocity;
    this.body.push(head);
  }
  
  grow() {
    this.food = this.foodLocation();
    this.prevDist = 1000;
    this.score+=100*this.len;
    this.lifespan+=100;
  	let head = this.body[this.body.length-1].copy();
    this.len++;
    this.body.push(head);
  }
  
  endGame() {
  	let x = this.body[this.body.length-1].x;
    let y = this.body[this.body.length-1].y;
    if(x > w-1 || x < 0 || y > h-1 || y < 0) {
      this.score-=30;
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
  
  eat() {
  	let x = this.body[this.body.length-1].x;
    let y = this.body[this.body.length-1].y;
   
    if(x == this.food.x && y == this.food.y) {
      console.log('EAting');
      this.grow();
      return true;
    }
    return false;
  }
  

  think() {
    let inputs = [];
    let head = this.body[this.body.length-1].copy();

    //right - food, wall, tail
    inputs[0] = this.food.y < head.y;
    inputs[1] = this.food.x < head.x;
    inputs[2] = this.food.x > head.x;
    //up
    inputs[3] = head.y < h-1;
    //left
    inputs[4] = head.x < w-1;
    //dow
    inputs[5] = head.x > 0;
    let output = this.brain.predict(inputs);
    let choice = Math.max(output[0], output[1], output[2], output[3]);
    switch(choice) {
      case output[0]: this.setVelocity(-1, 0); break;
      case output[1]: this.setVelocity(1, 0); break;
      case output[2]: this.setVelocity(0, -1); break;
      case output[3]: this.setVelocity(0, 1); break;
    }
  }

  show() {
  	for(let i = 0; i < this.body.length; i++) {
      noStroke();
      fill(this.r, this.g, this.b);
      rect(this.body[i].x, this.body[i].y, 1, 1)
    }
  }

}