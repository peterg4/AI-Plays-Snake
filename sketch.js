function setup() {
  createCanvas(400, 400);
  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(24);
  snake = new Snake();
  foodLocation();
}


function draw(){
  background(240);
}