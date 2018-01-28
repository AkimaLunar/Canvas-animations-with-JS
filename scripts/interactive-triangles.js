(function () {
  var canvas = document.getElementById('canvas');
  var canvasWidth = document.getElementById('main').offsetWidth;
  var canvasHeight = window.innerHeight - document.getElementById('navigation').offsetHeight;
  var canvasCenter = {
    x: canvasWidth / 2,
    y: canvasHeight / 2
  };
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  var maxSize = 20;
  var mouse = {
    x: undefined,
    y: undefined
  }

  var c = canvas.getContext('2d');

  function Triangle(x, y, dx, dy, maxSize) {
    this.x = x;
    this.y = y;
    this.left = 10 + Math.random() * (maxSize - 10);
    this.right = 1 + Math.random() * (maxSize - 10);
    this.dx = dx;
    this.dy = dy;
    this.draw = function () {
      c.beginPath();
      c.fillStyle = 'rgb(0, 70, 183)';
      c.moveTo(this.x, this.y);
      c.lineTo(this.x + this.left, this.y - this.left);
      c.lineTo(this.x + this.left, this.y + this.right);
      c.lineTo(this.x, this.y);
      c.fill();
    }

    this.update = function () {
      this.x += this.dx;
      this.y += this.dy;
      this.draw();
    }
  }
  var triangleArray = [];
  for (var i = 1; i < 60; i++) {
    var x = Math.random() * canvasWidth - maxSize;
    var y = Math.random() * canvasHeight - maxSize;
    var dx = 1 + (Math.random() + -0.5) * 4;
    var dy = 1 + (Math.random() + -0.5) * 4;
    triangleArray.push(new Triangle(x, y, dx, dy, maxSize));
  }

  for (let i = 0; i < triangleArray.length; i++) {
    triangleArray[i].draw();
  }

  function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvasWidth, canvasHeight);
    for (let i = 0; i < triangleArray.length; i++) {
      triangleArray[i].update();
    }
  }

  animate();
})();
