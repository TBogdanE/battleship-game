import { gameSettings, player, computerPlayer, Boat } from "./players";
import { drawBoatOnGameBoard } from "./homepageUi";
import { checkContainsAny } from "./utils/checkContainsAny";
import { findElementByRowCol } from "./utils/findElement";
import {
  VERTICAL,
  HORIZONTAL,
  getRotation,
  ROTATION,
} from "./utils/getRotation";
import { checkNearby } from "./handleComputer";

const box = document.getElementById("player-box");

//place boats in order
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

//handles the addition of the boats
function placeNewBoat(name, size) {
  return new Promise((resolve) => {
    checkValidPlace(resolve, name, size);
  });
}

//checks if the place where user want to place the boat is valid
function checkValidPlace(resolve, name, size) {
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

  //adds the event listeners
  box.addEventListener("mouseover", gameSettings.handleMouseOver);
  box.addEventListener("mouseout", gameSettings.handleMouseOut);
}

//handle hovering of the elements
function handleHover(target, row, col, name, size, element, resolve) {
  const [ROTATION, rowStep, colStep] = getRotation();
  let hoveredPosition = getPosition(row, col, size);
  let boatPosition = player.boatPositions();

  drawBoatOnGameBoard();

  function handleClick() {
    box.removeEventListener("mouseover", gameSettings.handleMouseOver);
    box.removeEventListener("mouseout", gameSettings.handleMouseOut);
    target.removeEventListener("click", handleClick);
    addBoatToGameBoard();
    resolve();
  }

  //place the boat on the gameboard
  function addBoatToGameBoard() {
    const newBoat = new Boat(name, size, hoveredPosition);
    player.boats.push(newBoat);
    drawBoatOnGameBoard();
  }

  //adds style to the elements, to create a virtual boat
  function handleHoverStyle(size, startRow, startCol, rowStep, colStep) {
    target.addEventListener("click", handleClick);
    for (let i = 0; i < size; i++) {
      const newRow = startRow + i * rowStep;
      const newCol = startCol + i * colStep;
      element = findElementByRowCol(box, newRow, newCol);
      element.style.backgroundColor = "var(--good-place-hover)";
    }
  }

  //while hovering over an element, creates a virtual boat with it's size
  //and returns all the spaces it takes
  function getPosition(startRow, startCol, size) {
    let array = [];

    for (let i = 0; i < size; i++) {
      const newRow = startRow + i * rowStep;
      const newCol = startCol + i * colStep;
      array.push([newRow, newCol]);
    }
    return array;
  }

  if (
    size + row * rowStep + col * colStep > 10 ||
    checkContainsAny(hoveredPosition, boatPosition) ||
    checkNearby(hoveredPosition, boatPosition)
  ) {
    target.style.backgroundColor = "var(--wrong)";
    return;
  }
  handleHoverStyle(size, row, col, rowStep, colStep);
}

//delete the style of the last hovered elements
function handleHoverDeletion(row, col, size, element) {
  const [, rowStep, colStep] = getRotation();
  for (let i = 0; i < size; i++) {
    element = findElementByRowCol(box, rowStep * i + row, colStep * i + col);
    element.style.backgroundColor = "transparent";
  }
  return;
}

export { placePlayerBoats };
