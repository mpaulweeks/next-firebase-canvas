
class DrawingBoard {
  constructor() {
    // setup canvas
    this.canvas = document.getElementById('my-canvas');
    this.canvas.width = 600;
    this.canvas.height = 400;
    this.ctx = this.canvas.getContext('2d');

    this.setupMouse();
    this.setupErase();
  }

  // helper functions
  getPoint(event) {
    let rect = event.target.getBoundingClientRect();
    let x = event.clientX - rect.left; // x position within the element
    let y = event.clientY - rect.top;  // y position within the element
    return {x, y};
  }

  setupMouse() {
    // keep track of mouse dragging
    let mouseDown = false;
    let lastPoint = undefined;
    document.body.addEventListener('mousedown', (event) => {
      mouseDown = true;
      lastPoint = this.getPoint(event);
    });
    document.body.addEventListener('mouseup', () => {
      mouseDown = false;
      lastPoint = undefined;
    });

    // draw lines between mouse movements
    this.canvas.addEventListener('mousemove', (event) => {
      if (mouseDown) {
        let currPoint = this.getPoint(event);
        if (lastPoint) {
          this.ctx.strokeStyle = 'black';
          this.ctx.beginPath();
          this.ctx.moveTo(lastPoint.x, lastPoint.y);
          this.ctx.lineTo(currPoint.x, currPoint.y);
          this.ctx.closePath();
          this.ctx.stroke();
        }
        lastPoint = currPoint;
      }
    });
  }

  setupErase() {
    // listen for erase button
    document.getElementById('clear').addEventListener('click', () => {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    });
  }

  toImageData() {
    return this.canvas.toDataURL();
  }
}

class CanvasManager {
  constructor() {
    this.myId = Math.floor(Math.random() * 1000000);
    this.myCanvas = new DrawingBoard();
    this.otherCanvases = {};
  }
  getMyData() {
    return {
      id: this.myId,
      image: this.myCanvas.toImageData(),
    }
  }
  updateRemoteCanvas(data) {
    let { id, image } = data;
    if (id === this.myId) {
      return;
    }
    let canvas = this.otherCanvases[id];
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 400;
      document.body.appendChild(canvas);
      this.otherCanvases[id] = canvas;
    }
    let ctx = canvas.getContext('2d');
    let imgObj = new Image();
    imgObj.onload = () => {
      ctx.drawImage(imgObj, 0, 0);
    };
    imgObj.src = image;
  }
  removeRemoteCanvas(data) {
    let { id } = data;
    if (id === this.myId) {
      return;
    }
    let canvas = this.otherCanvases[id];
    if (canvas) {
      canvas.remove();
    }
  }
}
