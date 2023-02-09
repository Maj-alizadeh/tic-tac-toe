const startButton = document.querySelector(".start-button");

// main game module
const game = (() => {
  let gameBoardArray = ["", "", "", "", "", "", "", "", ""];
  let turn = 1;
  let player1Score = 0;
  let player2Score = 0;
  let endGame = false;
  let counter = 0;
  const display = document.querySelector(".status-display");
  const player1 = document.getElementById("player1");
  const player2 = document.getElementById("player2");
  const playerContainer = document.querySelector(".player-container");
  const gameBoard = document.querySelector(".game-board");

  function clearBoard() {
    for (let i = 0; i < gameBoardArray.length; i += 1) {
      const cell = document.querySelector(`div[data-cell="${i}`);
      cell.innerHTML = "";
    }
    gameBoardArray = ["", "", "", "", "", "", "", "", ""];
    endGame = false;
    counter = 0;
  }

  const start = () => {
    if (player1.value === "") {
      display.innerHTML = "Please enter player names";
      return;
    }
    playerContainer.style.display = "none";
    display.innerHTML = `${player1.value} ${player1Score} ${player2.value} ${player2Score} `;
    gameBoard.style.display = "grid";
    clearBoard();
  };

  // checks if a player has won the game
  const checkWin = () => {
    const gba = gameBoardArray;
    if (gba[0] === gba[1] && gba[0] === gba[2]) return gba[0];
    if (gba[3] === gba[4] && gba[3] === gba[5]) return gba[3];
    if (gba[6] === gba[7] && gba[6] === gba[8]) return gba[6];
    if (gba[0] === gba[3] && gba[0] === gba[6]) return gba[0];
    if (gba[1] === gba[4] && gba[1] === gba[7]) return gba[1];
    if (gba[2] === gba[5] && gba[2] === gba[8]) return gba[2];
    if (gba[0] === gba[4] && gba[0] === gba[8]) return gba[0];
    if (gba[2] === gba[4] && gba[2] === gba[6]) return gba[2];
    if (counter >= 9) return "D";
    return "";
  };

  function displayWinner() {
    const winner = checkWin();
    switch (winner) {
      case "":
        break;
      case "D":
        display.innerHTML = `It's a Draw, No body wins!`;
        endGame = true;
        break;
      case "X":
        display.innerHTML = `${player1.value}  wins`;
        player1Score += 1;
        endGame = true;
        break;
      case "O":
        display.innerHTML = `${player2.value}  wins`;
        player2Score += 1;
        endGame = true;
        break;
      default:
    }
  }

  function changeTurn() {
    if (turn === 1) turn = 2;
    else turn = 1;
  }

  // mark the board and store player's marked cell in the array
  const mark = (event) => {
    const index = event.target.dataset.cell;
    const cell = document.querySelector(`div[data-cell="${index}"]`);
    if (cell.innerHTML === "" && !endGame) {
      if (turn === 1) {
        gameBoardArray[index] = "X";
        cell.innerHTML = "X";
      } else {
        gameBoardArray[index] = "O";
        cell.innerHTML = "O";
      }
      counter += 1;
      displayWinner();
      changeTurn();
    }
  };

  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => cell.addEventListener("click", mark));
  return { start };
})();

startButton.addEventListener("click", game.start);
