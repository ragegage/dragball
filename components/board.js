import Piece from './piece'
import Ball from './ball'
import Goal from './goal'

const BOARD_WIDTH = 500
const BOARD_HEIGHT = 400

const PIECE_SIZE = 25
const BALL_SIZE = 10

function Board(team1, team2){
  this.team1 = team1
  this.team2 = team2
  this.width = BOARD_WIDTH
  this.height = BOARD_HEIGHT
  this.offset = 50
  this.populate()
}

Board.prototype.populate = function () {
  this.ball = new Ball([400, 250], BALL_SIZE)
  this.pieces = this.populatePieces()
  this.goal1 = new Goal(this.team1, [0, 250], 400)
  this.goal2 = new Goal(this.team2, [500, 250], 400)
};

Board.prototype.populatePieces = function () {
  let pieces = []
  pieces.push(new Piece([100, 100], PIECE_SIZE, this.team1))
  pieces.push(new Piece([100, 200], PIECE_SIZE, this.team1))
  pieces.push(new Piece([100, 300], PIECE_SIZE, this.team1))
  pieces.push(new Piece([500, 100], PIECE_SIZE, this.team2))
  pieces.push(new Piece([500, 200], PIECE_SIZE, this.team2))
  pieces.push(new Piece([500, 300], PIECE_SIZE, this.team2))

  return pieces
}

Board.prototype.step = function () {
  this.moveObjects()
  this.checkCollisions()
  this.checkForWin();
}

Board.prototype.moveObjects = function () {
  this.allObjects().forEach( object => object.move() )
}

Board.prototype.allObjects = function() {
  return this.pieces.concat(this.ball)
}

Board.prototype.checkCollisions = function () {
  let self = this
  //checks all objects to see if they've collided with another object or the walls
    //updates velocities appropriately
  this.allObjects().forEach( (object1, i) =>
    this.allObjects().forEach ( (object2, j) =>
      (j > i ? this.isCollided(object1, object2) : null)
    )
  )

  //wall collisions
  this.allObjects().forEach( object => this.handleWallBounces(object) );
}

Board.prototype.subtractCoords = function (v1, v2) {
  return [v1[0] - v2[0], v1[1] - v2[1]]
}

Board.prototype.isCollided = function (obj1, obj2) {
  if (this.distanceBetween(obj1.pos, obj2.pos) < obj1.size + obj2.size){
    this.exchangeMomentum(obj1, obj2)
  }
}

Board.prototype.distanceBetween = function (pos1, pos2) {
  let sqr = Math.pow(pos2[0] - pos1[0], 2) + Math.pow(pos2[1] - pos1[1], 2)
  return Math.sqrt(sqr)
}

Board.prototype.handleWallBounces = function (obj) {
  let objPos = obj.getPos()
  if (objPos[0] < this.offset + obj.size){
    if (obj === this.ball && this.goal1.covers(objPos[1])) {
    } else {
      obj.bounceX()
      obj.setX(this.offset + obj.size)
    }
  }
  if (objPos[1] < 0 + obj.size){
    obj.bounceY()
    obj.setY(obj.size)
  }

  if (objPos[0] > (BOARD_WIDTH + this.offset) - obj.size){
    if (obj === this.ball && this.goal2.covers(objPos[1])) {
    } else {
      obj.bounceX()
      obj.setX((BOARD_WIDTH + this.offset) - obj.size)
    }
  }
  if (objPos[1] > BOARD_HEIGHT - obj.size){
    obj.bounceY()
    obj.setY(BOARD_HEIGHT - obj.size)
  }

}

Board.prototype.checkForWin = function () {
  //checks ball to see if it is in the goal
  if (this.goal1.isGoal( this.ball )){
    alert("team 2 wins")
    this.populate()
  }
  if (this.goal2.isGoal( this.ball )){
    alert("team 1 wins")
    this.populate()
  }
}

Board.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, BOARD_WIDTH + this.offset * 2, BOARD_HEIGHT);
  this.allObjects().forEach( object => object.draw(ctx) );
}

Board.prototype.turnFinished = function () {
  return this.allObjects().every( obj => obj.isStopped() )
}

Board.prototype.getClicked = function (pos) {
  // debugger
  if (this.turnFinished())
    return this.pieces.filter( obj => obj.containsPoint(pos) )
  else return []
}

// tracks collisions
  // incl. out-of-bounds/off-the-walls
// tracks goals


Board.prototype.exchangeMomentum = function (obj1, obj2) {
  var velDiff1 = this.subtractCoords(obj1.getVector(), obj2.getVector()),
      locDiff1 = this.subtractCoords(obj1.getPos(), obj2.getPos()),
      radMagSq = Math.pow(this.magnitudeOf(locDiff1),2),
      velDiff2 = this.negativeCoords(velDiff1),
      locDiff2 = this.negativeCoords(locDiff1),
      coef = this.dotProduct(velDiff1,locDiff1) / radMagSq

  obj1.setVector(this.subtractCoords(obj1.getVector(), this.scaleCoords(coef, locDiff1)))
  obj2.setVector(this.subtractCoords(obj2.getVector(), this.scaleCoords(coef, locDiff2)))
}

Board.prototype.magnitudeOf = function (vector) {
  return Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]);
}

Board.prototype.negativeCoords = function (coord) {
  return [-coord[0], -coord[1]]
}

Board.prototype.dotProduct = function (vector1, vector2) {
  return vector1[0] * vector2[0] + vector1[1] * vector2[1]
}

Board.prototype.scaleCoords = function (factor, coord) {
  return [ factor * coord[0], factor * coord[1] ]
}


export default Board
