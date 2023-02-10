const startButton = document.querySelector(".start-button");

// main game module
const game = (() => {
  let gameBoardArray = ["", "", "", "", "", "", "", "", ""];
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const player = (name, mark) => {
    let score = 0;
    const addScore = () => {
      score += 1;
    };
    const getScore = () => score;
    return { name, mark, addScore, getScore };
  };

  const player1 = player("", "X");
  const player2 = player("", "O");
  let currentPlayer = player1;
  let endGame = false;
  const display = document.querySelector(".status-display");
  const playerContainer = document.querySelector(".player-container");
  const gameBoard = document.querySelector(".game-board");

  function clearBoard() {
    for (let i = 0; i < gameBoardArray.length; i += 1) {
      const cell = document.querySelector(`div[data-cell="${i}`);
      cell.innerHTML = "";
    }
    gameBoardArray = ["", "", "", "", "", "", "", "", ""];
    endGame = false;
  }

  const start = () => {
    player1.name = document.getElementById("player1").value;
    player2.name = document.getElementById("player2").value;
    if (player1.name === "") {
      display.innerHTML = "Please enter player names";
      return;
    }
    playerContainer.style.display = "none";
    display.innerHTML = `${player1.name} ${player1.getScore()} ${player2.name}
     ${player2.getScore()} `;
    gameBoard.style.display = "grid";
    clearBoard();
  };

  // checks if a player has won the game
  const checkWin = () =>
    winningCombinations.some((combination) =>
      combination.every((index) =>
        gameBoardArray[index].includes(currentPlayer.mark)
      )
    );

  function changeTurn() {
    if (currentPlayer === player1) currentPlayer = player2;
    else currentPlayer = player1;
  }

  // mark the board and store player's marked cell in the array
  const mark = (event) => {
    const index = event.target.dataset.cell;
    const cell = document.querySelector(`div[data-cell="${index}"]`);
    if (cell.innerHTML === "" && !endGame) {
      display.innerHTML = ` ${currentPlayer.mark}'s turn`;
      if (currentPlayer === player1) {
        gameBoardArray[index] = "X";
        cell.innerHTML = "X";
      } else {
        gameBoardArray[index] = "O";
        cell.innerHTML = "O";
      }
      if (checkWin()) {
        display.innerHTML = `${currentPlayer.name}  wins`;
        currentPlayer.addScore();
        endGame = true;
      } else if (!gameBoardArray.includes("")) {
        display.innerHTML = `It's a Draw, No body wins!`;
        endGame = true;
      }
      changeTurn();
    }
  };

  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => cell.addEventListener("click", mark));
  return { start };
})();

startButton.addEventListener("click", game.start);
