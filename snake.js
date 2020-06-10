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

    this.lifespan = 400;
    this.age = 0;
    this.score = 0;
    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(14, floor(random(10,16)), 4); //x,y head, x,y food, len
    }
  }
  
  foodLocation() {
    let x = floor(random(w/rez-1))*rez;
    let y = floor(random(h/rez-1))*rez;
    for(let i = 0; i < this.body.length-1; i++) {
      let part = this.body[i];
      if(part.x==x && part.y == y)
        return this.foodLocation();
      else 
        return createVector(x, y);
    } 
    
  
  }

  dispose() {
    this.brain.dispose();
  }

  mutate() {
    this.brain.mutate(0.50);
  }

  setVelocity(x, y) {
    if(Math.abs(x - this.xVelocity) != 2*rez &&  Math.abs(y - this.yVelocity) != 2*rez) {
      this.xVelocity = x;
      this.yVelocity = y;
    }
  }
  
  update() {
    this.lifespan--;
    let head = this.body[this.body.length-1].copy();
    if(this.prevDist > dist(head.x, head.y, this.food.x, this.food.y)) {
      this.score++;
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
    this.score+=1000;
    this.lifespan=400;
  	let head = this.body[this.body.length-1].copy();
    this.len++;
    this.body.push(head);
  }
  
  endGame() {
  	let x = this.body[this.body.length-1].x;
    let y = this.body[this.body.length-1].y;
    if(x > w-1 || x < 0 || y > h-1 || y < 0) {
      this.score-=1000;
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
      this.grow();
      return true;
    }
    return false;
  }
  
  checkTail(direction) {
    let part;
    let head = this.body[this.body.length-1].copy();
    switch (direction) {
      case 0: 
      for(let i = 0; i < this.body.length-1; i++) {
        part = this.body[i];
        if(part!=head && head.x==part.x && head.y+rez==part.y) {
          return false;
        }
      }
      return true;
      case 1:
      for(let i = 0; i < this.body.length-1; i++) {
        part = this.body[i];
        if(part!=head && head.x==part.x && head.y-rez==part.y) {
          return false;
        }
      }
      return true;
      case 2:
      for(let i = 0; i < this.body.length-1; i++) {
          part = this.body[i];
        if(part!=head && head.y==part.y && head.x+rez==part.x) {
          return false;
        }
      }
      return true;
      case 3:
      for(let i = 0; i < this.body.length-1; i++) {
          part = this.body[i];
        if(part!=head && head.y==part.y && head.x-rez==part.x) {
          return false;
        }
      }
      return true;
    }
  }

  think() {
    let inputs = [];
    let head = this.body[this.body.length-1].copy();

    //food general location
    inputs[0] = this.food.y < head.y;
    inputs[1] = this.food.x < head.x;
    inputs[2] = this.food.x > head.x;
    //wall/tails
    inputs[3] = head.y < h+rez && this.checkTail(0); 
    inputs[4] = head.y > rez && this.checkTail(1);
    inputs[5] = head.x < w-rez && this.checkTail(2);
    inputs[6] = head.x > rez && this.checkTail(3);
    //locational data
    inputs[8] = w - head.x;
    inputs[9] = h - head.y;
    inputs[10] = head.x;
    inputs[11] = head.y;
    inputs[12] = this.food.x;
    inputs[13] = this.food.y;


    let output = this.brain.predict(inputs);
    let choice = Math.max(output[0], output[1], output[2], output[3]);
    switch(choice) {
      case output[0]: this.setVelocity(-rez, 0); break;
      case output[1]: this.setVelocity(rez, 0); break;
      case output[2]: this.setVelocity(0, -rez); break;
      case output[3]: this.setVelocity(0, rez); break;
    }
  }

  show() {
  	for(let i = 0; i < this.body.length; i++) {
      stroke(51)
      strokeWeight(1);
      fill(this.r, this.g, this.b);
      rect(this.body[i].x, this.body[i].y, rez, rez)
    }
  }

}