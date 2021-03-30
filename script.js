/*
We store our game status element here to allow us to more easily
use it later on
*/
var statusDisplay = document.querySelector('.game--status');
/*
Here we declare some variables that we will use to track the
game state throught the game.
*/
/*
We will use gameActive to pause the game in case of an end scenario
*/
var gameActive = true;
/*
We will store our current player here, so we know whos turn
*/
var currentPlayer = "X";
/*
We will store our current game state here, the form of empty strings in an array
 will allow us to easily track played cells and validate the game state later on
*/
var gameState = ["", "", "", "", "", "", "", "", ""];
/*
Here we have declared some messages we will display to the user during the game.
Since we have some dynamic factors in those messages, namely the current player,
we have declared them as functions, so that the actual message gets created with
current data every time we need it.
*/
var winningMessage = () => `Player ${currentPlayer} has won!`;
var drawMessage = () => `Game ended in a draw!`;
var currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
/*
We set the inital message to let the players know whose turn it is
*/
statusDisplay.innerHTML = currentPlayerTurn();


function handlePlayerChange() {} {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
}

var winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function handleResultValidation() {
  var roundWon = false;
  for (var i = 0; i <= 7; i++) {
    var winCondition = winningConditions[i];
    var a = gameState[winCondition[0]];
    var b = gameState[winCondition[1]];
    var c = gameState[winCondition[2]];
    if (a === '' || b === '' || c === '') {
      continue;
    }
    if (a === b && b === c) {
      roundWin = true;
      break;
    }
  }
  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
  }

  var roundDraw = !gameState.includes('');
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }
  handlePlayerChange();
}

function handleCellClick(e) {
  var clickedCell = e.target;
  var clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }
  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

function handleRestartGame() {
  gameActive = true;
  currentPlayer = "X";
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
/*
And finally we add our event listeners to the actual game cells, as well as our
restart button
*/
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);