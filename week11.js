//the array.from function allows us to convert everything to a proper array
const tiles = Array.from(document.querySelectorAll('.tile'));
const playerDisplay = document.querySelector('.display-player');
const resetButton = document.querySelector('#reset');
const announcer = document.querySelector('.announcer');
// the array of empty strings acts as the game board
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;
//game over alert stating the outcome of the match
const PLAYERX_WON = 'PLAYERX_WON';
const PLAYERO_WON = 'PLAYERO_WON';
const TIE = 'TIE';

/*
    Gameboard indexes
    [0] [1] [2]
    [3] [4] [5]
    [6] [7] [8]
*/
//these are the combinations in order to win
const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
//this function checks for winning conditions with a for loop and nested if loops using previous arrays to determine who won
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
        isGameActive = false;
        return;
    }
    if (!board.includes('')) {
        announce(TIE);
    }
}
//this checks if the tile has a current value or not (has been clicked on)
const isValidAction = (tile) => {
    if (tile.innerText === 'X' || tile.innerText === 'O') {
        return false;
    }
    return true;
}

const updateBoard = (index) => {
    board[index] = currentPlayer;
}
//this function changes between the players
const changePlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
}
//this function represents a turn during the game by checking if the game is active and if there was a valid action
const userAction = (tile, index) => {
    if (isValidAction(tile) && isGameActive) {
        tile.innerText = currentPlayer;
        tile.classList.add(`player${currentPlayer}`);
        updateBoard(index);
        handleResultValidation();
        changePlayer();
    }
}
//this adds a click event listener to each tile with the userAction function
tiles.forEach( (tile, index) => {
    tile.addEventListener('click', () => userAction(tile, index));
})
//this announces the winner of the match
const announce = (type) => {
    switch(type) {
        case PLAYERO_WON:
            announcer.innerHTML = 'Player <span class="playerO">O</span> Won!';
            break;
        case PLAYERX_WON:
            announcer.innerHTML = 'Player <span class="playerX">X</span> Won!';
            break;
        case TIE:
            announcer.innerText = 'Tie!'       
    }
    announcer.classList.remove('hide');
}
//this resets the board to empty when the reset button is clicked
const resetBoard = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    announcer.classList.add('hide');

    if (currentPlayer === 'O') {
        changePlayer();
    }

    tiles.forEach(tile => {
        tile.innerText = '';
        tile.classList.remove('playerX');
        tile.classList.remove('playerO');
    });
}

resetButton.addEventListener('click', resetBoard);