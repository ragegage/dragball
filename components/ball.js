const BALL_SIZE = 20

function Ball(startPos){
  this.pos = startPos
  this.size = BALL_SIZE
  this.xVel = 0
  this.yVel = 0
}

//tracks velocity & friction
