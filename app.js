import View from './components/view'

//initialize board with player/s
function App(){
  const ctx = document.getElementById('game-canvas').getContext("2d");
  this.view = new View(ctx)
}


// for testing
window.App = App
