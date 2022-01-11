var lastPosition = [[0, 0, 0, 0],
[0, 0, 0, 0],
[0, 0, 0, 0],
[0, 0, 0, 0]];

var positions = [[0, 0, 0, 0],
[0, 0, 0, 0],
[0, 0, 0, 0],
[0, 0, 0, 0]];
var ifAdded = [[0, 0, 0, 0],
[0, 0, 0, 0],
[0, 0, 0, 0],
[0, 0, 0, 0]];

var isEnd = [[0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0]];

var positionBefore = [[0, 0, 0, 0],
[0, 0, 0, 0],
[0, 0, 0, 0],
[0, 0, 0, 0]];

var isNotFirstMove = 0;
var lastAddedPoints = 0;

var NotGameOver = 1;

if (localStorage.getItem("positionBefore")) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            positionBefore[i][j] = parseInt(localStorage.getItem("positionBefore")[i * 4 + j]);
        }
    }
}


$("body").append("<div id = \"container\"></div>");

$("#container").append("<div id = \"heading\"></div>").append("<div id =\"end\"></div>").append("<div id = \"grid\"></div>");

for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
        $("#grid").append("<div class = \"square free\" id = \"s" + i + j + "\"></div>");
    }
}



$("#heading").append("<div id = \"title\">2048</div>").append("<div id = \"scores\"></div>").append("<div id = \"newGame\"></div>");
$("#scores").append("<div id =\"currentScore\"><p class = \"name\">SCORE</p> <p class = \"score\">0</p></div>").append("<div id =\"bestScore\"><p class = \"name\">BEST</p> <p class = \"score\">0</p></div>");

if(localStorage.getItem("bestScore") > 0) {
    $("#bestScore").children(".score").html(localStorage.getItem("bestScore"));
}




$("#newGame").append("<button class = \"undoButton\">Undo</button>").append("<button class = \"newGameButton\">New Game</button>");

function FirstRandom() {
    let place = Math.floor(Math.random() * 16).toString();
    place = (Math.floor(place/4)).toString() + (place % 4).toString();
    let random = "#s" + place;
    let randomNumber = Math.random();
    if (randomNumber <= 0.9) {
        randomNumber = "1";
    } else {
        randomNumber = "2";
    }

    if($(random).hasClass("free")) {
        let power = Math.pow(2, parseInt(randomNumber));
        $(random).removeClass("free").append("<div class = \" justCreated block n" + power + "\">" + power + "</div>");
        let x = place[0];
        let y = place[1];
        positions[x][y] = parseInt(randomNumber);
        localStorage.setItem("position", positions);
        localStorage.setItem("currentScore", parseInt($("#currentScore").children(".score").html()));
    } else {
        FirstRandom();
    }

}

if(localStorage.getItem("position")) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            positions[i][j] = parseInt(localStorage.getItem("position")[2 * (i * 4 + j)])
        }
    }
    Draw();
    if(localStorage.getItem("currentScore")) {
        $("#currentScore").children(".score").html(localStorage.getItem("currentScore"));
    }
} else {
    FirstRandom();
    FirstRandom();
}


var pointsThisRound = 0;

function Move(dir) {
    if (NotGameOver) {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                positionBefore[i][j] = positions[i][j];
            }
        }
        let posB = "";
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                posB += positionBefore[i][j];
            }
        }
        localStorage.setItem("positionBefore", posB);
    }
    

    let score = parseInt($("#currentScore").children(".score").html());
    switch(dir) {
        case 1:
            for (let j = 3; j >= 0; j--) {
                let rowString = "";
                let x = 0;
                for (let i = 0; i < 4; i++) {
                    if (positions[i][j] !== 0) {
                        rowString += (positions[i][j]).toString(16);
                        positions[i][j] = 0;
                    }
                }
                for (let k = 0; k <= rowString.length - 1; k++) {
                    positions[x][j] = parseInt(rowString[k], 16);
                    if (x !== 0) {
                        if (positions[x - 1][j] === positions[x][j]) {
                            if (ifAdded[x - 1][j] === 0) {
                                positions[x - 1][j]++;
                                positions[x][j] = 0;
                                ifAdded[x - 1][j] = 1;
                                score += Math.pow(2, positions[x - 1][j]);
                                pointsThisRound += Math.pow(2, positions[x - 1][j]);
                            } else {
                                x++;
                            }
                        } else {
                            x++;
                        }
                    } else {
                        x++;
                    }
                    
                }
            }
            break;

        case 2:
            for (let j = 0; j < 4; j++) {
                let rowString = "";
                let x = 3;
                for (let i = 3; i >= 0; i--) {
                    if (positions[i][j] !== 0) {
                        rowString += (positions[i][j]).toString(16);
                        positions[i][j] = 0;
                    }
                }
                for (let k = 0; k <= rowString.length - 1; k++) {
                    positions[x][j] = parseInt(rowString[k], 16);
                    if (x !== 3) {
                        if (positions[x + 1][j] === positions[x][j]) {
                            if (ifAdded[x + 1][j] === 0) {
                                positions[x + 1][j]++;
                                positions[x][j] = 0;
                                ifAdded[x + 1][j] = 1;
                                score += Math.pow(2, positions[x + 1][j]);
                                pointsThisRound += Math.pow(2, positions[x + 1][j]);
                            } else {
                                x--;
                            }
                        } else {
                            x--;
                        }
                    } else {
                        x--;
                    }
                }
            }
            break;
        
        
        case 3:
            for (let i = 0; i < 4; i++) {
                let rowString = "";
                let x = 3;
                for (let j = 3; j >= 0; j--) {
                    if (positions[i][j] !== 0) {
                        rowString += (positions[i][j]).toString(16);
                        positions[i][j] = 0;
                    }
                }
                for (let k = 0; k <= rowString.length - 1; k++) {
                    positions[i][x] = parseInt(rowString[k], 16);
                    if (x !== 3) {
                        if (positions[i][x + 1] === positions[i][x]) {
                            if (ifAdded[i][x + 1] === 0) {
                                positions[i][x + 1]++;
                                positions[i][x] = 0;
                                ifAdded[i][x + 1] = 1;
                                score += Math.pow(2, positions[i][x + 1]);
                                pointsThisRound += Math.pow(2, positions[i][x + 1]);
                            } else {
                                x--;
                            }
                        } else {
                            x--;
                        }
                    } else {
                        x--;
                    }
                }
            }
            break;
        
        case 4:
            for (let i = 3; i >= 0; i--) {
                let rowString = "";
                let x = 0;
                for (let j = 0; j < 4; j++) {
                    if (positions[i][j] !== 0) {
                        rowString += (positions[i][j]).toString(16);
                        positions[i][j] = 0;
                    }
                }
                for (let k = 0; k <= rowString.length - 1; k++) {
                    positions[i][x] = parseInt(rowString[k], 16);
                    if (x !== 0) {
                        if (positions[i][x - 1] === positions[i][x]) {
                            if (ifAdded[i][x - 1] === 0) {
                                positions[i][x - 1]++;
                                positions[i][x] = 0;
                                ifAdded[i][x - 1] = 1;
                                score += Math.pow(2, positions[i][x - 1]);
                                pointsThisRound += Math.pow(2, positions[i][x - 1]);
                            } else {
                                x++;
                            }
                        } else {
                            x++;
                        }
                    } else {
                        x++;
                    }
                }
            }
            break;
    }

    $("#currentScore").children(".score").html(score);
    if (score > parseInt($("#bestScore").children(".score").html())) {
        $("#bestScore").children(".score").html(score);
        localStorage.setItem("bestScore", score);
    }
    isNotFirstMove = 1;
}

function Draw() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            $("#s" + i + j).addClass("free").empty();
            if (positions[i][j] !== 0) {
                let number = Math.pow(2, positions[i][j]);
                $("#s" + i + j).append("<div class = \" block n" + number + "\">" + number + "</div>").removeClass("free");
                if (ifAdded[i][j]) {
                    $("#s" + i + j).children().addClass("justAdded");
                }
            }
            
        }
    }
}

function isGameOver() {
    for (let i = 0; i <= 3; i++) {
        for (let j = 0; j <= 3; j++) {
            isEnd[i + 1][j + 1] = positions[i][j];
        }
    }
    let howMany = 0;

    for (let i = 1; i < 5; i++) {
        for (let j = 1; j < 5; j++) {
            if (isEnd[i][j] == isEnd[i - 1][j]) {
                howMany++;
            }

            if (isEnd[i][j] == isEnd[i + 1][j]) {
                howMany++;
            }
            if (isEnd[i][j] == isEnd[i][j - 1]) {
                howMany++;
            }
            if (isEnd[i][j] == isEnd[i][j + 1]) {
                howMany++;
            }
        }
    }

    if(!howMany) {
        if ($("#end").children().length == 0) {
            NotGameOver = 0;
            $("#end").append("<div id = \"gameOver\"><p>Game over!</p> <button class =\"newGameButton\">Try again</button> <button class =\"undoButton\">Undo</button></div>");
            $(".newGameButton").click(function() {
                $("#gameOver").remove();
            
                $("#currentScore").children(".score").html("0");
                for (let i = 0; i < 4; i++) {
                    for (let j = 0; j < 4; j++) {
                        positions[i][j] = 0;
                    }
                }
                for (let i = 0; i < 4; i++) {
                    for (let j = 0; j < 4; j++) {
                        lastPosition[i][j] = 0;
                    }
                }
                for (let i = 0; i < 4; i++) {
                    for (let j = 0; j < 4; j++) {
                        ifAdded[i][j] = 0;
                    }
                }
                Draw();
                FirstRandom();
                FirstRandom();
                NotGameOver = 1;
            });

            $(".undoButton").click(function() {
                $("#gameOver").remove();
                if (isNotFirstMove) {
                    for (let i = 0; i < 4; i++) {
                        for (let j = 0; j < 4; j++) {
                            positions[i][j] = positionBefore[i][j];
                        }
                    }
                    Draw();
                    NotGameOver = 1;
                    if (localStorage.getItem("lastPoints")) {
                        let score = localStorage.getItem("lastPoints");
                        $("#currentScore").children(".score").html(score);
                    }
                }
            });
        }
        
    } else {
        return;
    }
}


$("body").keyup(function(event) {
    $('.thisRoundPoints').remove();
    pointsThisRound = 0;
    let key = event.key;
    
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            lastPosition[i][j] = positions[i][j];
        }
    }

    switch(key) {
        case "ArrowUp":
            Move(1);
            Draw();
            break;
        case "ArrowDown":
            Move(2);
            Draw();
            break;
        case "ArrowRight":
            Move(3);
            Draw();   
            break;
        case "ArrowLeft":
            Move(4);
            Draw();
            break;
    }
    
    let different = 0;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if(lastPosition[i][j] != positions[i][j]) {
                different++;
            }
        }
    }


    if (different) {
        FirstRandom();
        isGameOver();
    }
    

    for (let i = 0; i <= 3; i++) {
        for (let j = 0; j <= 3; j++) {
            ifAdded[i][j] = 0;
        }
    }
    
    if (pointsThisRound) {
        $("#currentScore").append("<div class = \"thisRoundPoints\">+" + pointsThisRound + "</div>");

        $('.thisRoundPoints').bind('animationend', function(e) { 
            $(this).remove(); 
        });
    }

    let score = parseInt($("#currentScore").children(".score").html());
    lastAddedPoints = score - pointsThisRound;
    localStorage.setItem("lastPoints", lastAddedPoints);
});

$(".newGameButton").click(function() {
    $("#gameOver").remove();

    $("#currentScore").children(".score").html("0");
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            positions[i][j] = 0;
        }
    }
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            lastPosition[i][j] = 0;
        }
    }
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            ifAdded[i][j] = 0;
        }
    }
    Draw();
    FirstRandom();
    FirstRandom();
    isNotFirstMove = 0;
});

$(".undoButton").click(function() {
    if (isNotFirstMove) {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                positions[i][j] = positionBefore[i][j];
            }
        }
        localStorage.setItem("position", positions);
        if (localStorage.getItem("lastPoints")) {
            let score = localStorage.getItem("lastPoints");
            $("#currentScore").children(".score").html(score);
        }
        
        Draw();
    }
});

for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
        if (positions[i][j] != 0) {
            isNotFirstMove = 1;
        }
    }
}