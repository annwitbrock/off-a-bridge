function loadImages(sources) {
	var images = {};
	var loadedImages = 0;
	var numImages = 0;
	//get num of sources
	for(var src in sources) {
	  numImages++;
	}
	for(var src in sources) {
	  images[src] = new Image();
	  images[src].onload = function() {
		if(++loadedImages >= numImages) {
		  callback(images);
		}
	  };
	  images[src].src = sources[src];
	}
}
  
var sources = {
	background: "img/background.png",
	islands: "img/island.png",
	bridges: "img/bridge.png",
	challengeA: "img/challengeA.png",
	challengeB: "img/challengeB.png"
};

loadImages(sources, function(images){
	context.drawImage(images.background, 1, 1, MAP_WIDTH, MAP_HEIGHT);
	context.drawImage(images.islands,    1, 1, MAP_WIDTH, MAP_HEIGHT);
	context.drawImage(images.bridges,    1, 1, MAP_WIDTH, MAP_HEIGHT);
	context.drawImage(images.challengeA, 1, 1, MAP_WIDTH, MAP_HEIGHT);
	context.drawImage(images.challengeB, 1, 1, MAP_WIDTH, MAP_HEIGHT);
});


//========================================

var canvas = null;
var context = null;
var assets = ['/media/js/standalone/libs/gamedev_assets/robowalk/robowalk00.png',
			  '/media/js/standalone/libs/gamedev_assets/robowalk/robowalk01.png',
			  '/media/js/standalone/libs/gamedev_assets/robowalk/robowalk02.png',
			  '/media/js/standalone/libs/gamedev_assets/robowalk/robowalk03.png',
			  '/media/js/standalone/libs/gamedev_assets/robowalk/robowalk04.png',
			  '/media/js/standalone/libs/gamedev_assets/robowalk/robowalk05.png',
			  '/media/js/standalone/libs/gamedev_assets/robowalk/robowalk06.png',
			  '/media/js/standalone/libs/gamedev_assets/robowalk/robowalk07.png',
			  '/media/js/standalone/libs/gamedev_assets/robowalk/robowalk08.png',
			  '/media/js/standalone/libs/gamedev_assets/robowalk/robowalk09.png',
			  '/media/js/standalone/libs/gamedev_assets/robowalk/robowalk10.png',
			  '/media/js/standalone/libs/gamedev_assets/robowalk/robowalk11.png',
			  '/media/js/standalone/libs/gamedev_assets/robowalk/robowalk12.png',
			  '/media/js/standalone/libs/gamedev_assets/robowalk/robowalk13.png',
			  '/media/js/standalone/libs/gamedev_assets/robowalk/robowalk14.png',
			  '/media/js/standalone/libs/gamedev_assets/robowalk/robowalk15.png',
			  '/media/js/standalone/libs/gamedev_assets/robowalk/robowalk16.png',
			  '/media/js/standalone/libs/gamedev_assets/robowalk/robowalk17.png',
			  '/media/js/standalone/libs/gamedev_assets/robowalk/robowalk18.png'
			 ];
var frames = [];

var onImageLoad = function(){
	console.log("IMAGE!!!");
};

var setup = function() {
	body = document.getElementById('body');
	canvas = document.createElement('canvas');

	context = canvas.getContext('2d');
	
	canvas.width = 100;
	canvas.height = 100;

	body.appendChild(canvas);

	// Load each image URL from the assets array into the frames array 
	// in the correct order.
	// Afterwards, call setInterval to run at a framerate of 30 frames 
	// per second, calling the animate function each time.

    loadedImages = 0;
    
    for (var i = 0; i < assets.length; i++){
        frames[i] = new Image();
        frames[i].onload = function(){
            //onImageLoad();
            loadedImages += 1;
        };
        frames[i].src = assets[i];
    };

    frameindex = 0;
    framerate = 1000 / 30;
    var animator = setInterval(animate, framerate);   
};

var animate = function(){
    if (loadedImages < frames.length) return; // in case frames[0] hasn't loaded yet

    context.clearRect(0,0,canvas.width, canvas.height);
  
    context.drawImage(frames[frameindex++], 0, 0);
    frameindex %= frames.length;
};

//setup();
