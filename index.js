canvas = document.getElementById("canvas")
ctx = canvas.getContext("2d")

var cx = 50
var cy = 50
var size = 50
var color = "hsl(" + Math.floor(Math.random() * 255)  + ", 100%, 50%)"
mirrorXAxis = false
mirrorYAxis = false
jitteredMode = false
var springMode = false

ctx.fillRect(0, 0, 500, 500)

function draw(cx, cy, size, color) {
  var gradient = ctx.createRadialGradient(cx, cy, size, cx, cy, 0);
  gradient.addColorStop(0, 'transparent');
  gradient.addColorStop(1, color);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 500, 500);
}

// 1)FINAL STEP - make this phonegap
// 2) make a screencapture button that ignores mouse and buttons and just photos display
// 3) make same for video
/////////////////////////
// 2) offset the circle by a random x & y each time your draw.
//     (0 - 50) - DONE
// 3) change the color to be random - DONE :D
// 4) mirrorrrrrrr - DONE :D
// 5) make a button for the mirror and axis - DONE :D

totalDistance = 0

var mouseX = 250;
var mouseY = 250;
var paintX = 250;
var paintY = 250;
var velocityX = 0;
var velocityY = 0;
function animateSpring() {
  if (!springMode) return;
  var dx = (paintX - mouseX)
  var dy = (paintY - mouseY)
  velocityX -= dx / 100;
  velocityY -= dy / 100;
  velocityY *= .95;
  velocityX *= .95;
  paintX += velocityX;
  paintY += velocityY;
  //paintX -= dx / 20;
  //paintY -= dy / 20;
  requestAnimationFrame(animateSpring)

  var drawX = paintX;
  var drawY = paintY;
  if (jitteredMode === true) {
    drawX +=  (Math.random() * 50 - 25)
    drawY += (Math.random() * 50 - 25)
  }
  smoothDraw(drawX, drawY, velocityX, velocityY)
  
  if (mirrorXAxis === true) {
    smoothDraw(500-drawX, drawY, -velocityX, velocityY)
  } if (mirrorYAxis === true) {
    smoothDraw(drawX, 500-drawY, velocityX, -velocityY)
  } if (mirrorXAxis === true && mirrorYAxis === true) {
    smoothDraw(500-drawX, 500-drawY, -velocityX, -velocityY)
  }
}
animateSpring();

canvas.onmousemove = function (event) {
  if (springMode) {
    mouseX = event.clientX;
    mouseY = event.clientY;
    return;
  }
  if (jitteredMode === true) {
    var x = event.clientX + (Math.random() * 50 - 25)
    var y = event.clientY + (Math.random() * 50 - 25)
  } else {
    var x = event.clientX + (Math.random())
    var y = event.clientY + (Math.random())
  }
  
  smoothDraw(x, y, event.movementX, event.movementY)
  
  if (mirrorXAxis === true) {
    smoothDraw(500-x, y, -event.movementX, event.movementY)
  } if (mirrorYAxis === true) {
    smoothDraw(x, 500-y, event.movementX, -event.movementY)
  } if (mirrorXAxis === true && mirrorYAxis === true) {
    smoothDraw(500-x, 500-y, -event.movementX, -event.movementY)
  }

}

function mirrorX() {
  if (mirrorXAxis === true) {
    mirrorXAxis = false
  } else if (mirrorXAxis === false) {
    mirrorXAxis = true
  }
}

function mirrorY() {
  if (mirrorYAxis === true) {
    mirrorYAxis = false
  } else if (mirrorYAxis === false) {
    mirrorYAxis = true
  }
}

function jittered() {
  if (jitteredMode === true) {
    jitteredMode = false
  } else if (jitteredMode === false) {
    jitteredMode = true
  }
}

function startBouncing() {
  if (springMode === true) {
    springMode = false
  } else if (springMode === false) {
    springMode = true
    animateSpring()
  }
}

function smoothDraw(x, y, movementX, movementY) {
  var speed = Math.abs(movementX) + Math.abs(movementY)
  var distance = Math.sqrt(movementX * movementX + movementY * movementY)
  
  console.log(totalDistance)
  
  if (totalDistance % 10 === 0) {
    color = "hsl(" + Math.floor(Math.random() * 255)  + ", 100%, 50%)"
  }
  
  if (distance > 10 && jitteredMode === false) {
    var steps = Math.floor(distance / 3);
    for (var i=0; i<steps; i++) {
      var dx = movementX / steps * i;
      var dy = movementY / steps * i;
      draw(x + dx, y + dy, 20+speed, color)
    }
  } else {
    draw(x, y, 20+speed, color)
  }
  
  if (jitteredMode === true) {
    var steps = Math.floor(distance / 2);
    for (var i=0; i<steps; i++) {
      var dx = movementX / steps * i;
      var dy = movementY / steps * i;
      draw(x + dx, y + dy, 20+speed, color)
    }
  }
  
  totalDistance += 1
}