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
  console.log("carrier");
  return new Promise((resolve) => {
    gameSettings.size = 5;
    checkValidPlace(resolve);
  });
};

const placeBatleship = () => {
  console.log("battleship");
  return new Promise((resolve) => {
    gameSettings.size = 4;
    checkValidPlace(resolve);
  });
};

const placeDestroyer = () => {
  console.log("destroyer");
  return new Promise((resolve) => {
    gameSettings.size = 3;
    checkValidPlace(resolve);
  });
};

const placeSubmarine = () => {
  console.log("submarine");
  return new Promise((resolve) => {
    gameSettings.size = 3;
    checkValidPlace(resolve);
  });
};

const placePatrolBoat = () => {
  console.log("patrolboat");
  return new Promise((resolve) => {
    gameSettings.size = 2;
    checkValidPlace(resolve);
  });
};

const placeBoats = () => {
  console.log("boat");
  return new Promise((resolve) => {
    gameSettings.size = 2;
    checkValidPlace(resolve);
  });
  // placeComputerRandomBoats();
};

//place the boat on the gameboard
const addBoatToGameBoard = (size, pos, resolve) => {
  const newBoat = new Boat(size, pos);
  console.log(newBoat);
  player.boats.push(newBoat);
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
  const clickHandler = () => handleClick(pos);

  const handleClick = (pos) => {
    const box = document.getElementById("player-box");
    addBoatToGameBoard(gameSettings.size, pos);
    target.removeEventListener("click", clickHandler);
    box.removeEventListener("mouseover", gameSettings.handleMouseOver);
    box.removeEventListener("mouseout", gameSettings.handleMouseOut);
    resolve();
  };

  if (getRotation() === VERTICAL) {
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
  } else if (getRotation() === HORIZONTAL) {
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

//searches the gameboard elements based on row and col
const findElementByRowCol = (row, col) => {
  const selector = `[row="${row}"][col="${col}"]`;
  return document.querySelector(selector);
};

const getRotation = () => {
  return ROTATION;
};

export { placePlayerBoats, placeComputerRandomBoats, findElementByRowCol };
