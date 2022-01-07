var positions = [[0, 0, 0, 0],
[0, 0, 0, 0],
[0, 0, 0, 0],
[0, 0, 0, 0]];
var ifAdded = [[0, 0, 0, 0],
[0, 0, 0, 0],
[0, 0, 0, 0],
[0, 0, 0, 0]];

$("body").append("<div id = \"container\"></div>");

$("#container").append("<div id = \"title\">2048</div>").append("<div id = \"grid\"></div>");
for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
        $("#grid").append("<div class = \"square free\" id = \"s" + i + j + "\"></div>");
    }
}

function FirstRandom() {
    let place = Math.floor(Math.random() * 16).toString()
    place = (Math.floor(place/4)).toString() + (place % 4).toString();
    let random = "#s" + place;
    let randomNumber = Math.random();
    if (randomNumber <= 0.9) {
        randomNumber = "2";
    } else {
        randomNumber = "4";
    }

    if($(random).hasClass("free")) {
        $(random).removeClass("free").append("<div class = \" block n" + randomNumber + "\">" + randomNumber + "</div>");
        let x = place[0]
        let y = place[1]
        positions[x][y] = randomNumber;
    } else {
        FirstRandom();
    }

}

FirstRandom();
FirstRandom();

function Move(up, right) {
    let direction;
    if (right) {
        if (right === 1) {
            direction = 3;
        } else {
            direction = 0;
        }
        $(".block").each(function(){
            let parentPos = $(this).parent().attr("id");
            let newPos = parentPos[1] + direction.toString();
            $("#s" + parentPos[1] + parentPos[2]).empty().addClass("free");

            positions[parseInt(parentPos[1])][parseInt(parentPos[2])] = 0;
            
            let a = parseInt(newPos[0]);
            let b = parseInt(newPos[1]);

            if($("#s" + newPos[0] + newPos[1]).hasClass("free")) {
                $("#s" + newPos[0] + newPos[1]).append($(this)).removeClass("free");
                positions[a][b] = $(this).html();
            } else if($("#s" + newPos[0] + Math.abs(b - 1)).hasClass("free")) {
                $("#s" + newPos[0] + Math.abs(b - 1)).append($(this)).removeClass("free");
                positions[a][Math.abs(b - 1)] = $(this).html();
            } else if($("#s" + newPos[0] + Math.abs(b - 2)).hasClass("free")) {
                $("#s" + newPos[0] + Math.abs(b - 2)).append($(this)).removeClass("free");
                positions[a][Math.abs(b - 2)] = $(this).html();
            } else if($("#s" + newPos[0] + Math.abs(b - 3)).hasClass("free")) {
                $("#s" + newPos[0] + Math.abs(b - 3)).append($(this)).removeClass("free");
                positions[a][Math.abs(b - 3)] = $(this).html();
            }
        });
    }

    if (up) {
        if (up === 1) {
            direction = 0;
        } else {
            direction = 3;
        }
        $(".block").each(function(){
            let parentPos = $(this).parent().attr("id");
            let newPos = direction.toString() + parentPos[2];
            $("#s" + parentPos[1] + parentPos[2]).empty().addClass("free");

            positions[parseInt(parentPos[1])][parseInt(parentPos[2])] = 0;
            
            let a = parseInt(newPos[0]);
            let b = parseInt(newPos[1]);

            if($("#s" + newPos[0] + newPos[1]).hasClass("free")) {
                $("#s" + newPos[0] + newPos[1]).append($(this)).removeClass("free");
                positions[a][b] = $(this).html();
            } else if($("#s" + Math.abs(a - 1) + newPos[0]).hasClass("free")) {
                $("#s" + Math.abs(a - 1) + newPos[0]).append($(this)).removeClass("free");
                positions[Math.abs(a - 1)][b] = $(this).html();
            } else if($("#s" + Math.abs(a - 2) + newPos[0]).hasClass("free")) {
                $("#s" + Math.abs(a - 2) + newPos[0]).append($(this)).removeClass("free");
                positions[Math.abs(a - 2)][b] = $(this).html();
            } else if($("#s" + Math.abs(a - 3) + newPos[0]).hasClass("free")) {
                $("#s" + Math.abs(a - 3) + newPos[0]).append($(this)).removeClass("free");
                positions[Math.abs(a - 3)][b] = $(this).html();
            }
        });
    }
}


$("body").keyup(function(event) {
    let key = event.key;
    switch(key) {
        case "ArrowUp":
            console.log("up");

            Move(1, 0);
            FirstRandom();
            break;
        case "ArrowDown":
            console.log("down");
            
            Move(-1, 0);
            FirstRandom();
            break;
        case "ArrowRight":
            console.log("right");
            
            Move(0, 1);
            FirstRandom();
            break;
        case "ArrowLeft":
            console.log("left");
            
            Move(0, -1);
            FirstRandom();
            break;
    }
});