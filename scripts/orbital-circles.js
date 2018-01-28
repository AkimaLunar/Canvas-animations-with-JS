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

  var c = canvas.getContext('2d');

  function Circle(orbit, angle, radius, speed) {
    this.orbit = orbit;
    this.angle = angle;
    this.speed = speed;
    this.x = canvasCenter.x + Math.cos(this.angle) * this.orbit;
    this.y = canvasCenter.y + Math.sin(this.angle) * this.orbit;
    this.r = Math.floor(Math.random() * 100);
    this.g = Math.floor(Math.random() * 255);
    this.b = 255;
    this.alpha = Math.random();
    this.dalpha = 0.005;
    this.radius = radius;
    this.draw = function () {
      c.beginPath();
      c.strokeStyle = 'rgba(255,255,255,.8)';
      c.setLineDash([1, 15]);
      c.arc(canvasCenter.x, canvasCenter.y, this.orbit, 0, Math.PI * 2, false);
      c.stroke();

      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = `rgba(${this.r},${this.g},${this.b},${this.alpha})`;
      c.fill();
    }

    this.update = function () {
      if (this.angle > 360) {
        this.angle = 0;
      } else {
        this.angle += this.speed;
      }
      if (this.alpha > 1 ||
        this.alpha < 0) {
        this.dalpha = -this.dalpha;
      }
      this.alpha += this.dalpha;
      this.x = canvasCenter.x + Math.cos(this.angle) * this.orbit;
      this.y = canvasCenter.y + Math.sin(this.angle) * this.orbit;
      this.draw()
    }
  }
  var circleArray = [];
  for (var i = 4; i < 8; i++) {
    var orbit = Math.random() * (canvasCenter.y - 50);
    var angle = Math.floor(Math.random() * 360);
    var radius = 10 + Math.floor(Math.random() * 40);
    var speed = (Math.random() - 0.5) / 100;
    circleArray.push(new Circle(orbit, angle, radius, speed))
  }
  function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvasWidth, canvasHeight);
    for (var i = 0; i < circleArray.length; i++) {
      circleArray[i].update();
    }

  }
  animate();
})();

