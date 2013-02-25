var TILE_SIZE = 16;
var GRID_LINE = 0; // set to 1 for a grid
var X_SIZE = TILE_SIZE - (2 * GRID_LINE);
var Y_SIZE = X_SIZE;

var MAP_WIDTH = 40;
var MAP_HEIGHT = 30;

var map = [];
 
var background = makeImage("img/background.png");
var islands = makeImage("img/island.png");
var bridges = makeImage("img/bridge.png");
var challengeA = makeImage("img/challengeA.png");
var challengeB = makeImage("img/challengeB.png");

function makeImage(src){
	var img = new Image();
	img.src = src;
	return img;
}

function mapIndex(pos) {
  return pos.y * MAP_WIDTH + pos.x;
}

function setMap(pos, tile) {
  map[mapIndex(pos)] = tile;
}

function drawMap(width, height) {
  for (var y=0; y < height; y++)
  for (var x=0; x < width; x++) {

    var cell = map[mapIndex({x:x, y:y})];

    var px = GRID_LINE + x * TILE_SIZE;
    var py = GRID_LINE + y * TILE_SIZE;

	if (GRID_LINE > 0)
		displayBlock('#000', px, py, TILE_SIZE, TILE_SIZE);

    if (cell == 'wall')
	  displayBlock('#af6', px, py, X_SIZE, Y_SIZE);
	else if (cell == 'land')
 	  displayBlock('#0f0', px, py, X_SIZE, Y_SIZE);
	else if (cell == 'pit')
 	  displayBlock('#00f', px, py, X_SIZE, Y_SIZE);
	else
	{
	  //displayBlock('#eee', px, py, X_SIZE, Y_SIZE);
      displayTile(px, py, X_SIZE, Y_SIZE);
	  var pixarr = context.getImageData(px, py, X_SIZE, Y_SIZE).data;
	  if (x == 14 && y == 14){
		  for (i = 0; i < TILE_SIZE; i++)
		  for (j = 0; j < TILE_SIZE; j++){
			  if (pixarr[j][i] == 0)
				setMap({x:x, y:y}, 'land');
		  }
	  }
	  
	}
  }
}

function displayBlock(colour, px, py, xSize, ySize) {
    context.fillStyle = colour;
    context.fillRect(px, py, xSize, ySize);
}

function displayTile(px, py, xSize, ySize){
	context.drawImage(background, px, py, xSize, ySize, px, py, xSize, ySize);
	context.drawImage(islands,    px, py, xSize, ySize, px, py, xSize, ySize);
	context.drawImage(bridges,    px, py, xSize, ySize, px, py, xSize, ySize);
	context.drawImage(challengeA, px, py, xSize, ySize, px, py, xSize, ySize);
	context.drawImage(challengeB, px, py, xSize, ySize, px, py, xSize, ySize);
}
