
// setup canvas
let myCanvas = document.getElementById('my-canvas');
myCanvas.width = 600;
myCanvas.height = 400;
let ctx = myCanvas.getContext('2d');

// helper function
function getPoint(event) {
  let rect = event.target.getBoundingClientRect();
  let x = event.clientX - rect.left; // x position within the element
  let y = event.clientY - rect.top;  // y position within the element
  return {x, y};
}

// keep track of mouse dragging
let mouseDown = false;
let lastPoint = undefined;
document.body.addEventListener('mousedown', (event) => {
  mouseDown = true;
  lastPoint = getPoint(event);
});
document.body.addEventListener('mouseup', () => {
  mouseDown = false;
  lastPoint = undefined;
});

// draw lines between mouse movements
myCanvas.addEventListener('mousemove', (event) => {
  if (mouseDown) {
    let currPoint = getPoint(event);
    if (lastPoint) {
      ctx.strokeStyle = 'black';
      ctx.beginPath();
      ctx.moveTo(lastPoint.x, lastPoint.y);
      ctx.lineTo(currPoint.x, currPoint.y);
      ctx.closePath();
      ctx.stroke();
    }
    lastPoint = currPoint;
  }
});

// listen for erase button
document.getElementById('clear').addEventListener('click', () => {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);
})
