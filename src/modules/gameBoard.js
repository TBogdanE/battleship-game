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
  await placeNewBoat("Carrier", 5);
  await placeNewBoat("Batleship", 4);
  await placeNewBoat("Destroyer", 3);
  await placeNewBoat("Submarine", 3);
  await placeNewBoat("Patrol boat", 2);
  await placeNewBoat("Boat", 2);
};

//place carriere boat
const placeNewBoat = (name, size) => {
  return new Promise((resolve) => {
    console.log(name);
    checkValidPlace(resolve, size);
  });
};

//randomly places computer boats
const placeComputerRandomBoats = () => {};

//checks if the place user want to add the boat is valid
const checkValidPlace = (resolve, size) => {
  const box = document.getElementById("player-box");

  //gets the area where the mouse hovers
  gameSettings.handleMouseOver = (event) => {
    const target = event.target;
    const row = parseInt(target.getAttribute("row"));
    const col = parseInt(target.getAttribute("col"));
    let element = null;

    handleHover(target, row, col, size, element, resolve);
  };

  //gets the area of the last hovered element
  gameSettings.handleMouseOut = (event) => {
    const target = event.target;
    const row = parseInt(target.getAttribute("row"));
    const col = parseInt(target.getAttribute("col"));
    let element = null;

    handleHoverDeletion(row, col, size, element);
  };

  box.addEventListener("mouseover", gameSettings.handleMouseOver);
  box.addEventListener("mouseout", gameSettings.handleMouseOut);
};

//applies style to the gameboard on hover
const handleHover = (target, row, col, size, element, resolve) => {
  let pos = [];
  let postion = getPosition(row, col, size);
  let boatPosition = player.boatPositions();

  drawBoatOnGameBoard();

  const handleClick = () => {
    const box = document.getElementById("player-box");
    target.removeEventListener("click", handleClick);
    box.removeEventListener("mouseover", gameSettings.handleMouseOver);
    box.removeEventListener("mouseout", gameSettings.handleMouseOut);
    addBoatToGameBoard(size, pos);
    resolve();
  };

  //place the boat on the gameboard
  const addBoatToGameBoard = (size, pos) => {
    const newBoat = new Boat(size, pos);
    player.boats.push(newBoat);
    drawBoatOnGameBoard();
    console.log("PlayerBoats:", player.boatPositions(), "Position", pos);
  };

  const handleHoverStyle = (size, startRow, startCol, rowStep, colStep) => {
    target.addEventListener("click", handleClick);

    for (let i = 0; i < size; i++) {
      const newRow = startRow + i * rowStep;
      const newCol = startCol + i * colStep;
      pos.push([newRow, newCol]);
      element = findElementByRowCol(newRow, newCol);
      element.style.backgroundColor = "var(--good-place-hover)";
    }
  };

  function getPosition(startRow, startCol, size) {
    let pos = [];
    let rowStep;
    let colStep;

    if (getRotation() === VERTICAL) {
      rowStep = 1;
      colStep = 0;
    } else if (getRotation() === HORIZONTAL) {
      rowStep = 0;
      colStep = 1;
    }

    for (let i = 0; i < size; i++) {
      const newRow = startRow + i * rowStep;
      const newCol = startCol + i * colStep;
      pos.push([newRow, newCol]);
    }

    console.log("getposition", pos);
    return pos;
  }

  if (getRotation() === VERTICAL) {
    if (size + row > 10 || checkContainsAny(postion, boatPosition)) {
      target.style.backgroundColor = "var(--wrong)";
      return;
    }
    handleHoverStyle(size, row, col, 1, 0);
  } else if (getRotation() === HORIZONTAL) {
    if (size + col > 10 || checkContainsAny(postion, boatPosition)) {
      target.style.backgroundColor = "var(--wrong)";
      return;
    }
    handleHoverStyle(size, row, col, 0, 1);
  }
};

//delete the style of the last visited elements
const handleHoverDeletion = (row, col, size, element) => {
  if (getRotation() === VERTICAL) {
    for (let i = 0; i < size; i++) {
      element = findElementByRowCol(i + row, col);
      element.style.backgroundColor = "transparent";
    }
    return;
  } else if (getRotation() === HORIZONTAL) {
    for (let i = 0; i < size; i++) {
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
        return true;
      }
    }
  }
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
