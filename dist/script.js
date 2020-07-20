let gameBoard = new Array(9).fill('');
let turn = 'X';
let winner;
let winConditions = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [6,4,2]];

function init() {
    gameBoard.forEach((tile, idx) => {
        const div = document.createElement('div');
        div.className = 'user-box';
        div.setAttribute('data-key', idx);
        div.addEventListener("click", userTurn);
        document.getElementById("App").appendChild(div);
    })
};

function render() {
    gameBoard.forEach((gameTile, idx) => {
        const box = document.querySelector(`[data-key="${idx}"]`); 
        box.innerHTML = gameTile;
    })
};

function userTurn(e) {
    let key = e.target.getAttribute('data-key');
    e.target.style.pointerEvents = "none";
    gameBoard[key] = turn;
    console.log(gameBoard);
    render();
    checkWinner();
};

function nextTurn () {
    turn = turn === 'X' ? 'O' : 'X';
};

function clearBoard() {
    document.getElementById('App').innerHTML = '';
    init();
};

function checkWinner() {
    // let winnerFound;
    // winConditions.forEach((wC) => {
    //     const [a, b, c] = wC;
    //     if (!winnerFound) {
    //         winnerFound = (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[c] === gameBoard[b])
    //     }
    // })

    // const winnerFound = winConditions.filter((wC) => {
    //     const [a, b, c] = wC;
    //     return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[c] === gameBoard[b]
    // }).length > 0

    // const winnerFound = winConditions.find((wC) => {
    //     const [a, b, c] = wC;
    //     return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[c] === gameBoard[b]
    // })

    const winnerFound = winConditions.reduce((cV, wC) => {
        const [a, b, c] = wC;
        return (cV || gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[c] === gameBoard[b])
    }, false)

    if (winnerFound) {
        console.log(`${turn} wins!`);
        gameBoard = new Array(9).fill('');
        clearBoard();
    } else {
        nextTurn();
    }
};

init();
