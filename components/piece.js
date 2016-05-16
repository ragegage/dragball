const PIECE_SIZE = 50

function Piece(startPos){
  this.pos = startPos
  this.size = PIECE_SIZE
  this.xVel = 0
  this.yVel = 0
}

//tracks velocity & friction
