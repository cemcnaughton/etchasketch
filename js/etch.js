var x = 0;
var y = 0;
var maxX;
var maxY;
var c;
var ctx;
var speed =  3;
var thick = 1;
var keys = [];
var defaultCtx;


var setSliderText =  function(id,value){
	document.querySelector('#' + id).innerHTML = value;
	
	// after value is set focus back on the canvas
	if(c){
		c.focus();
	}	
}

var clear = function(){
	c.className = 'shake';  

    c.width = c.width;

	window.setTimeout(function(){
		c.className = '';
	},1500);
}
document.addEventListener("DOMContentLoaded", function(event) {
	
	
	c = document.querySelector('canvas');
	c.width = window.innerWidth * .5;
	c.height =  window.innerHeight * .8
	
	// set max values so we do not draw off screen
	maxX = document.querySelector('canvas').width;
	maxY = document.querySelector('canvas').height;
	
	// slider speed change
    document.querySelector('#speed').onchange = function(){
		speed = parseInt(this.value);
		setSliderText('speed-display',speed);
	};
	
	// slider line thickness speed
	document.querySelector('#thick').onchange = function(){
		thick = parseInt(this.value);
		setSliderText('thick-display',thick);
		ctx.beginPath(); 
		ctx.lineWidth = thick;
	};
	
	document.querySelector('#clear').onclick = function(){
		clear();
	};
	
	// stores list so two keys can be set at the same time
	// add or substracts  x or y placement
	// will only go to the max values
	document.onkeydown = function() {
		if(keys.indexOf(window.event.keyCode)==-1){
			keys.push(window.event.keyCode)
		}
		if(keys.indexOf(37)>-1){
			x = x > 0 ? x - speed : 0;
		}
		if(keys.indexOf(38)>-1){
			y = y > 0 ? y - speed : 0;	
		}
		if(keys.indexOf(39)>-1){
			x = x < maxX ? x + speed : maxX;
		}
		if(keys.indexOf(40)>-1){
			y = y < maxY ? y + speed : maxY;
		}
		draw(x,y);
	};
	
	// removes key from stored list
	document.onkeyup = function() {
		keys.splice(keys.indexOf(window.event.keyCode),1);
	};
	
	//set the html to view
	setSliderText('speed-display',speed);
	setSliderText('thick-display',thick);
});

// actually draws on the cavas
var draw = function(x,y){

	if(!ctx){
		
		ctx = c.getContext("2d");
		ctx.moveTo(0,0);
	}
	ctx.lineTo(x,y);
	ctx.stroke();
}
