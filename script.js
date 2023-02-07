let gameBoardArray = [];
let turn = 1;
const restartButton = document.querySelector(".start-button");

const game = (() => {
  const display = document.querySelector(".display");
  // player factory
  const player = (name, marker) => ({ name, marker });
  const player1 = player("majed", "X");
  const player2 = player("Delaram", "O");

  const changeTurn = () => {
    if (turn === 1) turn = 2;
    else turn = 1;
  };
  function checkWin() {
    const gba = gameBoardArray;
    if (gba[0] === "X" && gba[1] === "X" && gba[2] === "X") return "X";
    if (gba[3] === "X" && gba[4] === "X" && gba[5] === "X") return "X";
    if (gba[6] === "X" && gba[7] === "X" && gba[8] === "X") return "X";
    if (gba[0] === "X" && gba[3] === "X" && gba[6] === "X") return "X";
    if (gba[1] === "X" && gba[4] === "X" && gba[7] === "X") return "X";
    if (gba[2] === "X" && gba[5] === "X" && gba[8] === "X") return "X";
    if (gba[0] === "X" && gba[4] === "X" && gba[8] === "X") return "X";
    if (gba[1] === "X" && gba[4] === "X" && gba[6] === "X") return "X";
    if (gba[0] === "O" && gba[1] === "O" && gba[2] === "O") return "O";
    if (gba[3] === "O" && gba[4] === "O" && gba[5] === "O") return "O";
    if (gba[6] === "O" && gba[7] === "O" && gba[8] === "O") return "O";
    if (gba[0] === "O" && gba[3] === "O" && gba[6] === "O") return "O";
    if (gba[1] === "O" && gba[4] === "O" && gba[7] === "O") return "O";
    if (gba[2] === "O" && gba[5] === "O" && gba[8] === "O") return "O";
    if (gba[0] === "O" && gba[4] === "O" && gba[8] === "O") return "O";
    if (gba[2] === "O" && gba[4] === "O" && gba[6] === "O") return "O";
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
    if (checkWin() === "X") display.innerHTML = "player 1 wins";
    if (checkWin() === "O") display.innerHTML = "player 2 wins";
  };

  const restart = () => {
    for (let i = 0; i < gameBoardArray.length; i++) {
      const cell = document.querySelector(`div[data-cell="${i}`);
      cell.innerHTML = "";
    }
    gameBoardArray = [];
  };

  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => cell.addEventListener("click", mark));
  return { restart };
})();

restartButton.addEventListener("click", game.restart);
