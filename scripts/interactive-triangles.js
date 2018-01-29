(function () {
  const canvas = document.getElementById('canvas');
  const canvasWidth = document.getElementById('main').offsetWidth;
  const canvasHeight = window.innerHeight - document.getElementById('navigation').offsetHeight;
  const canvasCenter = {
    x: canvasWidth / 2,
    y: canvasHeight / 2
  };

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const maxSize = 20;

  let mouse = {
    x: undefined,
    y: undefined
  }

  const c = canvas.getContext('2d');

  window.addEventListener('mousemove', function (e) {
    mouse.x = e.x;
    mouse.y = e.y;
  })

  window.addEventListener('mouseout', function (e) {
    mouse.x = undefined;
    mouse.y = undefined;
  })

  class Shape {
    constructor(x, y, dx, dy, size) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.size = size;
      this.maxSize = size * 8;
      this.minSize = size;
    }

    draw() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fill();
    }

    update() {
      if (this.x + this.size > canvasWidth || this.x - this.size < 0) {
        this.dx = -this.dx;
      }
      if (this.y + this.size > canvasHeight || this.y - this.size < 0) {
        this.dy = -this.dy;
      }
      this.x += this.dx;
      this.y += this.dy;

      if (
        mouse.x - this.x < 50 &&
        mouse.x - this.x > -50 &&
        mouse.y - this.y < 50 &&
        mouse.y - this.y > -50 &&
        this.size < this.maxSize
      ) {
        this.size += 1;
        console.log(this.size);
      } else if (this.size > this.minSize) {
        // console.log(`${mouse.x} ${this.x}`)
        // this.radius -= 1;
      }

      this.draw();
    }

  }

  class Dot extends Shape {
    constructor(x, y, dx, dy, size) {
      super(x, y, dx, dy, size);
      this.radius = this.size / 8;
    }
    draw() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = 'rgb(0, 70, 183)';
      c.fill();
    }
  }

  class Triangle extends Shape {
    constructor(x, y, dx, dy, size) {
      super(x, y, dx, dy, size);
      this.left = 4 + Math.random() * (this.size - 10);
      this.right = 1 + Math.random() * (this.size - 10);
    }

    draw() {
      c.beginPath();
      c.fillStyle = 'rgba(109, 0, 183,.15)';
      c.moveTo(this.x, this.y);
      c.lineTo(this.x + this.left, this.y - this.left);
      c.lineTo(this.x + this.left, this.y + this.right);
      c.lineTo(this.x, this.y);
      c.fill();
    }
  }
  var triangleArray = [];
  for (var i = 1; i < 160; i++) {
    var x = Math.random() * (canvasWidth - maxSize * 2) + maxSize;
    var y = Math.random() * (canvasHeight - maxSize * 2) + maxSize;
    var dx = (Math.random() + -0.5) * 4;
    var dy = (Math.random() + -0.5) * 4;
    triangleArray.push(new Triangle(x, y, dx, dy, maxSize));
  }

  for (let i = 0; i < triangleArray.length; i++) {
    triangleArray[i].draw();
  }
  var dotArray = [];
  for (var i = 1; i < 760; i++) {
    var x = Math.random() * (canvasWidth - maxSize * 2) + maxSize;
    var y = Math.random() * (canvasWidth - maxSize * 2) + maxSize;
    var dx = Math.random() + -0.5;
    var dy = Math.random() + -0.5;
    dotArray.push(new Dot(x, y, dx, dy, maxSize));
  }

  for (let i = 0; i < triangleArray.length; i++) {
    dotArray[i].draw();
  }

  function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvasWidth, canvasHeight);
    for (let i = 0; i < triangleArray.length; i++) {
      triangleArray[i].update();
    }
    for (let i = 0; i < dotArray.length; i++) {
      dotArray[i].update();
    }
  }

  animate();
})();

// export default class InteractiveTriangles {
//   constructor(c, amount, maxSize) {
//     this.c = c;
//     this.amount = amount;
//     this.maxSize = maxSize;
//   }

//   generate(Shape) {
//     let shapeArray = [];
//     var x = Math.random() * canvasWidth - maxSize;
//     var y = Math.random() * canvasHeight - maxSize;
//     var dx = 1 + (Math.random() + -0.5) * 4;
//     var dy = 1 + (Math.random() + -0.5) * 4;
//     shapeArray.push(new Shape(x, y, dx, dy, maxSize))
//     return shapeArray;
//   }

//   init(...shapes) {
//     [...shapes].forEach(shapeArray => {
//       for (let i = 0; i < shapeArray.length; i++) {
//         shapeArray[i].draw();
//       }
//     })
//   }

//   animate(...shapes) {
//     requestAnimationFrame(this.animate);
//     c.clearRect(0, 0, canvasWidth, canvasHeight);
//     [...shapes].forEach(shapeArray => {
//       for (let i = 0; i < shapeArray.length; i++) {
//         shapeArray[i].update();
//       }
//     })
//   }
// }
