class Snake {
  constructor() {
    this.body = [];
    this.body[0] = createVector(floor(w/2), floor(h/2));
    this.len = 1;
    this.xVelocity;
    this.yVelocity;
  }

  setVelocity(x, y) {
    this.xVelocity = x;
    this.yVelocity = y;
  }

  update() {

  }

  show() {

  }
}