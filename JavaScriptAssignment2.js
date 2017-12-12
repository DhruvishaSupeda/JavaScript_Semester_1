//Author: Dhruvisha Supeda

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

var happyButton = document.getElementById("happybutton");
var sadButton = document.getElementById("sadbutton");
var surprisedButton = document.getElementById("surprisedbutton");
var neutralButton = document.getElementById("neutralbutton");

var y = 150;
var mouth = "n";
var requestId;
var faceCentre = 200; //make constant
var faceRadius = 150 //make constant
var heartsDrawn = [];
var moustacheDrawn = false;


happyButton.addEventListener("click", drawHappy);
sadButton.addEventListener("click", drawSad);
surprisedButton.addEventListener("click", drawSurprised);
neutralButton.addEventListener("click", drawNeutral);
canvas.addEventListener("click", clickedCanvas);
canvas.addEventListener("mousemove", drawMoustache);
canvas.addEventListener("dblclick", checkNose);

//Clears the entire canvas
function clearCanvas() {
	context.clearRect(0, 0, WIDTH, HEIGHT);
}

//Clears the moustache
function clearMoustache() {
	context.clearRect(130,230,135,28)
}

//Redraws a heart at coordinates (x,y) passed into the function
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

	//Draws all of the hearts at the coordinates stored in the array
	for (i = 0; i < heartsDrawn.length; i+=2) {
		redrawHeart(heartsDrawn[i], heartsDrawn[i+1]);
	}
}


function drawHappy () {
	//Draws the happy face
	mouth = "h";
	heartsDrawn = [];
	clearCanvas();
	drawFace();
	context.beginPath();
		context.moveTo(287,268);
		context.arc(200,220,100,0.5,2.65,false);
	context.stroke();
}

function drawSad () {
	//Draws the sad face
	mouth = "sa";
	heartsDrawn = [];
	clearCanvas();
	drawFace();
	context.beginPath();
		context.moveTo(120,310);
		context.arc(200,360,95,3.7,5.7,false);
	context.stroke();
}

function drawSurprised () {
	//Draws the surprised face
	mouth = "su";
	heartsDrawn = [];
	clearCanvas();
	drawFace();
	context.beginPath();
		context.moveTo(230,290);
		context.arc(200,290,30,0,Math.PI*2,true);
	context.stroke();
}

function drawNeutral () {
	//Draws the neutral face
	mouth ="n";
	heartsDrawn = [];
	clearCanvas();
	drawFace();
	context.beginPath();
		context.moveTo(120,270);
		context.lineTo(280,270);
	context.stroke();
}


function getMouseXY(e) {
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
	//If the mouse is over the moustache position, draws the moustache
	if ((position.x>=147 && position.x<=260) && (position.y>=230 && position.y<=260)) {
		moustacheDrawn = true;
		context.strokeStyle = "rgb(0,0,0)";
		context.beginPath();
			context.moveTo(147,256);
			context.arc(200,340,100,Math.PI+1,5.28,false);
			context.closePath();
			context.fill();
		context.stroke();

	}
	else {
		//If moustache not drawn, it is cleared and the hearts are redrawn on the face
		if (moustacheDrawn == true) {
			clearMoustache();
			moustacheDrawn = false;
		}
	}
	for (i = 0; i < heartsDrawn.length; i+=2) {
		redrawHeart(heartsDrawn[i], heartsDrawn[i+1]);
	}
}

//Draws a heart at the mouse position
function drawHeart(evt) {
	var position = getMouseXY(evt);
	var img = new Image();
	img.onload = function() {
		context.drawImage(img,position.x,position.y);
	}
	img.src = "heart_picture.png";
}

function clickedCanvas (evt) {
	var position = getMouseXY(evt);
	//If the user clicks the right eye, starts the right eye tear animation
	if ((position.x >= 220 && position.x <= 270) && (position.y >= 124 && position.y <= 175)) {
			startRight();
	}
	//If the user clicks the left eye, starts the left eye tear animation
	else if ((position.x >= 120 && position.x <= 170) && (position.y >= 124 && position.y <= 175)){
			y=150;
			startLeft();
	}
	//If the face is clicked (but not on the eyes or nose) a heart is drawn
	else if (Math.sqrt(Math.pow(position.x-faceCentre,2)+Math.pow(position.y-faceCentre,2)) <= faceRadius-10) {
		if ((position.x <= 180 || position.x >= 200) && (position.y <= 190 || position.y >= 225))
			drawHeart(evt,context);
			//Position of heart added to the array so it can be redrawn
			heartsDrawn.push(position.x);
			heartsDrawn.push(position.y);
	}
}

function checkNose(evt) {
	var position = getMouseXY(evt);
	//If the nose is double clicked, the surprised face is shown
	if ((position.x >= 180 && position.x <= 200) && (position.y >= 190 && position.y <= 225)) {
		drawSurprised();
	}
}

//Animation for the left eye
function drawLeft() {
	context.strokeStyle = "rgb(0,0,255)";
	context.beginPath();
		context.moveTo(125,y);
		context.lineTo(125,y+20);
		context.moveTo(160,y+20);
		context.lineTo(160,y+40);
		context.moveTo(140,y+45);
		context.lineTo(140,y+65);
	context.stroke();
	context.strokeStyle = "rgb(0,0,0)";
	//drawMoustache();
}

function clearLeft() {
	clearCanvas();
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
	context.beginPath();
		context.moveTo(225,y);
		context.lineTo(225,y+20);
		context.moveTo(260,y+20);
		context.lineTo(260,y+40);
		context.moveTo(240,y+45);
		context.lineTo(240,y+65);
	context.stroke();
	context.strokeStyle = "rgb(0,0,0)";
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
