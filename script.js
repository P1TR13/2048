const boardSize = 16;
let currentScore = 0;
let activeBlocks = [];

let positions = {
    currentPosition: [],
    lastPosition: [],
    ifItemsWereAdded: [],
};

class block {
    constructor(number, position) {
        this.number = Math.pow(2, number);
        this.position = position;
    }

    createBlock(squareID) {
        $('#square' + squareID).append('<div class = \'block n' + this.number + '\'>' + this.number + '</div>')
    }

    moveUp(direction) {
        if (direction == 1) console.log("Move up");
        else console.log("Move down");
    }

    moveRight(direction) {
        if (direction == 1) console.log("Move right");
        else console.log("Move left");
    }
}

function makeBoardWithEmptySquares() {
    for (let i = 0; i < boardSize; i++) {
        $('#board').append('<div class = \'square\' id = \'square' + i + '\'> </div>')
    }
    clearBoardAndStartNewGame();
}

function clearBoardAndStartNewGame() {
    $('.block').remove();
    initialPosition();
    makeBlock(2);
}

function initialPosition() {
    for (let i = 0; i < boardSize; i++) {
        positions.currentPosition[i] = 0;
        positions.lastPosition[i] = 0;
        positions.ifItemsWereAdded[i] = 0;
    }

    while (activeBlocks.length) activeBlocks.pop();

    currentScore = 0;
    $('#currentScore').html(currentScore);
    $('#newGameButton').html('New Game');
}

function makeBlock(howManyBlocks) {
    for (let i = 0; i < howManyBlocks; i++) {
        
        let positionForNewBlock = gettingRandomNumber(0, 16);
        if (!checkIfSquareIsEmpty(positionForNewBlock)){
            let numberForNewBlock = gettingRandomNumber(0, 10);
            if (numberForNewBlock == 9) numberForNewBlock = 2;
            else numberForNewBlock = 1;

            let newBlock = new block(numberForNewBlock, positionForNewBlock);
            newBlock.createBlock(positionForNewBlock);
            positions.currentPosition[positionForNewBlock] = numberForNewBlock;
        
            activeBlocks.push(newBlock);
        }
        else {
            makeBlock(1);
        }
    }
}

function checkIfSquareIsEmpty(squareID) {
    return $('#square' + squareID).children().length;
}

function addMovementToBlock(event) {
    let key = event.key;
    activeBlocks.forEach(oneBlock => {
        console.log(oneBlock);
        if (key == "ArrowUp" || key == "w") oneBlock.moveUp(1);
        else if (key == "ArrowDown" || key == "s") oneBlock.moveUp(-1);
        else if (key == "ArrowRight" || key == "d") oneBlock.moveRight(1);
        else if (key == "ArrowLeft" || key == "a") oneBlock.moveRight(-1);

    });
}

function gettingRandomNumber(from, to) {
    return Math.floor(from + Math.random() * to);
}


// On Load
makeBoardWithEmptySquares();
$('#newGameButton').click(clearBoardAndStartNewGame);
$('body').keyup(function(event) {
    addMovementToBlock(event);
});