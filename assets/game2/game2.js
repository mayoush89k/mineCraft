const colNumber = 60;
const rowNumber = 25;
const gameBoard = document.getElementById("game-board");
gameBoard.style.gridTemplateColumns = `repeat(${colNumber},25px)`;
gameBoard.style.gridTemplateRows = `repeat(${rowNumber},30px)`;

const object = {
  wood: { name: "wood", counter: 0 },
  box: { name: "box", counter: 0 },
  smoke: { name: "smoke", counter: 0 },
  smoke2: { name: "smoke2", counter: 0 },
  coal: { name: "coal", counter: 0 },
  fire: { name: "fire", counter: 0 },
  wallBeige1: { name: "wallBeige1", counter: 0 },
  wallBeige2: { name: "wallBeige2", counter: 0 },
  wallGray1: { name: "wallGray1", counter: 0 },
  wallGray2: { name: "wallGray2", counter: 0 },
  wallGray3: { name: "wallGray3", counter: 0 },
  edgeTopRight: { name: "edgeTopRight", counter: 0 },
  edgeTopMiddle: { name: "edgeTopMiddle", counter: 0 },
  edgeTopLeft: { name: "edgeTopLeft", counter: 0 },
  edgeRight: { name: "edgeRight", counter: 0 },
  edgeMiddle: { name: "edgeMiddle", counter: 0 },
  edgeLeft: { name: "edgeLeft", counter: 0 },
  grass3: { name: "grass3", counter: 0 },
  door: { name: "door", counter: 0 },
  window2: { name: "window2", counter: 0 },
  water: { name: "water", counter: 0 },
  waves: { name: "waves", counter: 0 },
  tree: { name: "tree", counter: 0 },
};
const tools = {
  axe: { name: "axe", counter: 0 },
  pickaxe: { name: "pickaxe", counter: 0 },
  shovel: { name: "shovel", counter: 0 },
  bucket: { name: "bucket", counter: 0 },
};

// add message element to send this msg when error
const msg = document.getElementById("msg");
function setMsg(msgText) {
  msg.style.display = "block";
  msg.innerText = msgText;
  setTimeout(() => {
    msg.innerText = "";
    msg.style.display = "none";
  }, 2000);
}

const gameTools = document.getElementById("game-tools");
// variable to save current tool
let currentTool = "Nothing";
// variable to save current object
let currentObj = "";

startingGame();

function startingGame() {
  gameBoard.innerText = ""; // delete everything to reset the game
  for (let i = 0; i < rowNumber; i++) {
    for (let j = 0; j < colNumber; j++) {
      const cell = document.createElement("section");
      cell.id = `${i}-${j}`;
      cell.className = "ski";
      cell.addEventListener("click", () => {
        console.log(cell.id);
      });
      gameBoard.appendChild(cell);
    }
  }

  createHouse({ i: 5, j: 27 }, 15, 20);
  createEdges({ i: 7, j: 0 }, 5, 15);
  createEdges({ i: 7, j: 10 }, 8, 12);
  createEdges({ i: 23, j: 0 }, 60, 2);
  createWaterFall({ i: 7, j: 5 }, 6, 15);
  createRiver({ i: 19, j: 0 }, 60, 4);
  createGrass({ i: 17, j: 18 }, 42, 2);
  createCanon({ i: 5, j: 19 }, 6, 12);
  createStorage({ i: 10, j: 48 }, 11, 7);
  createTree(0, 3, "up");
  createTree(0, 13, "down");
  createControl();
}

function createEdges(position, width, height) {
  for (let i = position.i; i < position.i + height; i++) {
    for (let j = position.j; j < position.j + width; j++) {
      const cell = document.getElementById(`${i}-${j}`);
      if (i == position.i && j == position.j) cell.className = "edgeTopLeft";
      else if (j == position.j) cell.className = "edgeLeft";
      else if (i == position.i) cell.className = "edgeTopMiddle";
      else if (i == position.i + width - 1) cell.className = "edgeRight";
      else cell.className = "edgeMiddle";
    }
  }
}

function createWaterFall(position, width, height) {
  for (let i = position.i; i < position.i + height; i++) {
    for (let j = position.j; j < position.j + width; j++) {
      const cell = document.getElementById(`${i}-${j}`);
      if (i == position.i + height - 1) cell.className = "waves";
      else cell.className = "water";
    }
  }
}

function createRiver(position, width, height) {
  for (let i = position.i; i < position.i + height; i++) {
    for (let j = position.j; j < position.j + width; j++) {
      const cell = document.getElementById(`${i}-${j}`);
      if (
        i ==
        position.i + height - 1 // last line
      )
        cell.className = "waves";
      else cell.className = "water";
    }
  }
}
function createGrass(position, width, height) {
  for (let i = position.i; i < position.i + height; i++) {
    for (let j = position.j; j < position.j + width; j++) {
      const cell = document.getElementById(`${i}-${j}`);
      cell.className = "grass3";
    }
  }
}

function createWalls(position, width, height) {
  for (let i = position.i; i < position.i + height; i++) {
    for (let j = position.j; j < position.j + width; j++) {
      const cell = document.getElementById(`${i}-${j}`);
      cell.className = "grass3";
    }
  }
}

function createHouse(position, width, height) {
  for (let i = position.i; i < position.i + height; i++) {
    for (let j = position.j; j < position.j + width; j++) {
      const cell = document.getElementById(`${i}-${j}`);
      if (i == position.i || j == position.j || j == position.j + width - 1)
        cell.className = "wallGray3";
      else if (
        // 2 windows
        (i == position.i + 3 && j == position.j + 2) ||
        (i == position.i + 4 && j == position.j + 2) ||
        (i == position.i + 4 && j == position.j + 3) ||
        (i == position.i + 3 && j == position.j + 3) ||
        (i == position.i + 8 && j == position.j + 2) ||
        (i == position.i + 7 && j == position.j + 2) ||
        (i == position.i + 7 && j == position.j + 3) ||
        (i == position.i + 8 && j == position.j + 3)
      )
        cell.className = "window2";
      else if (
        // door
        i >= position.i + 8 &&
        i <= position.i + 11 &&
        j <= position.j + 9 &&
        j >= position.j + 7
      )
        cell.className = "door";
      else cell.className = "wallBeige1";
    }
  }
}

function createCanon(position, width, height) {
  for (let i = position.i; i < position.i + height; i++) {
    for (let j = position.j; j < position.j + width; j++) {
      const cell = document.getElementById(`${i}-${j}`);
      if (
        (i == position.i && j == position.j + width - 1) ||
        (i == position.i && j == position.j + width - 2) ||
        (i == position.i + 1 && j == position.j + width - 3) ||
        (i == position.i + 1 && j == position.j + width - 4)
      ) {
        cell.className = "smoke2";
      } else {
        if (i >= position.i + height - 5 && i <= position.i + height - 1) {
          cell.className = "wallGray2";
        } else if (
          (j == position.j + 2 && i >= position.i + 2) ||
          (j == position.j + 3 && i >= position.i + 2) ||
          (j == position.j + 1 && i == position.i + height - 6) ||
          (j == position.j + 4 && i == position.i + height - 6)
        )
          cell.className = "wallGray1";
        if (
          (i == position.i + height - 3 &&
            j >= position.j + 1 &&
            i == position.i + height - 3 &&
            j <= position.j + 4) ||
          (i == position.i + height - 4 && j == position.j + 2) ||
          (i == position.i + height - 4 && j == position.j + 3)
        )
          cell.className = "fire";
        else if (
          (i == position.i + height - 4 && j == position.j + 4) ||
          (i == position.i + height - 4 && j == position.j + 1) ||
          (i == position.i + height - 5 && j == position.j + 2) ||
          (i == position.i + height - 5 && j == position.j + 3)
        )
          cell.className = "smoke";
        else if (
          i == position.i + height - 2 &&
          j >= position.j + 1 &&
          i == position.i + height - 2 &&
          j <= position.j + 4
        )
          cell.className = "coal";
      }
    }
  }
}

function createStorage(position, width, height) {
  for (let i = position.i; i < position.i + height; i++) {
    for (let j = position.j; j < position.j + width; j++) {
      const cell = document.getElementById(`${i}-${j}`);

      if (
        i == position.i ||
        j == position.j ||
        i == position.i + height - 1 ||
        j == position.j + width - 1 ||
        j == position.j + width - 3 ||
        j == position.j + width - 5 || 
        j == position.j + 2 || 
        j == position.j + 4 
      )
        cell.className = "box";
    }
  }
}
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

function createControl() {
  gameTools.innerText = ""; // delete everything to reset the game
  // creating remove tools controls (shovel, axe , pickaxe)
  const objectRemover = document.createElement("section");
  objectRemover.className = "reset-btn";
  objectRemover.innerText = "Select tool";
  objectRemover.addEventListener("click", () => {
    objectRemoverSection.className =
      objectRemoverSection.className == "hidden" ? "remover-tools" : "hidden";
  });
  const objectRemoverSection = document.createElement("section");
  objectRemoverSection.className = "hidden";
  const shovel = document.createElement("section");
  shovel.className = "shovel";
  const axe = document.createElement("section");
  axe.className = "axe";
  const pickaxe = document.createElement("section");
  pickaxe.className = "pickaxe";
  const bucket = document.createElement("section");
  bucket.className = "bucket";
  objectRemoverSection.append(shovel, axe, pickaxe, bucket);

  // reset button
  const resetBtn = document.createElement("button");
  resetBtn.className = "reset-btn";
  resetBtn.innerText = "Reset";
  resetBtn.addEventListener("click", () => {
    startingGame();
  });

  //creating each object with counter starting with 0
  const objectCounter = document.createElement("section");
  objectCounter.className = "reset-btn";
  objectCounter.innerText = "Select Object";
  objectCounter.addEventListener("click", () => {
    objectCounterSection.className =
      objectCounterSection.className == "hidden" ? "counter-objects" : "hidden";
  });

  const objectCounterSection = document.createElement("section");
  objectCounterSection.classList.add("hidden");
  let rowCounter = 0;
  let row = document.createElement("section");
  for (const obj in object) {
    const objName = document.createElement("section");
    objName.className = object[obj].name;

    const objCounter = document.createElement("section");
    objCounter.id = `${object[obj].name}-counter`;
    objCounter.innerText = object[obj].counter;

    if (rowCounter % 5 == 0) {
      row = document.createElement("section");
    }
    row.append(objName, objCounter);
    rowCounter++;
    objectCounterSection.appendChild(row);
  }

  objectRemover.appendChild(objectRemoverSection);
  objectCounter.appendChild(objectCounterSection);
  gameTools.append(objectRemover, resetBtn, objectCounter);
}

// add listener to the whole section
gameTools.addEventListener("click", (e) => {
  for (const obj in object) {
    if (object[obj].name == e.target.className) currentObj = e.target.className;
  }
  for (const tool in tools) {
    if (tools[tool].name == e.target.className)
      currentTool = e.target.className;
  }
});

// add listener to gameboard
gameBoard.addEventListener("click", (e) => {
  if (e.target.className != "ski" && e.target.className != "smoke" && e.target.className != "smoke2") {
    currentObj = "";
    if (
      (currentTool == "shovel" && e.target.className == "grass3") ||
      (currentTool == "shovel" && e.target.className == "coal") ||
      (currentTool == "shovel" && e.target.className == "fire") ||
      (currentTool == "shovel" && e.target.className == "edgeTopRight") ||
      (currentTool == "shovel" && e.target.className == "edgeTopMiddle") ||
      (currentTool == "shovel" && e.target.className == "edgeTopLeft") ||
      (currentTool == "shovel" && e.target.className == "edgeRight") ||
      (currentTool == "shovel" && e.target.className == "edgeMiddle") ||
      (currentTool == "shovel" && e.target.className == "edgeLeft") ||
      (currentTool == "pickaxe" && e.target.className == "wallGray3") ||
      (currentTool == "pickaxe" && e.target.className == "wallGray2") ||
      (currentTool == "pickaxe" && e.target.className == "wallGray1")||
      (currentTool == "pickaxe" && e.target.className == "wallBeige2")||
      (currentTool == "pickaxe" && e.target.className == "wallBeige1")||
      (currentTool == "axe" && e.target.className == "wood") ||
      (currentTool == "axe" && e.target.className == "door") ||
      (currentTool == "axe" && e.target.className == "window2") ||
      (currentTool == "axe" && e.target.className == "tree") ||
      (currentTool == "bucket" && e.target.className == "waves") ||
      (currentTool == "bucket" && e.target.className == "water") 
    ) {
        object[e.target.className].counter++
      document.getElementById(`${e.target.className}-counter`).innerText = object[e.target.className].counter
      e.target.className = "ski";
    } else {
      setMsg("cannot remove " + e.target.className + " by " + currentTool);
    }
  } else if (e.target.className == "ski") {
    currentTool = "Nothing";
    if (
      currentObj && object[currentObj].counter > 0
    ) {
      e.target.className = currentObj;
      object[e.target.className].counter--

      document.getElementById(`${e.target.className}-counter`).innerText = object[e.target.className].counter;
    } else setMsg("Choose Valid Object");
  }
});
