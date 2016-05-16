const BOARD_WIDTH = 600
const BOARD_HEIGHT = 400

function Board(team1, team2){
  this.team1 = team1
  this.team2 = team2
  this.width = BOARD_WIDTH
  this.height = BOARD_HEIGHT
}

// tracks collisions
  // incl. out-of-bounds/off-the-walls
// tracks goals
