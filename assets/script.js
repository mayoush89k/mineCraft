// variables for board size
const colNumber = 26;
const rowNumber = 16;

// variable to save current tool
let currentTool = "Nothing";
// variable to save current object
let currentObj = "";

// add message element to send this msg when error
const msg = document.getElementById("msg");
function setMsg(msgText){
    msg.style.display = "block"
    msg.innerText = msgText;
    setTimeout(() => {
      msg.innerText = "";
      msg.style.display = "none";
    }, 2000);
}

const gameBoard = document.getElementById("game-board");
gameBoard.style.gridTemplateColumns = `repeat(${colNumber},42px)`;
gameBoard.style.gridTemplateRows = `repeat(${rowNumber},40px)`;

const gameTools = document.getElementById("game-tools");

startingGame();

function startingGame() {
  gameBoard.innerText = ""; // delete everything to reset the game
  for (let i = 0; i < rowNumber; i++) {
    for (let j = 0; j < colNumber; j++) {
      const cell = document.createElement("section");
      cell.id = `${i}-${j}`;
      cell.className = "ski";
      gameBoard.appendChild(cell);
    }
  }
  // start creating my objects , the args are for position of I and J
  createTree(5, 10, "up");
  createTree(4, 20, "down");
  createRock({ i: 9, j: 5 }, 2); // 2 is for quantity of rocks
  createRock({ i: 10, j: 6 }, 1); // 1 is for quantity of rocks
  createRock({ i: 10, j: 7 }, 1); // 1 is for quantity of rocks
  createRock({ i: 9, j: 16 }, 2); // 1 is for quantity of rocks
  createRock({ i: 10, j: 18 }, 1); // 1 is for quantity of rocks
  createGround(11, 0);
  createCloud({ i: 0, j: 3, maxCols: 4, maxRows: 2 });
  createCloud({ i: 0, j: 13, maxCols: 5, maxRows: 3 });

  createControl();
}

// creating tree starting with leaves and then the woods, there are two types of tree
function createTree(i, j, upOrDown) {
  if (upOrDown == "up") {
    document.getElementById(`${i + 3}-${j}`).className = "wood";
    document.getElementById(`${i}-${j}`).classList = "tree";
  } else {
    document.getElementById(`${i + 3}-${j}`).classList = "tree";
  }
  document.getElementById(`${i + 1}-${j - 1}`).className = "tree";
  document.getElementById(`${i + 1}-${j}`).className = "tree";
  document.getElementById(`${i + 1}-${j + 1}`).className = "tree";
  document.getElementById(`${i + 2}-${j - 1}`).className = "tree";
  document.getElementById(`${i + 2}-${j}`).className = "tree";
  document.getElementById(`${i + 2}-${j + 1}`).className = "tree";

  document.getElementById(`${i + 4}-${j}`).className = "wood";
  document.getElementById(`${i + 5}-${j}`).className = "wood";
  document.getElementById(`${i + 6}-${j}`).className = "wood";
}

// creating ground starting with grass , and then the ground
function createGround(posI, posJ) {
  for (let i = posI; i < rowNumber; i++)
    for (let j = posJ; j < colNumber; j++)
      if (i == posI) {
        document.getElementById(`${i}-${j}`).className = "grass";
      } else document.getElementById(`${i}-${j}`).className = "ground";
}

// creating rocks at specific position with specific amount
function createRock(startingPosition, count) {
  for (let i = startingPosition.i; i < startingPosition.i + count; i++) {
    document.getElementById(`${i}-${startingPosition.j}`).className = "rock";
  }
}

// creating cloud place 3 rows has special appears at the third line
function createCloud(cloudProperties) {
  for (
    i = cloudProperties.i;
    i < cloudProperties.i + cloudProperties.maxRows;
    i++
  )
    for (
      j = cloudProperties.j;
      j < cloudProperties.j + cloudProperties.maxCols;
      j++
    ) {
      if (
        !(
          (i == cloudProperties.i && j == cloudProperties.j) ||
          (j == cloudProperties.j &&
            i == cloudProperties.i + cloudProperties.maxCols + 1) ||
          (i == cloudProperties.i &&
            j == cloudProperties.j + cloudProperties.maxRows + 1) ||
          (cloudProperties.maxRows > 2 &&
            i == cloudProperties.maxRows - 1 &&
            j == cloudProperties.j) ||
          (cloudProperties.maxRows > 2 &&
            i == cloudProperties.maxRows - 1 &&
            j == cloudProperties.j + cloudProperties.maxCols - 1) ||
          (cloudProperties.maxRows > 2 &&
            i == cloudProperties.maxRows - 1 &&
            j == cloudProperties.j + cloudProperties.maxCols - 2)
        )
      ) {
        document.getElementById(`${i}-${j}`).className = "cloud";
      }
    }
}

function createControl() {
  gameTools.innerText = ""; // delete everything to reset the game
  // creating remove tools controls (shovel, axe , pickaxe)
  const objectRemoverSection = document.createElement("section");
  objectRemoverSection.className = "remover-tools";
  const shovel = document.createElement("section");
  shovel.className = "shovel";
  const axe = document.createElement("section");
  axe.className = "axe";
  const pickaxe = document.createElement("section");
  pickaxe.className = "pickaxe";
  objectRemoverSection.append(shovel, axe, pickaxe);

  // reset button
  const resetBtn = document.createElement("button");
  resetBtn.className = "reset-btn";
  resetBtn.innerText = "Reset";
  resetBtn.addEventListener("click", () => {
    startingGame();
  });

  //creating each object with counter starting with 0
  const objectCounterSection = document.createElement("section");
  objectCounterSection.className = "counter-objects";
  const ground = document.createElement("section");
  ground.className = "ground";
  const groundCounter = document.createElement("section");
  groundCounter.id = "ground-counter";
  groundCounter.innerText = 0;
  const tree = document.createElement("section");
  tree.className = "tree";
  const treeCounter = document.createElement("section");
  treeCounter.id = "tree-counter";
  treeCounter.innerText = 0;
  const wood = document.createElement("section");
  wood.className = "wood";
  const woodCounter = document.createElement("section");
  woodCounter.id = "wood-counter";
  woodCounter.innerText = 0;
  const grass = document.createElement("section");
  grass.className = "grass";
  const grassCounter = document.createElement("section");
  grassCounter.id = "grass-counter";
  grassCounter.innerText = 0;
  const rock = document.createElement("section");
  rock.className = "rock";
  const rockCounter = document.createElement("section");
  rockCounter.id = "rock-counter";
  rockCounter.innerText = 0;

  objectCounterSection.append(
    ground,
    groundCounter,
    tree,
    treeCounter,
    wood,
    woodCounter,
    grass,
    grassCounter,
    rock,
    rockCounter
  );
  gameTools.append(objectRemoverSection, resetBtn, objectCounterSection);
}

// add listener to the whole section
gameTools.addEventListener("click", (e) => {
  switch (e.target.className) {
    case "shovel":
    case "axe":
    case "pickaxe":
      currentTool = e.target.className;
      break;
    case "wood":
    case "tree":
    case "rock":
    case "ground":
    case "grass":
      currentObj = e.target.className;
      break;

    default:
      break;
  }
});

// add listener to gameboard
gameBoard.addEventListener("click", (e) => {
  if (e.target.className != "ski" && e.target.className != "cloud") {
    currentObj = "";
    if (
      (currentTool == "shovel" && e.target.className == "ground") ||
      (currentTool == "shovel" && e.target.className == "grass") ||
      (currentTool == "pickaxe" && e.target.className == "rock") ||
      (currentTool == "axe" && e.target.className == "wood") ||
      (currentTool == "axe" && e.target.className == "tree")
    ) {
      document.getElementById(`${e.target.className}-counter`).innerText =
        Number(
          document.getElementById(`${e.target.className}-counter`).innerText
        ) + 1;
      e.target.className = "ski";
    } else {
      setMsg("cannot remove " + e.target.className + " by " + currentTool);
    }
  } else if (e.target.className == "ski") {
    currentTool = "Nothing";
    if (
      currentObj  &&
      Number(document.getElementById(`${currentObj}-counter`).innerText) > 0
    ) {
      e.target.className = currentObj;
      document.getElementById(`${e.target.className}-counter`).innerText =
        Number(
          document.getElementById(`${e.target.className}-counter`).innerText
        ) - 1;
    } else setMsg("Choose Valid Object");
  }
});


const upgrade = document.getElementById("upgrade")
upgrade.addEventListener('click' , () => {
    window.location = '/assets/game2/game2.html'
    
})