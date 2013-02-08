
var canvas;
var context;

var objects = [];
var player = null;

function main() {

  for (var y=0; y<mapHeight; y++)
  for (var x=0; x<mapWidth; x++) {
    if (x == 0 || y == 0 || x+1==mapWidth || y+1==mapHeight) {
      setMap({x:x, y:y}, 'wall');
    }
  }

  canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 480;
  document.getElementsByTagName('body')[0].appendChild(canvas);

  context = canvas.getContext('2d');

  setInterval(process, 1000/60);

  player = makeObject({x: 45, y: 45})
  objects.push(player);
}

function process() {
  objects.forEach(function(object) {
    object.process();
  });
  draw();
}

function draw() {
  drawMap();
  drawObjects();
}

function makeObject(pos) {
  var vel = [0, 0];

  function process() {
    pos.x += vel[0] * 10;
    pos.y += vel[1] * 10;
  }
  function draw(context) {
    context.fillStyle = '#000';
    context.fillRect(pos.x, pos.y, tileSize, tileSize);
    context.fillStyle = '#f00';
    context.fillRect(pos.x+1, pos.y+1, tileSize-2, tileSize-2);
  }
  return {draw: draw, process: process, vel: vel};
}

function drawObjects() {
  objects.forEach(function(object) {
    object.draw(context);
  });
}

var keyDirs = {
  87: [0, -1],
  65: [-1, 0],
  83: [0, 1],
  68: [1, 0]
}

function pe(a, b) {
  a[0] += b[0];
  a[1] += b[1];
}

function me(a, b) {
  a[0] -= b[0];
  a[1] -= b[1];
}

onkeydown = function(k) {
  var dir = keyDirs[k.keyCode];
  pe(player.vel, dir);
}

onkeyup = function(k) {
  if (!player) return;
  var dir = keyDirs[k.keyCode];
  me(player.vel, dir);
}
