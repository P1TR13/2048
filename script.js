const boardSize = 16;

let positions = {
    currentPosition: [],
    lastPosition: [],
    ifItemsWereAdded: [],
};

function makeBoardWithEmptySquares() {
    for (let i = 0; i < boardSize; i++) {
        $('#board').append('<div class = \'square\'> </div>')
    }
    makeEmptyPositions();
}

function makeEmptyPositions() {
    for (let i = 0; i < boardSize; i++) {
        positions.currentPosition[i] = 0;
        positions.lastPosition[i] = 0;
        positions.ifItemsWereAdded[i] = 0;
    }

    console.log(positions);
}

// On Load
makeBoardWithEmptySquares();