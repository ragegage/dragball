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

    // one piece has to be at rest (v = 0)
      //set one piece as reference, calculate other piece's v relative to that
    this.subtractVectors(obj1.getVector(), obj2.getVector())


    // let vectorRatio = obj1.getVector()[1] / obj1.getVector()[0]
    // let positionRatio = (obj2.getPos()[1] - obj1.getPos()[1]) /
    //                       (obj2.getPos()[0] - obj1.getPos()[0])
    //
    // debugger
    if(obj1.xVel === 0){
      obj1.setVector(obj2.getVector())
      obj2.setVector([0,0])
    } else {
      obj2.setVector(obj1.getVector())
      obj1.setVector([0,0])
    }
  }
};

Board.prototype.distanceBetween = function (pos1, pos2) {
  let sqr = Math.pow(pos2[0] - pos1[0], 2) + Math.pow(pos2[1] - pos1[1], 2)
  return Math.sqrt(sqr)
};

Board.prototype.handleWallBounces = function (obj) {
  let objPos = obj.getPos()
  if (objPos[0] < 0 + PIECE_SIZE){
    obj.bounceX()
    obj.setX(PIECE_SIZE)
  }
  if (objPos[1] < 0 + PIECE_SIZE){
    obj.bounceY()
    obj.setY(PIECE_SIZE)
  }

  if (objPos[0] > BOARD_WIDTH - PIECE_SIZE){
    obj.bounceX()
    obj.setX(BOARD_WIDTH - PIECE_SIZE)
  }
  if (objPos[1] > BOARD_HEIGHT - PIECE_SIZE){
    obj.bounceY()
    obj.setY(BOARD_HEIGHT - PIECE_SIZE)
  }

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


Board.prototype.exchangeMomentum = function (obj1, obj2) {
  var velDiff1 = this.subtractCoords(obj1.getVector(), obj2.getVector()),
      locDiff1 = this.subtractCoords(obj1.getPos(), obj2.getPos()),
      radMagSq = Math.pow(this.magnitudeOf(locDiff1),2),
      velDiff2 = this.negativeCoords(velDiff1),
      locDiff2 = this.negativeCoords(locDiff1),
      coef = this.dotProduct(velDiff1,locDiff1) / radMagSq;

  obj1.setVector = this.subtractCoords(obj1.vel, this.scaleCoords(coef, locDiff1));
  obj2.setVector = this.subtractCoords(obj2.vel, this.scaleCoords(coef, locDiff2));
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
