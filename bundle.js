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
	
	var _board = __webpack_require__(1);
	
	var _board2 = _interopRequireDefault(_board);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//initialize board with player/s
	function App() {
	  this.board = new _board2.default('red', 'blue');
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
	
	var _piece = __webpack_require__(2);
	
	var _piece2 = _interopRequireDefault(_piece);
	
	var _ball = __webpack_require__(3);
	
	var _ball2 = _interopRequireDefault(_ball);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var BOARD_WIDTH = 600;
	var BOARD_HEIGHT = 400;
	
	var PIECE_SIZE = 50;
	var BALL_SIZE = 20;
	
	function Board(team1, team2) {
	  this.team1 = team1;
	  this.team2 = team2;
	  this.width = BOARD_WIDTH;
	  this.height = BOARD_HEIGHT;
	  //this.ball = new Ball([BOARD_WIDTH/2, BOARD_HEIGHT/2], BALL_SIZE)
	  this.pieces = this.populatePieces();
	}
	
	Board.prototype.populatePieces = function () {
	  return [new _piece2.default([BOARD_WIDTH / 2, BOARD_HEIGHT / 2], PIECE_SIZE)];
	};
	
	// tracks collisions
	// incl. out-of-bounds/off-the-walls
	// tracks goals
	
	exports.default = Board;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function Piece(startPos, size) {
	  this.pos = startPos;
	  this.size = size;
	  this.xVel = 0;
	  this.yVel = 0;
	}
	
	Piece.prototype.getPos = function () {
	  return this.pos;
	};
	
	//tracks velocity & friction
	
	exports.default = Piece;

/***/ },
/* 3 */
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