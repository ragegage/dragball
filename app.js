import Board from './components/board'

//initialize board with player/s
function App(){
  this.board = new Board('red', 'blue')
}


// for testing
window.App = App
