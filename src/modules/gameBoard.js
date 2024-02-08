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
    const target = event.target;
    const row = parseInt(target.getAttribute("row"));
    const col = parseInt(target.getAttribute("col"));
    let element = null;
    if (ROTATION === VERTICAL) {
      if (size + row > 10) {
        target.style.backgroundColor = "red";
        return;
      }
      for (let i = 0; i < size; i++) {
        element = findElementByRowCol(i + row, col);
        element.style.backgroundColor = "green";
      }
    } else if (ROTATION === HORIZONTAL) {
      if (size + col > 10) {
        target.style.backgroundColor = "red";
        return;
      }
      for (let i = 0; i < size; i++) {
        element = findElementByRowCol(row, col + i);
        element.style.backgroundColor = "green";
      }
    }
    console.log(row, col);
  });

  box.addEventListener("mouseout", (event) => {
    const target = event.target;
    const row = parseInt(target.getAttribute("row"));
    const col = parseInt(target.getAttribute("col"));
    let element = null;

    if (ROTATION === VERTICAL) {
      for (let i = 0; i < size; i++) {
        element = findElementByRowCol(i + row, col);
        element.style.backgroundColor = "transparent"; // Reset to original state
      }
    } else if (ROTATION === HORIZONTAL) {
      for (let i = 0; i < size; i++) {
        element = findElementByRowCol(row, col + i);
        element.style.backgroundColor = "transparent";
      }
    }
  });
  return true;
};

const findElementByRowCol = (row, col) => {
  const selector = `[row="${row}"][col="${col}"]`;
  return document.querySelector(selector);
};

export { placeBoats };
