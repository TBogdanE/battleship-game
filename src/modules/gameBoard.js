import { player, computerPlayer, Boat } from "./players";
import { VERTICAL, HORIZONTAL, ROTATION } from "./homepageUi";

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
  //await placeDestroyer();
  //await placeSubmarine();
  //await placePatrolBoat();
  //await placeBoats();
};

//place carriere boat
const placeCarrierBoat = () => {
  gameSettings.size = 5;
  checkValidPlace();
};

const placeBatleship = () => {
  console.log("next");
};

//place the boat on the gameboard
const placeBoat = (size, pos) => {
  const newBoat = new Boat(size, pos);
  player.boats.push(newBoat);
  console.log(newBoat.position);
  console.log(player.boats);
  return newBoat;
};

//randomly places computer boats
const placeComputerRandomBoats = () => {};

//checks if the place user want to add the boat is valid
const checkValidPlace = () => {
  const box = document.getElementById("player-box");

  //gets the area where the mouse hovers
  gameSettings.handleMouseOver = (event) => {
    const target = event.target;
    const row = parseInt(target.getAttribute("row"));
    const col = parseInt(target.getAttribute("col"));
    let element = null;

    handleHover(target, row, col, element);
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
const handleHover = (target, row, col, element) => {
  let pos = [];
  const clickHandler = () => handleClick(pos);

  const handleClick = (pos) => {
    const box = document.getElementById("player-box");
    placeBoat(gameSettings.size, pos);

    box.removeEventListener("mouseover", gameSettings.handleMouseOver);
    box.removeEventListener("mouseout", gameSettings.handleMouseOut);
    target.removeEventListener("click", clickHandler);
  };

  if (ROTATION === VERTICAL) {
    if (gameSettings.size + row > 10) {
      target.style.backgroundColor = "var(--wrong)";
      return;
    }

    for (let i = 0; i < gameSettings.size; i++) {
      element = findElementByRowCol(i + row, col);
      pos.push([i + row, col]);
      element.style.backgroundColor = "var(--good-place-hover)";
    }

    target.addEventListener("click", clickHandler);
    return;
  } else if (ROTATION === HORIZONTAL) {
    if (gameSettings.size + col > 10) {
      target.style.backgroundColor = "var(--wrong)";
      return;
    }

    for (let i = 0; i < gameSettings.size; i++) {
      element = findElementByRowCol(row, col + i);
      pos.push([row, col + i]);
      element.style.backgroundColor = "var(--good-place-hover)";
    }

    target.addEventListener("click", clickHandler);
    return;
  }
};

//delete the style of the last visited elements
const handleHoverDeletion = (row, col, element) => {
  if (ROTATION === VERTICAL) {
    for (let i = 0; i < gameSettings.size; i++) {
      element = findElementByRowCol(i + row, col);
      element.style.backgroundColor = "transparent";
    }
    return;
  } else if (ROTATION === HORIZONTAL) {
    for (let i = 0; i < gameSettings.size; i++) {
      element = findElementByRowCol(row, col + i);
      element.style.backgroundColor = "transparent";
    }
    return;
  }
};

//searches the gameboard elements based on row and col
const findElementByRowCol = (row, col) => {
  const selector = `[row="${row}"][col="${col}"]`;
  return document.querySelector(selector);
};

export { placePlayerBoats, placeComputerRandomBoats };
