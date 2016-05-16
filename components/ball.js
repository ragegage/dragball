function Ball(startPos, size){
  this.pos = startPos
  this.size = size
  this.xVel = 0
  this.yVel = 0
}

Ball.prototype.getPos = function () {
  return this.pos
};

//tracks velocity & friction
