var app = {};

function startApp(){
	app.canvas = document.getElementById('myCanvas');
	app.context = app.canvas.getContext('2d');
	app.lastTime = window.performance.now();
	window.requestAnimationFrame(frameUpdate);

	window.addEventListener('keydown', myKeyDown, false);
	window.addEventListener('keyup', myKeyUp, false);

	restartGame();
}

function restartGame(){
//reset score = 0;
//reset ball speed = default;
//reset ball curve = false;
	spawnBall();
	spawnPlayerOne();
	spawnPlayerTwo();
//ASK if vs AI or P2. spawn accordingly.
}

function frameUpdate(timeStamp){
	window.requestAnimationFrame(frameUpdate);
	var deltaTime = (timeStamp - app.lastTime) / 1000;
	app.lastTime = timeStamp;
	// console.log(1/deltaTime);

//add if statement to optimize calling check wall & check paddle, only when necessary.
	bounceWall();
	bouncePaddle();

	app.ball.move();
	app.playerOne.move();
	app.playerTwo.move();
	app.context.clearRect(0, 0, app.canvas.width, app.canvas.height);

	drawScene();
}

function drawScene(){
	app.context.fillStyle="white";
	app.context.fillRect(0,0,app.canvas.width,app.canvas.height);

	// app.context.moveTo(app.canvas.width/2, 0);  	//test middle line
	// app.context.lineTo(app.canvas.width/2, app.canvas.height);  	//test middle line
	// app.context.stroke();  	//test middle line

	app.ball.drawMe(app.context);
	app.playerOne.drawMe(app.context);
	app.playerTwo.drawMe(app.context);
}

function bounceWall(){
	if (app.ball.position.y >= (app.canvas.height - app.ball.radius) || 
		app.ball.position.y <= app.ball.radius){
		app.ball.speed.y = -(app.ball.speed.y);
	}

	if (app.ball.position.x >= (app.canvas.width - app.ball.radius)){
		app.playerTwo.score += 1;
		updateScore();
		spawnBall();
	}

	if (app.ball.position.x <= app.ball.radius){
		app.playerOne.score += 1;
		updateScore();
		spawnBall();
	}
}

function updateScore(){
	document.getElementById('score').innerHTML = ('Score: ' + app.playerTwo.score + ' - ' + app.playerOne.score);
}

function bouncePaddle(){
	let distFromP1Center = (app.ball.position.y - app.playerOne.position.y);
	let distFromP2Center = (app.ball.position.y - app.playerTwo.position.y);

	if(app.ball.position.x + app.ball.radius < app.playerOne.position.x + app.playerOne.size.width / 2 &&
	   app.ball.position.x + app.ball.radius > app.playerOne.position.x - app.playerOne.size.width / 2 &&
	   app.ball.position.y > app.playerOne.position.y - app.playerOne.size.height / 2 &&
	   app.ball.position.y < app.playerOne.position.y + app.playerOne.size.height / 2)
	{
		app.ball.speed.x = -(app.ball.speed.x * app.ball.multiplier);
		app.ball.speed.y = (distFromP1Center * 0.15);
		app.ball.curveUp = false;
		app.ball.curveDown = true;
	}

	if(app.ball.position.x - app.ball.radius > app.playerTwo.position.x - app.playerTwo.size.width / 2 &&
	   app.ball.position.x - app.ball.radius < app.playerTwo.position.x + app.playerTwo.size.width / 2 &&
	   app.ball.position.y > app.playerTwo.position.y - app.playerTwo.size.height / 2 &&
	   app.ball.position.y < app.playerTwo.position.y + app.playerTwo.size.height / 2)
	{
		app.ball.speed.x = -(app.ball.speed.x * app.ball.multiplier);
		app.ball.speed.y = (distFromP2Center * 0.15);
		app.ball.curveDown = false;
		app.ball.curveUp = true;
	}
}

function spawnBall(){
	app.ball = {
		position: {
			x: app.canvas.width / 2,
			y: app.canvas.height / 2
		},
		speed: {
			x: 4,
			y: (Math.random() * 3) - 1
		},
		multiplier: 1.1,
		radius: 5,
		color: '#000000',
		curveDown: false,
		curveUp: false,
		drawMe: function(context){
			drawBall(context, this);
		},
		move : function(){
			if(this.curveDown === true){
				this.speed.y += .1;
			};
			if(this.curveUp === true){
				this.speed.y -= .1;
			}
			this.position.x += this.speed.x;
			this.position.y += this.speed.y;
		}
	}
}

function spawnPlayerOne(){
	app.playerOne = {
		score: 0,
		position: {
			x: app.canvas.width - 30,
			y: app.canvas.height / 2
		},
		size: {
			width: 8,
			height: 100
		},
		color: '#0000FF',
		drawMe: function(context){
			drawPaddle(context, this);
		},
		move : function(){
			if(this.moveUp && this.position.y > 52){
				this.position.y -= 8;
			}
			if(this.moveDown && this.position.y < 352){
				this.position.y += 8;
			}
		}
	}
}

function spawnPlayerTwo(){
	app.playerTwo = {
		score: 0,
		position: {
			x: app.canvas.width - 690,
			y: app.canvas.height / 2
		},
		size: {
			width: 8,
			height: 100
		},
		color: '#FF0000',
		drawMe: function(context){
			drawPaddle(context, this);
		},
		move : function(){
			// this.position.y = app.ball.position.y; //for AI use.
			if(this.moveUp && this.position.y > 52){
				this.position.y -= 8;
			}
			if(this.moveDown && this.position.y < 352){
				this.position.y += 8;
			}
		}
	}
}

function drawPaddle(context, obj) {
    context.save();
    context.translate(obj.position.x, obj.position.y);
    context.fillStyle = obj.color;
    context.fillRect(-obj.size.width / 2, -obj.size.height / 2,
        obj.size.width, obj.size.height);
    context.restore();
}

function drawBall(context, obj) {
    context.save();
    context.translate(obj.position.x, obj.position.y);
    context.fillStyle = obj.color;
    // context.fillRect(obj.radius, obj.radius);
    context.stroke();
    context.beginPath();
    context.arc(0, 0, obj.radius, 0, (2 * Math.PI));
    // context.fill();
    context.restore();
}


//ADD ARRAY TO ALLOW MULTIPLE INPUTS???
	// let multipleKeys = []

//if UP -> call P1 Up, then break
//if DOWN -> call P1 Down, then break
//if LEFT -> call P1 forehand tilt
//if RIGHT -> call P1 backhand tilt

//if W -> call P2 Up, then break
//if S -> call P2 down, then break
//if D -> call P2 forehand tilt
//if A -> call P2 backhand tilt
function myKeyDown(e){
	if (e.keyCode === 38){
		playerOnePressUp();
	}
	else if (e.keyCode === 40){
		playerOnePressDown();
	}
//add playerOne LEFT and RIGHT input


	else if (e.keyCode === 87){
		playerTwoPressUp();
	}
	else if (e.keyCode === 83){
		playerTwoPressDown();
	}
}

function myKeyUp(e){
	if (e.keyCode === 38){
		playerOneReleaseUp();
	}
	else if (e.keyCode === 40){
		playerOneReleaseDown();
	}
	else if (e.keyCode === 87){
		playerTwoReleaseUp();
	}
	else if (e.keyCode === 83){
		playerTwoReleaseDown();
	}
}

//playerOne
function playerOnePressUp() {
	app.playerOne.moveUp = true;
}
function playerOnePressDown() {
	app.playerOne.moveDown = true;
}
function playerOneReleaseUp() {
	app.playerOne.moveUp = false;
}
function playerOneReleaseDown() {
	app.playerOne.moveDown = false;
}

//playerTwo
function playerTwoPressUp() {
	app.playerTwo.moveUp = true;
}
function playerTwoPressDown() {
	app.playerTwo.moveDown = true;
}
function playerTwoReleaseUp() {
	app.playerTwo.moveUp = false;
}
function playerTwoReleaseDown() {
	app.playerTwo.moveDown = false;
}








//function vs AI or vs Player2?
//function spawn background

//function spawn ball

//function spawn paddles

//function draw all 

//function framerate???


//function event listeners (controls) WASD vs Directional keys.

//function keep score, update DOM (outside of canvas)

//funciton collision (and curve ball?)

//function power ups (optional)

//function game over (who wins?)

//function restart game?
//function reset score (then update DOM)


//add AI (track ball perfect with a % chance to not track ball well. 
//increase % for lower difficulty.)