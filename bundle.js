/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _view = __webpack_require__(1);
	
	var _view2 = _interopRequireDefault(_view);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//initialize board with player/s
	function App() {
	  var ctx = document.getElementById('game-canvas').getContext("2d");
	  this.view = new _view2.default(ctx);
	}
	
	// for testing
	window.App = App;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _board = __webpack_require__(2);
	
	var _board2 = _interopRequireDefault(_board);
	
	var _click_handler = __webpack_require__(3);
	
	var _click_handler2 = _interopRequireDefault(_click_handler);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//initialize board with player/s
	function View(ctx) {
	  this.board = new _board2.default('red', 'blue');
	  this.ctx = ctx;
	  this.ch = new _click_handler2.default(this);
	}
	
	View.prototype.run = function () {
	  this.step();
	};
	
	View.prototype.step = function () {
	  this.board.step();
	  this.board.draw(this.ctx);
	
	  requestAnimationFrame(this.run.bind(this));
	};
	
	View.prototype.onClick = function (pos) {
	  this.selectedPiece = this.board.getClicked(pos)[0];
	  if (this.selectedPiece) this.selectedPiece.select();
	};
	
	View.prototype.onClickRelease = function (pos) {
	  if (this.selectedPiece) {
	    var dx = (this.selectedPiece.pos[0] - pos[0]) / 20;
	    var dy = (this.selectedPiece.pos[1] - pos[1]) / 20;
	    dx = dx > 10 ? 10 : dx;
	    dx = dx < -10 ? -10 : dx;
	    dy = dy > 10 ? 10 : dy;
	    dy = dy < -10 ? -10 : dy;
	    this.selectedPiece.setVector([dx, dy]);
	
	    this.selectedPiece.unselect();
	  }
	};
	
	exports.default = View;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _piece = __webpack_require__(4);
	
	var _piece2 = _interopRequireDefault(_piece);
	
	var _ball = __webpack_require__(5);
	
	var _ball2 = _interopRequireDefault(_ball);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var BOARD_WIDTH = 600;
	var BOARD_HEIGHT = 400;
	
	var PIECE_SIZE = 25;
	var BALL_SIZE = 10;
	
	function Board(team1, team2) {
	  this.team1 = team1;
	  this.team2 = team2;
	  this.width = BOARD_WIDTH;
	  this.height = BOARD_HEIGHT;
	  //this.ball = new Ball([BOARD_WIDTH/2, BOARD_HEIGHT/2], BALL_SIZE)
	  this.pieces = this.populatePieces();
	}
	
	Board.prototype.populatePieces = function () {
	  var pieces = [];
	  pieces.push(new _piece2.default([BOARD_WIDTH / 2, BOARD_HEIGHT / 2], PIECE_SIZE, this.team1));
	  pieces.push(new _piece2.default([100, 100], PIECE_SIZE, this.team2));
	
	  return pieces;
	};
	
	Board.prototype.step = function () {
	  this.moveObjects();
	  this.checkCollisions();
	  // this.checkForWin();
	};
	
	Board.prototype.moveObjects = function () {
	  this.allObjects().forEach(function (object) {
	    return object.move();
	  });
	};
	
	Board.prototype.allObjects = function () {
	  return this.pieces; //.concat(this.ball);
	};
	
	Board.prototype.checkCollisions = function () {
	  var _this = this;
	
	  var self = this;
	  //checks all objects to see if they've collided with another object or the walls
	  //updates velocities appropriately
	  this.allObjects().forEach(function (object1, i) {
	    return _this.allObjects().forEach(function (object2, j) {
	      return j > i ? _this.isCollided(object1, object2) : null;
	    });
	  });
	
	  //wall collisions
	  this.allObjects().forEach(function (object) {
	    return _this.handleWallBounces(object);
	  });
	};
	
	Board.prototype.isCollided = function (obj1, obj2) {
	  if (this.distanceBetween(obj1.pos, obj2.pos) < obj1.size + obj2.size) {
	    if (obj1.xVel === 0) {
	      obj1.setVector(obj2.getVector());
	      obj2.setVector([0, 0]);
	    } else {
	      obj2.setVector(obj1.getVector());
	      obj1.setVector([0, 0]);
	    }
	  }
	};
	
	Board.prototype.distanceBetween = function (pos1, pos2) {
	  var sqr = Math.pow(pos2[0] - pos1[0], 2) + Math.pow(pos2[1] - pos1[1], 2);
	  return Math.sqrt(sqr);
	};
	
	Board.prototype.handleWallBounces = function (obj) {
	  var objPos = obj.getPos();
	  if (objPos[0] < 0 + PIECE_SIZE) obj.bounceX();
	  if (objPos[1] < 0 + PIECE_SIZE) obj.bounceY();
	
	  if (objPos[0] > BOARD_WIDTH - PIECE_SIZE) obj.bounceX();
	  if (objPos[1] > BOARD_HEIGHT - PIECE_SIZE) obj.bounceY();
	};
	
	Board.prototype.checkForWin = function () {
	  //checks ball to see if it is in the goal
	};
	
	Board.prototype.draw = function (ctx) {
	  ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
	  this.allObjects().forEach(function (object) {
	    return object.draw(ctx);
	  });
	};
	
	Board.prototype.turnFinished = function () {
	  return this.allObjects().every(function (obj) {
	    return obj.isStopped();
	  });
	};
	
	Board.prototype.getClicked = function (pos) {
	  // debugger
	  if (this.turnFinished()) return this.allObjects().filter(function (obj) {
	    return obj.containsPoint(pos);
	  });else return [];
	};
	
	// tracks collisions
	// incl. out-of-bounds/off-the-walls
	// tracks goals
	
	exports.default = Board;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function ClickHandler(view) {
	  this.view = view;
	  this.addListeners();
	}
	
	ClickHandler.prototype.addListeners = function () {
	  document.addEventListener("mousedown", this.processMouseDown.bind(this), false);
	  document.addEventListener("mouseup", this.processMouseUp.bind(this), false);
	};
	
	ClickHandler.prototype.processMouseDown = function (e) {
	  e.preventDefault();
	
	  this.canvas = this.canvas || document.getElementById('game-canvas');
	
	  var elLocationX = this.canvas.getBoundingClientRect().left;
	  var elLocationY = this.canvas.getBoundingClientRect().top;
	  var relativeLocationX = e.pageX - elLocationX;
	  var relativeLocationY = e.pageY - elLocationY;
	
	  var pos = [relativeLocationX, relativeLocationY];
	  this.view.onClick(pos);
	};
	
	ClickHandler.prototype.processMouseUp = function (e) {
	  e.preventDefault();
	
	  var elLocationX = this.canvas.getBoundingClientRect().left;
	  var elLocationY = this.canvas.getBoundingClientRect().top;
	  var relativeLocationX = e.pageX - elLocationX;
	  var relativeLocationY = e.pageY - elLocationY;
	
	  var pos = [relativeLocationX, relativeLocationY];
	  this.view.onClickRelease(pos);
	};
	
	exports.default = ClickHandler;
	
	// window.ClickHandler = ClickHandler

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function Piece(startPos, size, color) {
	  this.pos = startPos;
	  this.size = size;
	  this.xVel = 0;
	  this.yVel = 0;
	  this.color = color;
	  this.selected = false;
	}
	
	Piece.prototype.getPos = function () {
	  return this.pos;
	};
	
	Piece.prototype.move = function () {
	  this.pos[0] += this.xVel;
	  this.pos[1] += this.yVel;
	  this.decelerate();
	};
	
	Piece.prototype.decelerate = function () {
	  if (this.xVel > 0) this.xVel -= .01 * this.xVel;else if (this.xVel < 0) this.xVel += -.01 * this.xVel;
	
	  if (this.xVel < .1 && this.xVel > -.1) this.xVel = 0;
	
	  if (this.yVel > 0) this.yVel -= .01 * this.yVel;else if (this.yVel < 0) this.yVel += -.01 * this.yVel;
	
	  if (this.yVel < .1 && this.yVel > -.1) this.yVel = 0;
	};
	
	Piece.prototype.draw = function (ctx) {
	  if (this.selected) this.drawSelected(ctx);
	
	  ctx.fillStyle = this.color;
	  ctx.beginPath();
	
	  ctx.arc(this.pos[0], this.pos[1], this.size, 0, 2 * Math.PI, false);
	
	  ctx.fill();
	};
	
	Piece.prototype.drawSelected = function (ctx) {
	  ctx.fillStyle = "yellow";
	  ctx.beginPath();
	
	  ctx.arc(this.pos[0], this.pos[1], this.size + 10, 0, 2 * Math.PI, false);
	
	  ctx.fill();
	};
	
	Piece.prototype.select = function () {
	  this.selected = true;
	};
	
	Piece.prototype.unselect = function () {
	  this.selected = false;
	};
	
	Piece.prototype.bounceX = function () {
	  this.xVel *= -1;
	};
	
	Piece.prototype.bounceY = function () {
	  this.yVel *= -1;
	};
	
	Piece.prototype.isStopped = function () {
	  return this.xVel === 0 && this.yVel === 0;
	};
	
	Piece.prototype.containsPoint = function (pointPos) {
	  if (Math.pow(pointPos[0] - this.pos[0], 2) + Math.pow(pointPos[1] - this.pos[1], 2) < Math.pow(this.size, 2)) return this;
	};
	
	Piece.prototype.setVector = function (vector) {
	  this.xVel = vector[0];
	  this.yVel = vector[1];
	};
	
	Piece.prototype.getVector = function () {
	  return [this.xVel, this.yVel];
	};
	
	//tracks velocity & friction
	
	exports.default = Piece;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function Ball(startPos, size) {
	  this.pos = startPos;
	  this.size = size;
	  this.xVel = 0;
	  this.yVel = 0;
	}
	
	Ball.prototype.getPos = function () {
	  return this.pos;
	};
	
	//tracks velocity & friction
	
	exports.default = Ball;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map