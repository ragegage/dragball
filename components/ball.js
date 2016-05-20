function Ball(startPos, size){
  this.pos = startPos
  this.size = size
  this.xVel = 0
  this.yVel = 0
  this.color = "black"
}

Ball.prototype.getPos = function () {
  return this.pos
}

Ball.prototype.setX = function (x) {
  this.pos[0] = x
}

Ball.prototype.setY = function (y) {
  this.pos[1] = y
}

Ball.prototype.move = function () {
  this.pos[0] += this.xVel
  this.pos[1] += this.yVel
  this.decelerate()
}

Ball.prototype.decelerate = function () {
  if (this.xVel > 0)
    this.xVel -= .01 * this.xVel
  else if (this.xVel < 0)
    this.xVel += -.01 * this.xVel

  if (this.xVel < .1 && this.xVel > -.1)
    this.xVel = 0

  if (this.yVel > 0)
    this.yVel -= .01 * this.yVel
  else if (this.yVel < 0)
    this.yVel += -.01 * this.yVel

  if (this.yVel < .1 && this.yVel > -.1)
    this.yVel = 0

}

Ball.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color
  ctx.beginPath()

  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.size,
    0,
    2 * Math.PI,
    false
  )

  ctx.fill()
}

Ball.prototype.bounceX = function () {
  this.xVel *= -1
}

Ball.prototype.bounceY = function () {
  this.yVel *= -1
}

Ball.prototype.isStopped = function () {
  return this.xVel === 0 && this.yVel === 0
}

Ball.prototype.containsPoint = function (pointPos) {
  if( Math.pow((pointPos[0] - this.pos[0]), 2) +
      Math.pow((pointPos[1] - this.pos[1]), 2) <
      Math.pow(this.size, 2) )
    return this
}

Ball.prototype.setVector = function (vector) {
  this.xVel = vector[0]
  this.yVel = vector[1]
}

Ball.prototype.getVector = function () {
  return [this.xVel, this.yVel]
}

//tracks velocity & friction

export default Ball
