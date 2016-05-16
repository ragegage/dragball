const BOARD_WIDTH = 600
const BOARD_HEIGHT = 400

const PIECE_SIZE = 50
const BALL_SIZE = 20

function Board(team1, team2){
  this.team1 = team1
  this.team2 = team2
  this.width = BOARD_WIDTH
  this.height = BOARD_HEIGHT
  //this.ball = new Ball([BOARD_WIDTH/2, BOARD_HEIGHT/2], BALL_SIZE)
  this.pieces = this.populatePieces()
}

Board.prototype.populatePieces = function () {
  return [new Piece([BOARD_WIDTH/2, BOARD_HEIGHT/2], PIECE_SIZE)]
};

// tracks collisions
  // incl. out-of-bounds/off-the-walls
// tracks goals
