import { gameSettings, player, computerPlayer, Boat } from "./players";
import { drawBoatOnGameBoard } from "./homepageUi";
import { checkContainsAny } from "./utils/checkContainsAny";
import { findElementByRowCol } from "./utils/findElement";
import { VERTICAL, HORIZONTAL, getRotation } from "./utils/getRotation";
import { checkNearby } from "./handleComputer";

const box = document.getElementById("player-box");

//makes user place boats in order
async function placePlayerBoats() {
  return new Promise(async (resolve) => {
    await placeNewBoat("Carrier", 5);
    await placeNewBoat("Batleship", 4);
    await placeNewBoat("Destroyer", 3);
    await placeNewBoat("Submarine", 3);
    await placeNewBoat("Patrol boat", 2);
    await placeNewBoat("Boat", 2);
    resolve();
  });
}

//place carriere boat
function placeNewBoat(name, size) {
  return new Promise((resolve) => {
    checkValidPlace(resolve, name, size);
  });
}

//checks if the place user want to add the boat is valid
function checkValidPlace(resolve, name, size) {
  // const box = document.getElementById("player-box");

  //gets the area where the mouse hovers
  gameSettings.handleMouseOver = (event) => {
    const target = event.target;
    const row = parseInt(target.getAttribute("row"));
    const col = parseInt(target.getAttribute("col"));
    let element = null;

    handleHover(target, row, col, name, size, element, resolve);
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
}

//applies style to the gameboard on hover
function handleHover(target, row, col, name, size, element, resolve) {
  let pos = [];
  let position = getPosition(row, col, size);
  let boatPosition = player.boatPositions();

  drawBoatOnGameBoard();

  function handleClick() {
    target.removeEventListener("click", handleClick);
    box.removeEventListener("mouseover", gameSettings.handleMouseOver);
    box.removeEventListener("mouseout", gameSettings.handleMouseOut);
    addBoatToGameBoard(name, size, pos);
    resolve();
  }

  //place the boat on the gameboard
  function addBoatToGameBoard(name, size, pos) {
    const newBoat = new Boat(name, size, pos);
    player.boats.push(newBoat);
    drawBoatOnGameBoard();
    //console.log("PlayerBoats:", player.boatPositions(), "Position", pos);
  }

  function handleHoverStyle(size, startRow, startCol, rowStep, colStep) {
    target.addEventListener("click", handleClick);

    for (let i = 0; i < size; i++) {
      const newRow = startRow + i * rowStep;
      const newCol = startCol + i * colStep;
      pos.push([newRow, newCol]);
      element = findElementByRowCol(box, newRow, newCol);
      element.style.backgroundColor = "var(--good-place-hover)";
    }
  }

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
    return pos;
  }

  if (getRotation() === VERTICAL) {
    if (
      size + row > 10 ||
      checkContainsAny(position, boatPosition) ||
      checkNearby(position, boatPosition)
    ) {
      target.style.backgroundColor = "var(--wrong)";
      return;
    }
    handleHoverStyle(size, row, col, 1, 0);
  } else if (getRotation() === HORIZONTAL) {
    if (
      size + col > 10 ||
      checkContainsAny(position, boatPosition) ||
      checkNearby(position, boatPosition)
    ) {
      target.style.backgroundColor = "var(--wrong)";
      return;
    }
    handleHoverStyle(size, row, col, 0, 1);
  }
}

//delete the style of the last visited elements
function handleHoverDeletion(row, col, size, element) {
  if (getRotation() === VERTICAL) {
    for (let i = 0; i < size; i++) {
      element = findElementByRowCol(box, i + row, col);
      element.style.backgroundColor = "transparent";
    }
    return;
  } else if (getRotation() === HORIZONTAL) {
    for (let i = 0; i < size; i++) {
      element = findElementByRowCol(box, row, col + i);
      element.style.backgroundColor = "transparent";
    }
    return;
  }
}

export { placePlayerBoats };
