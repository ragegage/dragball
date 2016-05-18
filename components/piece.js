function Piece(startPos, size, color){
  this.pos = startPos
  this.size = size
  this.xVel = 0
  this.yVel = 0
  this.color = color
  this.selected = false
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
  if(this.selected)
    this.drawSelected(ctx)

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

Piece.prototype.drawSelected = function (ctx) {
  ctx.fillStyle = "yellow";
  ctx.beginPath();

  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.size + 10,
    0,
    2 * Math.PI,
    false
  );

  ctx.fill();
};

Piece.prototype.select = function () {
  this.selected = true
};

Piece.prototype.unselect = function () {
  this.selected = false
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
  if( Math.pow((pointPos[0] - this.pos[0]), 2) +
      Math.pow((pointPos[1] - this.pos[1]), 2) <
      Math.pow(this.size, 2) )
    return this
};

Piece.prototype.setVector = function (vector) {
  this.xVel = vector[0]
  this.yVel = vector[1]
};

//tracks velocity & friction

export default Piece
