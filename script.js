const boardSize = 16;
let currentScore = 0;

let positions = {
    currentPosition: [],
    lastPosition: [],
    ifItemsWereAdded: [],
};

class block {
    constructor(number) {
        this.number = number;

        this.createBlock = function (squareID) {
            $('#square' + squareID).append('<div class = \'block n' + this.number + '\'>' + this.number + '</div>')
        }
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
    console.log(positions);

    currentScore = 0;
    $('#currentScore').html(currentScore);
    $('#newGameButton').html('New Game');
}

function makeBlock() {
    let newBlock = new block(2);
    newBlock.createBlock(4);
}


// On Load
makeBoardWithEmptySquares();