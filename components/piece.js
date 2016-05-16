function Piece(startPos, size){
  this.pos = startPos
  this.size = size
  this.xVel = 0
  this.yVel = 0
}

Piece.prototype.getPos = function () {
  return this.pos
};

//tracks velocity & friction

export default Piece
