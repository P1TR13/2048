$("body").append("<div id = \"container\"></div>");

$("#container").append("<div id = \"title\">2048</div>").append("<div id = \"grid\"></div>");
for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
        $("#grid").append("<div class = \"square free\" id = \"s" + (i * 4 + j) + "\"></div>");
    }
}

function getRandomNumberBetween(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function FirstRandom() {
    let random = "#s" + Math.floor(Math.random() * 16).toString();
    let randomNumber = Math.random();
    if (randomNumber <= 0.9) {
        randomNumber = "2";
    } else {
        randomNumber = "4";
    }

    if($(random).hasClass("free")) {
        $(random).removeClass("free").addClass("n" + randomNumber).html(randomNumber);
    } else {
        FirstRandom();
    }

}

FirstRandom();
FirstRandom();

$("body").keyup(function(event) {
    let key = event.key;
    switch(key) {
        case "ArrowUp":
            console.log("up");
            FirstRandom();
            break;
        case "ArrowDown":
            console.log("down");
            FirstRandom();
            break;
        case "ArrowRight":
            console.log("right");
            FirstRandom();
            break;
        case "ArrowLeft":
            console.log("left");
            FirstRandom();
            break;
    }
});