const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//let create to fuctionn to iniliaze the game
function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  // ui empty is not done box ko
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all"; //this is added
    // one more thing is missing ,,green color remove , initialize css
    box.classList = `box box${index+1}`;
  });
  newGameBtn.classList.remove = "active";
  gameInfo.innerText = ` Cureent Player - ${currentPlayer}`;
}
initGame();

// swap term fuction
function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "0";
  } else {
    currentPlayer = "X";
  }
  // UI update
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

// fuciton checkgameover
function checkGameOver() {
    // newGameBtn.classList.add("active"); //thiss is optional
  let answer = "";

  winningPosition.forEach((position) => {
    // all 3 boxes should be non-empty and exactly same in value
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]] ///here not ssame
    ) {
      //check if winnner is X
      if (gameGrid[position[0]] === "X") 
      answer = "X"; ///here
      else 
      answer = "0";
      //   disable pointer events
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      //   now we know X/0 is a winner
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });

  //it means we have a winner
  if (answer !== "") {
    gameInfo.innerText = `winner Player - ${answer}`;
    newGameBtn.classList.add("active");
    return;
  }
  // check whather  , when there is tie
  let filCount = 0;
  gameGrid.forEach((box) => {
    if (box !== "")  //here
    filCount++;
  });
  //   board is filled game is tie
  if (filCount === 9) {
    gameInfo.innerText = "Game Tied";
    newGameBtn.classList.add("active");
  }
}

// fuciton handle click for logic building
function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    // swappig the term
    swapTurn();
    // winning check
    checkGameOver();
  }
}

// event to make the game run
boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

// new game button
newGameBtn.addEventListener("click", initGame);
