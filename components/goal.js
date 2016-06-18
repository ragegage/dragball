function Goal(team, pos, size){
  this.team = team
  this.pos = pos
  this.size = size;
}

Goal.prototype.isGoal = function (ball) {
  return (Math.abs(ball.getPos()[0] - this.pos[0]) < ball.size &&
    Math.abs(ball.getPos()[1] - this.pos[1]) < ball.size + this.size)
}

Goal.prototype.covers = function (yPos) {
  return this.pos[1] - (this.size/2) < yPos
    && this.pos[1] + (this.size/2) > yPos
};

export default Goal
