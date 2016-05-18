import Piece from './piece'
import Ball from './ball'

const BOARD_WIDTH = 600
const BOARD_HEIGHT = 400

const PIECE_SIZE = 25
const BALL_SIZE = 10

function Board(team1, team2){
  this.team1 = team1
  this.team2 = team2
  this.width = BOARD_WIDTH
  this.height = BOARD_HEIGHT
  //this.ball = new Ball([BOARD_WIDTH/2, BOARD_HEIGHT/2], BALL_SIZE)
  this.pieces = this.populatePieces()
}

Board.prototype.populatePieces = function () {
  let pieces = []
  pieces.push(new Piece([BOARD_WIDTH/2, BOARD_HEIGHT/2], PIECE_SIZE, this.team1))
  pieces.push(new Piece([100, 100], PIECE_SIZE, this.team2))

  return pieces
};

Board.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
  // this.checkForWin();
};

Board.prototype.moveObjects = function () {
  this.allObjects().forEach( object => object.move() );
};

Board.prototype.allObjects = function() {
  return this.pieces//.concat(this.ball);
};

Board.prototype.checkCollisions = function () {
  let self = this
  //checks all objects to see if they've collided with another object or the walls
    //updates velocities appropriately
  // this.allObjects().forEach( function(object1) {
  //   this.allObjects().forEach ( object2 => this.isCollided(object1, object2) )
  // })

  //wall collisions
  this.allObjects().forEach( object => this.handleWallBounces(object) );
};

Board.prototype.handleWallBounces = function (obj) {
  let objPos = obj.getPos()
  if (objPos[0] < 0 + PIECE_SIZE)
    obj.bounceX()
  if (objPos[1] < 0 + PIECE_SIZE)
    obj.bounceY()

  if (objPos[0] > BOARD_WIDTH - PIECE_SIZE)
    obj.bounceX()
  if (objPos[1] > BOARD_HEIGHT - PIECE_SIZE)
    obj.bounceY()

};

Board.prototype.checkForWin = function () {
  //checks ball to see if it is in the goal
};

Board.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
  this.allObjects().forEach( object => object.draw(ctx) );
};

Board.prototype.turnFinished = function () {
  return this.allObjects().every( obj => obj.isStopped() )
};

Board.prototype.getClicked = function (pos) {
  // debugger
  if (this.turnFinished())
    return this.allObjects().filter( obj => obj.containsPoint(pos) )
  else return []
};

// tracks collisions
  // incl. out-of-bounds/off-the-walls
// tracks goals

export default Board
