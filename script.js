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


$("body").append("<div id = \"container\"></div>");

$("#container").append("<div id = \"heading\"></div>").append("<div id = \"grid\"></div>");
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


$("#newGame").append("<button id = \"newGameButton\">New Game</button>");

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
    } else {
        FirstRandom();
    }

}

FirstRandom();
FirstRandom();

function Move(dir) {
    let score = parseInt($("#currentScore").children(".score").html());
    switch(dir) {
        case 1:
            for (let j = 3; j >= 0; j--) {
                let rowString = "";
                let x = 0;
                for (let i = 0; i < 4; i++) {
                    if (positions[i][j] !== 0) {
                        rowString += positions[i][j];
                        positions[i][j] = 0;
                    }
                }
                for (let k = 0; k <= rowString.length - 1; k++) {
                    positions[x][j] = parseInt(rowString[k]);
                    if (x !== 0) {
                        if (positions[x - 1][j] === positions[x][j]) {
                            if (ifAdded[x - 1][j] === 0) {
                                positions[x - 1][j]++;
                                positions[x][j] = 0;
                                ifAdded[x - 1][j] = 1;
                                score += Math.pow(2, positions[x - 1][j]);
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
                        rowString += positions[i][j];
                        positions[i][j] = 0;
                    }
                }
                for (let k = 0; k <= rowString.length - 1; k++) {
                    positions[x][j] = parseInt(rowString[k]);
                    if (x !== 3) {
                        if (positions[x + 1][j] === positions[x][j]) {
                            if (ifAdded[x + 1][j] === 0) {
                                positions[x + 1][j]++;
                                positions[x][j] = 0;
                                ifAdded[x + 1][j] = 1;
                                score += Math.pow(2, positions[x + 1][j]);
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
                        rowString += positions[i][j];
                        positions[i][j] = 0;
                    }
                }
                for (let k = 0; k <= rowString.length - 1; k++) {
                    positions[i][x] = parseInt(rowString[k]);
                    if (x !== 3) {
                        if (positions[i][x + 1] === positions[i][x]) {
                            if (ifAdded[i][x + 1] === 0) {
                                positions[i][x + 1]++;
                                positions[i][x] = 0;
                                ifAdded[i][x + 1] = 1;
                                score += Math.pow(2, positions[i][x + 1]);
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
                        rowString += positions[i][j];
                        positions[i][j] = 0;
                    }
                }
                for (let k = 0; k <= rowString.length - 1; k++) {
                    positions[i][x] = parseInt(rowString[k]);
                    if (x !== 0) {
                        if (positions[i][x - 1] === positions[i][x]) {
                            if (ifAdded[i][x - 1] === 0) {
                                positions[i][x - 1]++;
                                positions[i][x] = 0;
                                ifAdded[i][x - 1] = 1;
                                score += Math.pow(2, positions[i][x - 1]);
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


$("body").keyup(function(event) {
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
    }
    

    for (let i = 0; i <= 3; i++) {
        for (let j = 0; j <= 3; j++) {
            ifAdded[i][j] = 0;
        }
    }
    
});

$("#newGameButton").click(function() {
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
});