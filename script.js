const boardSize = 16;
let currentScore = 0;
let activeBlocks = {};

let positions = {
    currentPosition: [],
    lastPosition: [],
    ifItemsWereAdded: [],
    blocksToMove: [],
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
        positions.blocksToMove = [];

        if (direction) console.log("Move up");
        else console.log("Move down");
    }

    moveRight(direction) {
        positions.blocksToMove = [];

        if (direction) {
            this.move(3, -1);
        } else {
            this.move(0, 1);
        }
    }

    move(from, direction) {
        if(this.position != Math.floor(this.position / 4) * 4 + from) {
            activeBlocks[this.position] = '';
            this.position = Math.floor(this.position / 4) * 4 + from
            while (activeBlocks[this.position]) this.position += direction;
            activeBlocks[this.position] = this;
        }
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

    activeBlocks = {};

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
        
            activeBlocks[positionForNewBlock] = newBlock;
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
    Object.values(activeBlocks).forEach(oneBlock => {
        if (oneBlock != '') {
            if (key == "ArrowUp" || key == "w") oneBlock.moveUp(1);
            else if (key == "ArrowDown" || key == "s") oneBlock.moveUp(0);
            else if (key == "ArrowRight" || key == "d") oneBlock.moveRight(1);
            else if (key == "ArrowLeft" || key == "a") oneBlock.moveRight(0);
        }
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