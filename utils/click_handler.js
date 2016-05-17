function ClickHandler(view){
  this.view = view
  this.addListeners()
}

ClickHandler.prototype.addListeners = function () {
  document.addEventListener("mousedown", this.processMouseDown.bind(this), false)
};

ClickHandler.prototype.processMouseDown = function (e) {
  e.preventDefault()

  this.canvas = this.canvas || document.getElementById('game-canvas')

  let elLocationX = this.canvas.getBoundingClientRect().left
  let elLocationY = this.canvas.getBoundingClientRect().top
  let relativeLocationX = e.pageX - elLocationX
  let relativeLocationY = e.pageY - elLocationY

  let pos = [relativeLocationX, relativeLocationY]
  this.view.onClick(pos)
};

export default ClickHandler

// window.ClickHandler = ClickHandler
