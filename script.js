const boardSize = 16;
let ifChanged = 0;
let activeBlocks = {};

let score = {
    current: 0,
    move: 0,
    best: 0,
    last: 0,
};

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
        this.added = 0;
    }

    createBlock(squareID) {
        $('#square' + squareID).append('<div class = \'justCreated block n' + this.number + '\'>' + this.number + '</div>')
    }

    moveUp(direction) {
        $('#square' + this.position).empty();
        positions.blocksToMove = [];

        if (direction) {
            this.moveVertical(0, -1);
        } else {
            this.moveVertical(3, 1);
        }

        this.changeParent();
    }

    moveRight(direction) {
        $('#square' + this.position).empty();
        positions.blocksToMove = [];

        if (direction) {
            this.moveHorizontal(3, 1);
        } else {
            this.moveHorizontal(0, -1);
        }

        this.changeParent();
    }

    moveHorizontal(from, direction) {
        this.added = 0;
        while (this.position != Math.floor(this.position / 4) * 4 + from && !activeBlocks[this.position + direction]) {
            activeBlocks[this.position] = '';
            this.position += direction;
            ifChanged = 1;
            activeBlocks[this.position] = this;
        }
        if (this.position != Math.floor(this.position / 4) * 4 + from && activeBlocks[this.position + direction].number == activeBlocks[this.position].number) if(!activeBlocks[this.position + direction].added) this.add(direction, 1);
    }

    moveVertical(from, direction) {
        this.added = 0;
        while (this.position != Math.floor(this.position % 4) + from * 4 && !activeBlocks[this.position + direction * 4]) {
            activeBlocks[this.position] = '';
            this.position += direction * 4;
            ifChanged = 1;
            activeBlocks[this.position] = this;
        }
        if (this.position != Math.floor(this.position % 4) + from * 4 && activeBlocks[this.position + direction * 4].number == activeBlocks[this.position].number) if (!activeBlocks[this.position + direction * 4].added) this.add(direction, 4);
    }

    add(direction, destination) {
        activeBlocks[this.position] = '';
        this.position += direction * destination;
        this.number += this.number;
        this.added = 1;
        activeBlocks[this.position] = this;
        $('#square' + this.position).empty();
        ifChanged = 1;
        score.move += this.number;
    }

    changeParent() {
        $('#square' + this.position).append('<div class = \'block n' + this.number + '\'>' + this.number + '</div>');
        if (this.added) $('#square' + this.position).children().addClass('justAdded');
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
    ifChanged = 0;
    let key = event.key;
    if (key == "ArrowRight" || key == "d") {
        Object.values(activeBlocks).slice().reverse().forEach(oneBlock => {
            if (oneBlock != '') oneBlock.moveRight(1);
        });
        if(ifChanged) makeBlock(1);
    }
    else if (key == "ArrowLeft" || key == "a") {
        Object.values(activeBlocks).forEach(oneBlock => {
            if (oneBlock != '') oneBlock.moveRight(0);
        });
        if(ifChanged) makeBlock(1);
    }
    else if (key == "ArrowDown" || key == "s") {
        Object.values(activeBlocks).slice().reverse().forEach(oneBlock => {
            if (oneBlock != '') oneBlock.moveUp(0);
        });
        if(ifChanged) makeBlock(1);
    }
    else if (key == "ArrowUp" || key == "w") {
        Object.values(activeBlocks).forEach(oneBlock => {
            if (oneBlock != '') oneBlock.moveUp(1);
        });
        if(ifChanged) makeBlock(1);
    }
    score.current += score.move;
    score.move = 0;
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