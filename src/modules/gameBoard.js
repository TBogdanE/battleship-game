import { player, computerPlayer, Boat } from "./players";
import {
  ROTATION,
  VERTICAL,
  HORIZONTAL,
  drawBoatOnGameBoard,
} from "./homepageUi";

class settings {
  constructor() {
    this.size = 0;
    this.handleMouseOver = null;
    this.handleMouseOut = null;
  }
}

const gameSettings = new settings();

//makes user place boats in order
const placePlayerBoats = async () => {
  await placeCarrierBoat();
  await placeBatleship();
  await placeDestroyer();
  await placeSubmarine();
  await placePatrolBoat();
  await placeBoats();
};

//place carriere boat
const placeCarrierBoat = () => {
  return new Promise((resolve) => {
    gameSettings.size = 5;
    checkValidPlace(resolve);
  });
};

const placeBatleship = () => {
  return new Promise((resolve) => {
    gameSettings.size = 4;
    checkValidPlace(resolve);
  });
};

const placeDestroyer = () => {
  return new Promise((resolve) => {
    gameSettings.size = 3;
    checkValidPlace(resolve);
  });
};

const placeSubmarine = () => {
  return new Promise((resolve) => {
    gameSettings.size = 3;
    checkValidPlace(resolve);
  });
};

const placePatrolBoat = () => {
  return new Promise((resolve) => {
    gameSettings.size = 2;
    checkValidPlace(resolve);
  });
};

const placeBoats = () => {
  return new Promise((resolve) => {
    gameSettings.size = 2;
    checkValidPlace(resolve);
  });
  // placeComputerRandomBoats();
};

//place the boat on the gameboard
const addBoatToGameBoard = (size, pos) => {
  const newBoat = new Boat(size, pos);
  player.boats.push(newBoat);
  console.log("PlayerBoats:", player.boatPositions(), "Position", pos);
  drawBoatOnGameBoard();
};

//randomly places computer boats
const placeComputerRandomBoats = () => {};

//checks if the place user want to add the boat is valid
const checkValidPlace = (resolve) => {
  const box = document.getElementById("player-box");

  //gets the area where the mouse hovers
  gameSettings.handleMouseOver = (event) => {
    const target = event.target;
    const row = parseInt(target.getAttribute("row"));
    const col = parseInt(target.getAttribute("col"));
    let element = null;

    handleHover(target, row, col, element, resolve);
  };

  //gets the area of the last hovered element
  gameSettings.handleMouseOut = (event) => {
    const target = event.target;
    const row = parseInt(target.getAttribute("row"));
    const col = parseInt(target.getAttribute("col"));
    let element = null;

    handleHoverDeletion(row, col, element);
  };

  box.addEventListener("mouseover", gameSettings.handleMouseOver);
  box.addEventListener("mouseout", gameSettings.handleMouseOut);
};

//applies style to the gameboard on hover
const handleHover = (target, row, col, element, resolve) => {
  let pos = [];
  let postion = getPosition(row, col, 1, 0);
  let boatPosition = player.boatPositions();
  let containsAny = checkContainsAny(postion, boatPosition);

  const handleClick = () => {
    const box = document.getElementById("player-box");
    addBoatToGameBoard(gameSettings.size, pos);
    target.removeEventListener("click", handleClick);
    box.removeEventListener("mouseover", gameSettings.handleMouseOver);
    box.removeEventListener("mouseout", gameSettings.handleMouseOut);
    resolve();
  };

  const handleHoverStyle = (startRow, startCol, rowStep, colStep) => {
    target.addEventListener("click", handleClick);

    for (let i = 0; i < gameSettings.size; i++) {
      const newRow = startRow + i * rowStep;
      const newCol = startCol + i * colStep;
      pos.push([newRow, newCol]);
      element = findElementByRowCol(newRow, newCol);
      element.style.backgroundColor = "var(--good-place-hover)";
    }
  };

  function getPosition(startRow, startCol, rowStep, colStep) {
    let pos = [];
    for (let i = 0; i < gameSettings.size; i++) {
      const newRow = startRow + i * rowStep;
      const newCol = startCol + i * colStep;
      pos.push([newRow, newCol]);
    }
    console.log("getposition", pos);
    return pos;
  }

  if (getRotation() === VERTICAL) {
    if (gameSettings.size + row > 10 || containsAny) {
      target.style.backgroundColor = "var(--wrong)";
      return;
    }
    handleHoverStyle(row, col, 1, 0);
    return;
  } else if (getRotation() === HORIZONTAL) {
    if (gameSettings.size + col > 10 || containsAny) {
      target.style.backgroundColor = "var(--wrong)";
      return;
    }
    handleHoverStyle(row, col, 0, 1);
    return;
  }
};

//delete the style of the last visited elements
const handleHoverDeletion = (row, col, element) => {
  if (getRotation() === VERTICAL) {
    for (let i = 0; i < gameSettings.size; i++) {
      element = findElementByRowCol(i + row, col);
      element.style.backgroundColor = "transparent";
    }
    return;
  } else if (getRotation() === HORIZONTAL) {
    for (let i = 0; i < gameSettings.size; i++) {
      element = findElementByRowCol(row, col + i);
      element.style.backgroundColor = "transparent";
    }
    return;
  }
};

function checkContainsAny(arr1, arr2) {
  if (arr1.length === 0 && arr2.length === 0) return false;
  for (const element1 of arr2) {
    for (const element2 of arr1) {
      if (element1[0] === element2[0] && element1[1] == element2[1]) {
        console.log("true");
        return true;
      }
    }
  }
  console.log("false");
  return false;
}

//searches the gameboard elements based on row and col
const findElementByRowCol = (row, col) => {
  const selector = `[row="${row}"][col="${col}"]`;
  return document.querySelector(selector);
};

const getRotation = () => {
  return ROTATION;
};

export { placePlayerBoats, placeComputerRandomBoats, findElementByRowCol };
