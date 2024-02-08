import { player, computerPlayer, Boat } from "./players";
import { VERTICAL, HORIZONTAL, ROTATION } from "./homepageUi";

const placeBoats = () => {
  placePlayerBoats();
  placeComputerRandomBoats();
};

const placePlayerBoats = () => {
  placeCarrierBoat();
  // placeBatleship();
  //placeDestroyer();
  //placeSubmarine();
  //placePatrolBoat();
  // placeBoats();
};

const placeCarrierBoat = () => {
  checkValidPlace(5);
};

const placeComputerRandomBoats = () => {};

const checkValidPlace = (size) => {
  const box = document.getElementById("player-box");

  box.addEventListener("mouseover", (event) => {
    handleMouseOver(event, size);
  });
  box.addEventListener("mouseout", (event) => {
    handleMouseOut(event, size);
  });
};

const handleMouseOver = (event, size) => {
  const target = event.target;
  const row = parseInt(target.getAttribute("row"));
  const col = parseInt(target.getAttribute("col"));
  let element = null;
  handleHover(target, row, col, size, element);
};

const handleMouseOut = (event, size) => {
  const target = event.target;
  const row = parseInt(target.getAttribute("row"));
  const col = parseInt(target.getAttribute("col"));
  let element = null;
  handleHoverDeletion(row, col, size, element);
};

const handleHover = (target, row, col, size, element) => {
  if (ROTATION === VERTICAL) {
    if (size + row > 10) {
      target.style.backgroundColor = "var(--wrong)";
      return;
    }
    for (let i = 0; i < size; i++) {
      element = findElementByRowCol(i + row, col);
      element.style.backgroundColor = "var(--good-place-hover)";
    }
  } else if (ROTATION === HORIZONTAL) {
    if (size + col > 10) {
      target.style.backgroundColor = "var(--wrong)";
      return;
    }
    for (let i = 0; i < size; i++) {
      element = findElementByRowCol(row, col + i);
      element.style.backgroundColor = "var(--good-place-hover)";
    }
  }
};

const handleHoverDeletion = (row, col, size, element) => {
  if (ROTATION === VERTICAL) {
    for (let i = 0; i < size; i++) {
      element = findElementByRowCol(i + row, col);
      element.style.backgroundColor = "transparent";
    }
  } else if (ROTATION === HORIZONTAL) {
    for (let i = 0; i < size; i++) {
      element = findElementByRowCol(row, col + i);
      element.style.backgroundColor = "transparent";
    }
  }
};

const findElementByRowCol = (row, col) => {
  const selector = `[row="${row}"][col="${col}"]`;
  return document.querySelector(selector);
};

export { placeBoats };
