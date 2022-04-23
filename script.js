let board = document.getElementById('board');

function makeBoard() {
    for (let i = 0; i < 16; i++) {
        let emptySquare = document.createElement('div');
        emptySquare.classList.add('square');
        board.appendChild(emptySquare);
    }
}

// On Load
makeBoard();