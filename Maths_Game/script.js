//javascript.js
var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;

//if we click on the start/reset
document.getElementById("startreset").onclick = function () {
    if (playing == true) {
        location.reload();
    } else {
        playing = true;
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
     show("timeremaining");
        timeremaining = 60;
        document.getElementById("Timeremainingvalue").innerHTML = timeremaining;
        hide("gameOver");
  document.getElementById("startreset").innerHTML = "Reset Game";
        startCountdown();
   generateQA();
    }
}

for (i = 1; i < 5; i++) {
    document.getElementById("o" + i).onclick = function () {    
        if (playing == true) {//yes
            if (this.innerHTML == correctAnswer) {
                score++;
                document.getElementById("scorevalue").innerHTML = score;
                hide("wrong");
                show("correct");
                setTimeout(function () {
                    hide("correct");
                }, 1000);
                generateQA();
            } else {
                //wrong answer
                hide("correct");
                show("wrong");
                setTimeout(function () {
                    hide("wrong");
                }, 1000);
            }
        }
    }
}

function startCountdown() {
    action = setInterval(function () {
        timeremaining -= 1;
        document.getElementById("Timeremainingvalue").innerHTML = timeremaining;
        if (timeremaining == 0) {// game over
            stopCountdown();
            show("gameOver");
            document.getElementById("gameOver").innerHTML = "<p>Game over!</p><p>Your score is " + score + ".</p>";
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    }, 1000);
}

//stop counter

function stopCountdown() {
    clearInterval(action);
}

//hide an element

function hide(Id) {
    document.getElementById(Id).style.display = "none";
}

//show an element

function show(Id) {
    document.getElementById(Id).style.display = "block";
}

//generate question and multiple answers

function generateQA() {
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    correctAnswer = x * y;
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = 1 + Math.round(3 * Math.random());
    document.getElementById("o" + correctPosition).innerHTML = correctAnswer; //fill one box with the correct answer

    //fill other boxes with wrong answers

    var answers = [correctAnswer];

    for (i = 1; i < 5; i++) {
        if (i != correctPosition) {
            var wrongAnswer;
            do {
                wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random())); //a wrong answer
            } while (answers.indexOf(wrongAnswer) > -1)
            document.getElementById("o" + i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}