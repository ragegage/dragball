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
  this.board.step()
  this.board.draw(this.ctx)

  requestAnimationFrame(this.run.bind(this))
};

View.prototype.onClick = function (pos) {
  this.selectedPiece = this.board.getClicked(pos)[0]
  if (this.selectedPiece)
    this.selectedPiece.select()
};

View.prototype.onClickRelease = function (pos) {
  if (this.selectedPiece) {
    let dx = (this.selectedPiece.pos[0] - pos[0]) / 20
    let dy = (this.selectedPiece.pos[1] - pos[1]) / 20
    dx = (dx > 10 ? 10 : dx)
    dx = (dx < -10 ? -10 : dx)
    dy = (dy > 10 ? 10 : dy)
    dy = (dy < -10 ? -10 : dy)
    this.selectedPiece.setVector([dx, dy])
    
    this.selectedPiece.unselect()
  }
};

export default View
