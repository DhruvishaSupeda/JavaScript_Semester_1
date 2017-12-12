//Author: Dhruvisha Supeda

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
var rightTearsShown = false;
var leftTearsShown = false;

var y = 150;
var mouth = "n";
var requestId;
var faceCentre = 200; //make constant
var faceRadius = 150 //make constant
var heartsDrawn = [];


happyButton.addEventListener("click", drawHappy);
sadButton.addEventListener("click", drawSad);
surprisedButton.addEventListener("click", drawSurprised);
neutralButton.addEventListener("click", drawNeutral);
canvas.addEventListener("click", callingStuffToDo);
canvas.addEventListener("mousemove", drawMoustache);
canvas.addEventListener("dblclick", checkNose);

//Clears the entire canvas
function clearCanvas() {
	context.clearRect(0, 0, WIDTH, HEIGHT);
}

function clearMoustache() {
	context.clearRect(130,230,135,28)
}

//Redraws all of the hearts already on the screen
function redrawHeart(x,y) {
	var img = new Image();
	img.onload = function() {
		context.drawImage(img,x,y);
	}
	img.src = "heart_picture.png";
}

function drawFace() {
	context.strokeStyle = "rgb(0,0,0)";
	context.lineWidth = "3";
	heartsDrawn = [];

	context.beginPath();
		//draws the face outline
		context.arc(faceCentre,faceCentre,150,0,Math.PI*2,true);
		context.moveTo(175,150);
		//draws the left eye outline
		context.arc(150,150,25,0,Math.PI*2,true);
		context.moveTo(270,150);
		//draws the right eye outline
		context.arc(245,150,25,0,Math.PI*2,true);
	context.stroke();

	//draws the pupil of the left eye
	context.beginPath();
		context.moveTo(157,150);
		context.arc(150,150,7,0,Math.PI*2,true);
		context.fill();
	context.stroke();

	//draws the pupil of the right eye
	context.beginPath();
		context.moveTo(252,150);
		context.arc(245,150,7,0,Math.PI*2,true);
		context.fill();
	context.stroke();

	//draws the nose on the face
	context.beginPath();
		context.moveTo(200,195);
		context.lineTo(187,224);
		context.lineTo(200,224);
	context.stroke();
}

function redrawFace() {
	//switch case for each type of face to be drawn
	switch(mouth) {
		case "n":
			drawNeutral();
			break;
		case "h":
			drawHappy();
			break;
		case "sa":
			drawSad();
			break;
		case "su":
			drawSurprised();
			break;
		}

	for (i = 0; i < heartsDrawn.length; i+=2) {
		redrawHeart(heartsDrawn[i], heartsDrawn[i+1]);
	}
}


function drawHappy () {
	//happy face
	mouth = "h";
	clearCanvas();
	drawFace();
	context.beginPath();
		context.moveTo(287,268);
		context.arc(200,220,100,0.5,2.65,false);
	context.stroke();
}

function drawSad () {
	//sad face
	mouth = "sa";
	clearCanvas();
	drawFace();
	context.beginPath();
		context.moveTo(120,310);
		context.arc(200,360,95,3.7,5.7,false);
	context.stroke();
}

function drawSurprised () {
	//surprised face
	mouth = "su";
	clearCanvas();
	drawFace();
	context.beginPath();
		context.moveTo(230,290);
		context.arc(200,290,30,0,Math.PI*2,true);
	context.stroke();
}

function drawNeutral () {
	//neutral face
	mouth ="n";
	clearCanvas();
	drawFace();
	context.beginPath();
		context.moveTo(120,270);
		context.lineTo(280,270);
	context.stroke();
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

function drawMoustache(evt) {
	var position = getMouseXY(evt);
	if ((position.x>=147 && position.x<=260) && (position.y>=230 && position.y<=260)) {
		context.strokeStyle = "rgb(0,0,0)";
		context.beginPath();
			context.moveTo(147,256);
			context.arc(200,340,100,Math.PI+1,5.28,false);
			context.closePath();
			context.fill();
		context.stroke();
	}
	else {
		clearMoustache();
		for (i = 0; i < heartsDrawn.length; i+=2) {
			redrawHeart(heartsDrawn[i], heartsDrawn[i+1]);
		}
	}
}

function drawHeart(evt, context) {
	var position = getMouseXY(evt);
	var img = new Image();
	img.onload = function() {
		context.drawImage(img,position.x,position.y);
	}
	img.src = "heart_picture.png";
}

function callingStuffToDo (evt) {
	var position = getMouseXY(evt);
	console.log(position);
	if ((position.x >= 220 && position.x <= 270) && (position.y >= 124 && position.y <= 175)) {
			startRight();
	}
	else if ((position.x >= 120 && position.x <= 170) && (position.y >= 124 && position.y <= 175)){
			y=150;
			startLeft();
	}
	else if (Math.sqrt(Math.pow(position.x-faceCentre,2)+Math.pow(position.y-faceCentre,2)) <= faceRadius-10) {
		drawHeart(evt,context);
		heartsDrawn.push(position.x);
		heartsDrawn.push(position.y);
	}
}

function checkNose(evt) {
	var position = getMouseXY(evt);
	if ((position.x >= 180 && position.x <= 200) && (position.y >= 190 && position.y <= 225)) {
		drawSurprised();
	}
}

////////////////////////////////////////////////////ANIMATION LEFT
function drawLeft() {
	context.strokeStyle = "rgb(0,0,255)";
	leftTearsShown = false;
	context.beginPath();
		context.moveTo(125,y);
		context.lineTo(125,y+20);
		context.moveTo(160,y+20);
		context.lineTo(160,y+40);
		context.moveTo(140,y+45);
		context.lineTo(140,y+65);
	context.stroke();
	context.strokeStyle = "rgb(0,0,0)";
	for (i = 0; i < heartsDrawn.length; i+=2) {
		redrawHeart(heartsDrawn[i], heartsDrawn[i+1]);
	}
}

function clearLeft() {
	clearCanvas();
	for (i = 0; i < heartsDrawn.length; i+=2) {
		redrawHeart(heartsDrawn[i], heartsDrawn[i+1]);
	}
	redrawFace();
}

function updateLeft() {
	y=y+5;
	clearLeft();
}

function nextFrameLeft() {
	requestId = requestAnimationFrame(nextFrameLeft);
	updateLeft();
	drawLeft();
	if (y > 400) {
			stopLeft();
	}
}

function startLeft() {
	console.log("starting animation");
	y=150;
	drawLeft();
	nextFrameLeft();
}

function stopLeft() {
	cancelAnimationFrame(requestId);
	clearLeft();
}

/////////////////////////ANIMATION right
function drawRight() {
	context.strokeStyle = "rgb(0,0,255)";
	rightTearsShown = false;
	context.beginPath();
		context.moveTo(225,y);
		context.lineTo(225,y+20);
		context.moveTo(260,y+20);
		context.lineTo(260,y+40);
		context.moveTo(240,y+45);
		context.lineTo(240,y+65);
	context.stroke();
	context.strokeStyle = "rgb(0,0,0)";
	for (i = 0; i < heartsDrawn.length; i+=2) {
		redrawHeart(heartsDrawn[i], heartsDrawn[i+1]);
	}
}

function clearRight() {
	clearCanvas();
	redrawFace();
	for (i = 0; i < heartsDrawn.length; i+=2) {
		redrawHeart(heartsDrawn[i], heartsDrawn[i+1]);
	}
}

function updateRight() {
	y=y+5;
	clearRight();
}

function nextFrameRight() {
	requestId = requestAnimationFrame(nextFrameRight);
	updateRight();
	drawRight();
	if (y > 400) {
			stopRight();
	}
}

function startRight() {
	console.log("starting animation");
	y=150;
	drawRight();
	nextFrameRight();
}

function stopRight() {
	clearRight();
	cancelAnimationFrame(requestId);
}



//Main calling of functions for when webpage first loads
drawNeutral();
