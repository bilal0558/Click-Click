//Initializing variables.
//initialTime for showing the time after the game.
//Getting time from previous page through local storage.
let time = localStorage["time"];
let initialTime = time;
let score = 0;
let gameScreen = document.getElementById("game-screen");
let scoreSpan = document.getElementById("score");
let timeSpan = document.getElementById("time");
let replay = document.getElementById("replay");

//Adding event listener
gameScreen.addEventListener("click", createCircle);
replay.addEventListener("click", () => location.reload());

let game = setInterval(timer, 1000);

//Calling the function to create the initial circle.
createCircle();

function createCircle(event) {
    //Removing the previous circle from the screen.
    document.getElementById("circle").remove();

    let circle = document.createElement("div");
    circle.id = "circle";

    //Generating x, y coordinates and radius of circle.
    //Random value generated will be inside the window as the min for random value is the left/top offset and max is clientWidth/Height of the gameScreen.
    //Radius value range is static from 10 to 100.
    let circleXCoordinate = getRandomInteger(gameScreen.offsetLeft, gameScreen.clientWidth);
    let circleYCoordinate = getRandomInteger(gameScreen.offsetTop, gameScreen.clientHeight);
    let circleRadius = Math.floor(Math.random() * 100) + 10;

    //Plotting the circle with the derived values.
    plotCircle(circle, circleXCoordinate, circleYCoordinate, circleRadius);

    //If click is done on the circle, then update score.
    //Comparing event.target.id with "circle".
    if (event.target.id == "circle") {
        updateScore();
    }
}

function plotCircle(circle, x, y, r) {

    //Adding top, left, height, width properties to the circle.
    circle.setAttribute("style", `left : ${x - r}px; top : ${y - r}px; height: ${r}px; width: ${r}px;`);

    //Plotting the circle to the screen.
    gameScreen.append(circle);
}

//Score updater
function updateScore() {
    score++;
    scoreSpan.innerHTML = score;
}

//Timer
function timer() {
    if (time > 0) {
        time--;
        timeSpan.innerHTML = time;
    }
    else {
        gameOver();
    }
}

function gameOver() {
    //Removing the last circle from the screen.
    document.getElementById("circle").remove();

    //Stopping setInterval on timer function.
    clearInterval(game);

    //Removing event listener from game screen.
    gameScreen.removeEventListener("click", createCircle);

    //Creating and adding game over message.
    let gameOverText = document.createElement("div");
    gameOverText.id = "game-over";
    gameOverText.innerHTML = `
        <h1> Game Over ! </h1>
        <p> ${score} successful clicks in ${initialTime} seconds.</p>
        <button id="replay-on-screen">Replay</button>
    `
    gameScreen.append(gameOverText);

    //Adding event listener to the on screen "Replay button".
    document.getElementById("replay-on-screen").addEventListener("click", () => location.reload());
}


//External functions.
//Random value function
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
