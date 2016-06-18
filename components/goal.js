function Goal(team, pos, size){
  this.team = team
  this.pos = pos
  this.size = size;
  this.color = "yellow"
}

Goal.prototype.isGoal = function (ball) {
  return this.yCovers(ball.pos[1])
    && this.xCovers(ball.pos[0])
}

Goal.prototype.yCovers = function (yPos) {
  return this.pos[1] < yPos
    && this.pos[1] + this.size > yPos
}

Goal.prototype.xCovers = function (xPos) {
  return this.pos[0] === 0 ? this.pos[0] + 50 > xPos : this.pos[0] < xPos
};

Goal.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color
  ctx.beginPath()

  ctx.rect(this.pos[0],this.pos[1],50,this.size);

  ctx.fill()
}

export default Goal
