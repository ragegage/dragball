function Piece(startPos, size, color){
  this.pos = startPos
  this.size = size
  this.xVel = Math.floor((Math.random() * 20) - 29);
  this.yVel = Math.floor((Math.random() * 20) - 29);
  this.color = color
}

Piece.prototype.getPos = function () {
  return this.pos
};

Piece.prototype.move = function () {
  this.pos[0] += this.xVel
  this.pos[1] += this.yVel
  this.decelerate()
};

Piece.prototype.decelerate = function () {
  if (this.xVel > 0)
    this.xVel -= .01 * this.xVel
  else if (this.xVel < 0)
    this.xVel += -.01 * this.xVel

  if (this.xVel < .1 && this.xVel > -.1)
    this.xVel = 0

  if (this.yVel > 0)
    this.yVel -= .01 * this.yVel
  else if (this.yVel < 0)
    this.yVel += -.01 * this.yVel

  if (this.yVel < .1 && this.yVel > -.1)
    this.yVel = 0

};

Piece.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();

  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.size,
    0,
    2 * Math.PI,
    false
  );

  ctx.fill();
};

Piece.prototype.bounceX = function () {
  this.xVel *= -1
};

Piece.prototype.bounceY = function () {
  this.yVel *= -1
};

Piece.prototype.isStopped = function () {
  return this.xVel === 0 && this.yVel === 0
};

Piece.prototype.containsPoint = function (pointPos) {
  return Math.pow((pointPos[0] - this.pos[0]), 2) +
  Math.pow((pointPos[1] - this.pos[1]), 2) <
  Math.pow(this.size, 2)
};

//tracks velocity & friction

export default Piece
