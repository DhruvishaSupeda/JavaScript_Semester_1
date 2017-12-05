var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

var happyButton = document.getElementById("happybutton");
var sadButton = document.getElementById("sadbutton");
var surprisedButton = document.getElementById("surprisedbutton");
var neutralButton = document.getElementById("neutralbutton");

var rightEyeClicked = false;
var leftEyeClicked = false;
var noseClicked = false;

happyButton.addEventListener('click', drawHappy);
sadButton.addEventListener('click', drawSad);
surprisedButton.addEventListener('click', drawSurprised);
neutralButton.addEventListener('click', drawNeutral);
canvas.addEventListener('click', callingStuffToDo);

function clearCanvas() {
	context.clearRect(0, 0, WIDTH, HEIGHT);
}

function drawFace() {
	rightEyeClicked = false;
	leftEyeClicked = false;

	context.strokeStyle = "rgb(0,0,0)";
	context.lineWidth = "3";

	context.beginPath();
		context.arc(200,200,150,0,Math.PI*2,true);
		context.moveTo(175,150);
		context.arc(150,150,25,0,Math.PI*2,true);
		context.moveTo(270,150);
		context.arc(245,150,25,0,Math.PI*2,true);
	context.stroke();

	//inside of eye on left
	context.beginPath();
		context.moveTo(157,150);
		context.arc(150,150,7,0,Math.PI*2,true);
		context.fill();
	context.stroke();

	//inside of eye on right
	context.beginPath();
		context.moveTo(252,150);
		context.arc(245,150,7,0,Math.PI*2,true);
		context.fill();
	context.stroke();

}

function drawNose () {
	context.beginPath();
		context.moveTo(200,195);
		context.lineTo(187,224);
		context.lineTo(200,224);
	context.stroke();
}

function drawHappy () {
	//happy face
	clearCanvas();
	drawFace();
	drawNose();
	context.beginPath();
		context.moveTo(287,268);
		context.arc(200,220,100,0.5,2.65,false);
	context.stroke();
}

function drawSad () {
	//sad face
	clearCanvas();
	drawFace();
	drawNose();
	context.beginPath();
		context.moveTo(120,310);
		context.arc(200,360,95,3.7,5.7,false);
	context.stroke();
}

function drawSurprised () {
	//surprised face
	clearCanvas();
	drawFace();
	drawNose();
	context.beginPath();
		context.moveTo(230,290);
		context.arc(200,290,30,0,Math.PI*2,true);
	context.stroke();
}

function drawNeutral () {
	//neutral face
	clearCanvas();
	drawFace();
	drawNose();
	context.beginPath();
		context.moveTo(120,270);
		context.lineTo(280,270);
	context.stroke();
}

function drawRightTear () {
	if (rightEyeClicked == false) {
		context.lineWidth = "2";
		context.strokeStyle = "rgb(0,0,255)";
	}
	else{
		context.lineWidth = "3";
		context.strokeStyle = "rgb(255,255,255)";
	}
	context.beginPath();
		context.moveTo(225,180);
		context.lineTo(225,200);
		context.moveTo(260,200);
		context.lineTo(260,220);
		context.moveTo(240,215);
		context.lineTo(240,235);
	context.stroke();
	rightEyeClicked = !(rightEyeClicked);
}

function drawLeftTear () {
	if (leftEyeClicked == false){
		context.lineWidth = "2";
		context.strokeStyle = "rgb(0,0,255)";
	}
	else {
		context.lineWidth = "3";
		context.strokeStyle = "rgb(255,255,255)";
	}
	context.beginPath();
		context.moveTo(125,180);
		context.lineTo(125,200);
		context.moveTo(160,200);
		context.lineTo(160,220);
		context.moveTo(140,215);
		context.lineTo(140,235);
	context.stroke();
	leftEyeClicked = !(leftEyeClicked);
}

function getMouseXY(e) { //Steves stuff
	var boundingRect = canvas.getBoundingClientRect();
	var offsetX = boundingRect.left;
	var offsetY = boundingRect.top;
	var w = (boundingRect.width-canvas.width)/2;
	var h = (boundingRect.height-canvas.height)/2;
	offsetX += w;
	offsetY += h;
	// use clientX and clientY as getBoundingClientRect is used above
	var mx = Math.round(e.clientX-offsetX);
	var my = Math.round(e.clientY-offsetY);
	return {x: mx, y: my}; // return as an object
}

/*function followNose(x,y) {
	noseClicked = true;
	while (noseClicked == true) {
		clearCanvas();
		drawFace();
		context.beginPath();
			context.moveTo(x,y-20); //200,195
			context.lineTo(x-13,y+29); //224
			context.lineTo(x,y+29);
		context.stroke();
		position = getMouseXY(evt);
		x=position.x;
		y=position.y;
		noseClicked = false;
		//checkNoseClicked();
	}
}*/

function followNose() {
	if ((position.x>=180 && position.x<=200) && (position.y>=200 && position.y<=225)) {

	}

}

function callingStuffToDo (evt) {
	var position = getMouseXY(evt);
	console.log(position);
	if ((position.x >= 220 && position.x <= 270) && (position.y >= 124 && position.y <= 175))
			drawRightTear();
	if ((position.x >= 120 && position.x <= 170) && (position.y >= 124 && position.y <= 175))
			drawLeftTear();
	//if ((position.x>=180 && position.x<=200) && (position.y>=200 && position.y<=225))
			//followNose();
}

//Main calling of functions
drawNeutral();
