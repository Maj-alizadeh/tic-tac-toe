let gameBoardArray = [];
let turn = 1;
let player1Score = 0;
let player2Score = 0;
const startButton = document.querySelector(".start-button");

const game = (() => {
  const display = document.querySelector(".status-display");

  const changeTurn = () => {
    if (turn === 1) turn = 2;
    else turn = 1;
  };

  // checks if a player has won the game
  function checkWin() {
    const gba = gameBoardArray;
    if (gba[0] === gba[1] && gba[0] === gba[2]) return gba[0];
    if (gba[3] === gba[4] && gba[3] === gba[5]) return gba[3];
    if (gba[6] === gba[7] && gba[6] === gba[8]) return gba[6];
    if (gba[0] === gba[3] && gba[0] === gba[6]) return gba[0];
    if (gba[1] === gba[4] && gba[1] === gba[7]) return gba[1];
    if (gba[2] === gba[5] && gba[2] === gba[8]) return gba[2];
    if (gba[0] === gba[4] && gba[0] === gba[8]) return gba[0];
    if (gba[2] === gba[4] && gba[2] === gba[6]) return gba[2];
  }

  // mark the board and store player's marked cell in the array
  const mark = (event) => {
    const index = event.target.dataset.cell;
    const cell = document.querySelector(`div[data-cell="${index}"]`);

    // avoid mark a cell twice
    if (cell.innerHTML === "") {
      if (turn === 1) {
        gameBoardArray[index] = "X";
        cell.innerHTML = "X";
      } else {
        gameBoardArray[index] = "O";
        cell.innerHTML = "O";
      }
      changeTurn();
    }
    // checkWin();
    if (checkWin() === "X") {
      display.innerHTML = "player 1 wins";
      player1Score += 1;
      start();
    }
    if (checkWin() === "O") {
      display.innerHTML = "player 2 wins";
      player2Score += 1;
      start();
    }
  };

  const start = () => {
    const playerName = document.querySelector(".player-name");
    const player1 = document.getElementById("player1");
    const player2 = document.getElementById("player2");
    if (player1.value === "") {
      alert("enter players name");
      return;
    }
    playerName.style.display = "none";
    display.innerHTML = `${player1.value} ${player1Score} ${player2.value} ${player2Score} `;
    gameBoard = document.querySelector(".game-board");
    gameBoard.style.display = "grid";
    for (let i = 0; i < gameBoardArray.length; i++) {
      const cell = document.querySelector(`div[data-cell="${i}`);
      cell.innerHTML = "";
    }
    gameBoardArray = [];
  };

  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => cell.addEventListener("click", mark));
  return { start };
})();

startButton.addEventListener("click", game.start);
