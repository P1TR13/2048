const boardSize = 16;
let currentScore = 0;

let positions = {
    currentPosition: [],
    lastPosition: [],
    ifItemsWereAdded: [],
};

class block {
    constructor(number) {
        this.number = Math.pow(2, number);
    }

    createBlock(squareID) {
        $('#square' + squareID).append('<div class = \'block n' + this.number + '\'>' + this.number + '</div>')
    }

    moveUp(direction) {
        if (direction) console.log("Move up");
        else console.log("Move down");
    }

    moveRight(direction) {
        if (direction) console.log("Move right");
        else console.log("Move left");
    }
}

function makeBoardWithEmptySquares() {
    for (let i = 0; i < boardSize; i++) {
        $('#board').append('<div class = \'square\' id = \'square' + i + '\'> </div>')
    }
    initialPosition();
    $('#newGameButton').click(initialPosition);
    makeBlock();
}

function initialPosition() {
    for (let i = 0; i < boardSize; i++) {
        positions.currentPosition[i] = 0;
        positions.lastPosition[i] = 0;
        positions.ifItemsWereAdded[i] = 0;
    }

    currentScore = 0;
    $('#currentScore').html(currentScore);
    $('#newGameButton').html('New Game');
}

function makeBlock() {
    let newBlock = new block(gettingRandomNumber(1, 2));
    newBlock.createBlock(gettingRandomNumber(0, 16));
    addMovingToBlock(newBlock);
}

function addMovingToBlock(block) {
    $('body').keyup(function(event) {
        let key = event.key;
        console.log(key);
        switch(key) {
            case "ArrowUp":
                block.moveUp(1);
                break;
            case "w":
                block.moveUp(1);
                break;
            case "ArrowDown":
                block.moveUp(-1);
                break;
            case "s":
                block.moveUp(-1);
                break;
            case "ArrowRight":
                block.moveRight(1);
                break;
            case "d":
                block.moveRight(1);
                break;
            case "ArrowLeft":
                block.moveRight(-1);
                break;
            case "a":
                block.moveRight(-1);
                break;
        }
    });
}

function gettingRandomNumber(from, to) {
    return Math.floor(from + Math.random() * to);
}


// On Load
makeBoardWithEmptySquares();