class Snake {
  
  constructor(brain) {
  	this.body = [];
    this.body[0] = createVector(floor(w/2), floor(h/2));
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.len = 0;

    this.prevDist = 10000;
    this.r = floor(random(255));
    this.g = floor(random(255));
    this.b = floor(random(255));

    this.food = this.foodLocation();

    this.lifespan = 200;
    this.age = 0;
    this.score = 0;
    this.fitness = 0;
    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(24, 36, 4); //x,y head, x,y food, len
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
    this.brain.mutate(0.1);
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
      this.score-=2;
    }
    this.prevDist = dist(head.x, head.y, this.food.x, this.food.y);
    this.body.shift();
    head.x += this.xVelocity;
    head.y += this.yVelocity;
    this.body.push(head);
  }
  
  grow() {
    this.food = this.foodLocation();
    this.score+=1000;
    this.lifespan+=100;
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
    inputs[0] = dist(head.x+1,head.y,this.food.x,this.food.y);
    inputs[1] = dist(head.x+1,head.y,head.x+1,w);
    inputs[2] = dist(head.x+1,head.y,this.body[0].x,this.body[0].y);
    //upper right
    inputs[3] = dist(head.x+1,head.y-1,this.food.x,this.food.y);
    inputs[4] = dist(head.x+1,head.y-1,0,w);
    inputs[5] = dist(head.x+1,head.y-1,this.body[0].x,this.body[0].y);
    //up
    inputs[6] = dist(head.x,head.y-1,this.food.x,this.food.y);
    inputs[7] = dist(head.x,head.y-1,head.y+1,h);
    inputs[8] = dist(head.x,head.y-1,this.body[0].x,this.body[0].y);
    //upper left
    inputs[9] = dist(head.x-1,head.y-1,this.food.x,this.food.y);
    inputs[10] = dist(head.x-1,head.y-1,0,0);
    inputs[11] = dist(head.x-1,head.y-1,this.body[0].x,this.body[0].y);
    //left
    inputs[12] = dist(head.x-1,head.y,this.food.x,this.food.y);
    inputs[13] = dist(head.x-1,head.y,head.x-1,0);
    inputs[14] = dist(head.x-1,head.y,this.body[0].x,this.body[0].y);
    //bottom left
    inputs[15] = dist(head.x-1,head.y+1,this.food.x,this.food.y);
    inputs[16] = dist(head.x-1,head.y+1,0,h);
    inputs[17] = dist(head.x-1,head.y+1,this.body[0].x,this.body[0].y);
    //bottom
    inputs[18] = dist(head.x,head.y+1,this.food.x,this.food.y);
    inputs[19] = dist(head.x,head.y+1,head.x,h);
    inputs[20] = dist(head.x,head.y+1,this.body[0].x,this.body[0].y);
    //bottom right
    inputs[21] = dist(head.x+1,head.y+1,this.food.x,this.food.y);
    inputs[22] = dist(head.x+1,head.y+1,w,h);
    inputs[23] = dist(head.x+1,head.y+1,this.body[0].x,this.body[0].y);

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