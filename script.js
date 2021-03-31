/*
We store our game status element here to allow us to more easily
use it later on
*/
let statusDisplay = document.querySelector('.game--status');
let firstScoreDisplay = document.querySelector('.game--1score');
let secondScoreDisplay = document.querySelector('.game--2score')
/*
Here we declare some variables that we will use to track the
game state throught the game.
*/
/*
We will use gameActive to pause the game in case of an end scenario
*/
let gameActive = true;
/*
We will store our current player here, so we know whos turn
*/
let currentPlayer = "X";
/*
We will store game scores here, so that we can keep track of the score
*/
let xScore = 0;
let oScore = 0;
/*
We will store our current game state here, the form of empty strings in an array
 will allow us to easily track played cells and validate the game state later on
*/
let gameState = ["", "", "", "", "", "", "", "", ""];
/*
Here we have declared some messages we will display to the user during the game.
Since we have some dynamic factors in those messages, namely the current player,
we have declared them as functions, so that the actual message gets created with
current data every time we need it.
*/
let winningMessage = () => `Player ${currentPlayer} has won!`;
let drawMessage = () => `Game ended in a draw!`;
let currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
/*
Here we declare the scores to display
*/
let player1Score = () => `Player One: ${xScore}`;
let player2Score = () => `Player Two: ${oScore}`;
/*
We set the inital message to let the players know whose turn it is
*/
statusDisplay.innerHTML = currentPlayerTurn();
firstScoreDisplay.innerHTML = player1Score();
secondScoreDisplay.innerHTML = player2Score();

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
}

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      let a = gameState[winCondition[0]];
      let b = gameState[winCondition[1]];
      let c = gameState[winCondition[2]];
      if (a === '' || b === '' || c === '') {
          continue;
      }
      if (a === b && b === c) {
          roundWon = true;
          break
      }
  }
if (roundWon) {
      statusDisplay.innerHTML = winningMessage();
      if (currentPlayer === "X") {
        xScore++;
        firstScoreDisplay.innerHTML = player1Score();
      } else {
        oScore++;
        secondScoreDisplay.innerHTML = player2Score();
      }
      gameActive = false;
      return;
  }
/*
We will check weather there are any values in our game state array
that are still not populated with a player sign
*/
  let roundDraw = !gameState.includes("");
  if (roundDraw) {
      statusDisplay.innerHTML = drawMessage();
      gameActive = false;
      return;
  }
/*
If we get to here we know that the no one won the game yet,
and that there are still moves to be played, so we continue by changing the current player.
*/
  handlePlayerChange();
}

function handleCellClick(e) {
  let clickedCell = e.target;
  let clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }
  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

function handleRestartGame() {
  gameActive = true;
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll('.cell')
  .forEach(cell => cell.innerHTML = "");
}
function handleCellPlayed(clickedCell, clickedCellIndex) {
/*
We update our internal game state to reflect the played move,
as well as update the user interface to reflect the played move
*/
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}
function handleResetScore() {
  xScore = 0;
  firstScoreDisplay.innerHTML = player1Score();
  oScore = 0;
  secondScoreDisplay.innerHTML = player2Score();
  return;
}
/*
And finally we add our event listeners to the actual game cells, as well as our
restart button
*/
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
document.querySelector('.game--reset').addEventListener('click', handleResetScore);