let ball = document.querySelector('.cube');
let wall = document.querySelector('.wall');
let area = document.querySelector('.area');
let output = document.querySelector('.output'); 
let tpIn = document.querySelector('#tpInTrigger');
let tpOut = document.querySelector('#tpOut');
let laser = document.querySelector('#laser');
let finish = document.querySelector('#finishTrigger');
let beta;
let gamma;
let stopTheBall = false;
let finishCount = 0;
let startFunctionChangeBallPosition = true;
let startingTime = Date.now();
let finishTime = "-";
let ballTopPosition = 50;
let ballLeftPosition = 50;
function handleOrientation(event) {
    beta = event.beta;
    gamma = event.gamma;
    stopTheBall = false;
    if (startFunctionChangeBallPosition) {
        startFunctionChangeBallPosition = false;
        changeBallPositon();
    }
}

function changeBallPositon() {
    setTimeout(function () {
        if (beta < -0.001) {
            ballTopPosition -= (0.1 * (beta * (-0.1)));
            if (ballTopPosition < 0) ballTopPosition = 0;
        }

        if (beta > 0.001) {
            ballTopPosition += (0.1 * beta);
            if (ballTopPosition > 600) ballTopPosition = 600;
        }

        if (gamma < -0.001) {
            ballLeftPosition -= (0.1 * (gamma * (-0.1)));
            if (ballLeftPosition < 0) ballLeftPosition = 0;
        }

        if (gamma > 0.001) {
            ballLeftPosition += (0.1 * gamma);
            if (ballLeftPosition > 800) ballLeftPosition = 800;
        }

        ball.style.top = ballTopPosition + "px";
        ball.style.left = ballLeftPosition + "px";
        checkCollisions();
        document.getElementById("timer").innerHTML = "Timer: " + ((Date.now() - startingTime) / 1000).toFixed(2) + " sec\nBest time: " + finishTime;
        if (stopTheBall) return;
        changeBallPositon();
    }, 10)
}

function checkCollisions() {
    if (isCollision(ball, tpIn)) {   
        var pos = tpOut.getBoundingClientRect();
        ballTopPosition = pos.top;
        ballLeftPosition = pos.left;
    }

    if (isCollision(ball, laser)) {   
        alert("dead");
        restart();
    }

    if (isCollision(ball, finish)) {
        stopTheBall = true;
        finishCount++;
        if (finishCount == 1)
            finishTime = ((Date.now() - startingTime) / 1000).toFixed(2);
        else {
            if (((Date.now() - startingTime) / 1000) < finishTime) finishTime = ((Date.now() - startingTime) / 1000).toFixed(2);
        }
    }
}

function isCollision(obj1, obj2) {
    let object_1 = obj1.getBoundingClientRect();
    let object_2 = obj2.getBoundingClientRect();
    if (object_1.left < object_2.left + object_2.width && object_1.left + object_1.width > object_2.left &&
        object_1.top < object_2.top + object_2.height && object_1.top + object_1.height > object_2.top)
        return true;
    else return false;
}

function restart() {
    ballTopPosition = 50;
    ballLeftPosition = 50;
    beta = 0;
    gamma = 0;
    changeBallPositon();
    startFunctionChangeBallPosition = true;
    stopTheBall = true;
    startingTime = Date.now();
}
window.addEventListener('deviceorientation', handleOrientation);