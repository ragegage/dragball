import Board from './board'
import ClickHandler from '../utils/click_handler'

//initialize board with player/s
function View(ctx){
  this.board = new Board('red', 'blue')
  this.ctx = ctx
  this.ch = new ClickHandler(this)
}

View.prototype.run = function () {
  if(this.board.turnFinished()){
    let s = prompt("new speed")
  } else {
    this.step()
  }
};

View.prototype.step = function () {
  this.board.step();
  this.board.draw(this.ctx);

  requestAnimationFrame(this.run.bind(this));
};

View.prototype.onClick = function (pos) {
  let selectedPiece = this.board.getClicked(pos)[0]
  debugger
  if (selectedPiece)
    console.log("clicked!");
};

export default View
