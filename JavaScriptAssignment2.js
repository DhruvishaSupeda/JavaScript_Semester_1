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
var rightTearsShown = false;
var leftTearsShown = false;
var noseClicked = false;

var mouth;

happyButton.addEventListener("click", clickedHappy);
sadButton.addEventListener("click", clickedSad);
surprisedButton.addEventListener("click", clickedSurprised);
neutralButton.addEventListener("click", clickedNeutral);
canvas.addEventListener("click", callingStuffToDo);
canvas.addEventListener("mousemove", drawMoustache);
canvas.addEventListener("dblclick", checkingNose);
//canvas.addEventListener("mousedown", dropNose);

function clearCanvas() {
	context.clearRect(0, 0, WIDTH, HEIGHT);
}

function clearLeftTears() {
	context.clearRect(120,180,50,60);
}

function clearRightTears() {
	context.clearRect(220,180,50,60);
}

function clearNose() {
	context.clearRect(180,190,30,40);
}

function drawFace() {
	rightEyeClicked = false;
	leftEyeClicked = false;
	noseClicked = false;

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

function redrawFace() {
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
	if (leftTearsShown)
		drawLeftTear();
	if (rightTearsShown)
		drawRightTear();
	if (noseClicked)
		clearNose();
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
	mouth = "h";
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
	mouth = "sa";
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
	mouth = "su";
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
	mouth ="n";
	clearCanvas();
	drawFace();
	drawNose();
	context.beginPath();
		context.moveTo(120,270);
		context.lineTo(280,270);
	context.stroke();
}

function clickedHappy(){
	mouth = "h";
	leftTearsShown = false;
	rightTearsShown = false;
	noseClicked = false;
	drawHappy();
}

function clickedSad() {
	mouth = "sa";
	leftTearsShown = false;
	rightTearsShown = false;
	noseClicked = false;
	drawSad();
}

function clickedSurprised() {
	mouth = "su";
	leftTearsShown = false;
	rightTearsShown = false;
	noseClicked = false;
	drawSurprised();
}

function clickedNeutral() {
	mouth = "n";
	leftTearsShown = false;
	rightTearsShown = false;
	noseClicked = false;
	drawNeutral();
}

function drawRightTear () {
	if (rightEyeClicked == false) {
		context.strokeStyle = "rgb(0,0,255)";
		rightTearsShown = true;
		context.beginPath();
			context.moveTo(225,180);
			context.lineTo(225,200);
			context.moveTo(260,200);
			context.lineTo(260,220);
			context.moveTo(240,215);
			context.lineTo(240,235);
		context.stroke();
		//needthis so everythign else isst drawn blue
		context.strokeStyle = "rgb(0,0,0)";
	}
	else{
		clearRightTears();
		rightTearsShown = false;
	}
	rightEyeClicked = !(rightEyeClicked);
}

function drawLeftTear () {
	if (leftEyeClicked == false){
		context.strokeStyle = "rgb(0,0,255)";
		leftTearsShown = true;
		context.beginPath();
			context.moveTo(125,180);
			context.lineTo(125,200);
			context.moveTo(160,200);
			context.lineTo(160,220);
			context.moveTo(140,215);
			context.lineTo(140,235);
		context.stroke();
		context.strokeStyle = "rgb(0,0,0)";
	}
	else {
		clearLeftTears();
		leftTearsShown = false;
	}
	leftEyeClicked = !(leftEyeClicked);
}

function animateLeftTears() {

}

function animateRightTears() {

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

function grabNose(evt) {
	console.log("Stuff");
	drawMovingNose(evt);
	}

function drawMovingNose(evt) {
	var position = getMouseXY(evt);
	var x=position.x;
	var y=position.y;
		redrawFace();
		clearNose();
		context.beginPath();
			context.moveTo(x,y-20); //200,195
			context.lineTo(x-13,y+20); //224
			context.lineTo(x,y+20);
		context.stroke();

}

function drawMoustache(evt) {
	var position = getMouseXY(evt);
	noseClicked = false;
	if ((position.x>=147 && position.x<=260) && (position.y>=230 && position.y<=260)) {
		context.beginPath();
			context.moveTo(147,256);
			context.arc(200,340,100,Math.PI+1,5.28,false);
			context.closePath();
			context.fill();
		context.stroke();
	}
	else {
		redrawFace();
		drawNose();
		console.log("Why no moustache");
		if (noseClicked)
			grabNose(evt);
	}
	if (noseClicked)
		grabNose(evt);
}

function callingStuffToDo (evt) {
	var position = getMouseXY(evt);
	console.log(position);
	if ((position.x >= 220 && position.x <= 270) && (position.y >= 124 && position.y <= 175)) {
			drawRightTear();
	}
	if ((position.x >= 120 && position.x <= 170) && (position.y >= 124 && position.y <= 175)) {
			drawLeftTear();
	}
}

function checkingNose(evt) {
	var position = getMouseXY(evt);
	if (((position.x>=180 && position.x<=200) && (position.y>=200 && position.y<=225)) && !noseClicked){
		noseClicked = true;
		console.log("Checkigng");
		grabNose(evt);
	}
	else {
		noseClicked=false;
		redrawFace();
		drawNose();
		console.log("noseiscancelled");

	}
	//noseClicked = !noseClicked;
}


//Main calling of functions for when webpage first loads
drawNeutral();
