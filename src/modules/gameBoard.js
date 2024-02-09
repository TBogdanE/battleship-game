import { player, computerPlayer, Boat } from "./players";
import { VERTICAL, HORIZONTAL, ROTATION } from "./homepageUi";

//makes user place boats in order
const placePlayerBoats = () => {
  placeCarrierBoat();
  // placeBatleship();
  //placeDestroyer();
  //placeSubmarine();
  //placePatrolBoat();
  // placeBoats();
};

//place carriere boat
const placeCarrierBoat = () => {
  checkValidPlace(5);
};

//place the boat on the gameboard
const placeBoat = () => {
  console.log("sa");
};

//randomly places computer boats
const placeComputerRandomBoats = () => {};

//checks if the place user want to add the boat is valid
const checkValidPlace = (size) => {
  const box = document.getElementById("player-box");

  box.addEventListener("mouseover", (event) => {
    handleMouseOver(event, size);
  });
  box.addEventListener("mouseout", (event) => {
    handleMouseOut(event, size);
  });
};

//gets the area where the mouse hovers
const handleMouseOver = (event, size) => {
  const target = event.target;
  const row = parseInt(target.getAttribute("row"));
  const col = parseInt(target.getAttribute("col"));
  let element = null;

  handleHover(target, row, col, size, element);
};

//gets the area of the last hovered element
const handleMouseOut = (event, size) => {
  const target = event.target;
  const row = parseInt(target.getAttribute("row"));
  const col = parseInt(target.getAttribute("col"));
  let element = null;

  handleHoverDeletion(row, col, size, element);
};

//applies style to the gameboard on hover
const handleHover = (target, row, col, size, element) => {
  const handleClick = () => {
    const box = document.getElementById("player-box");
    placeBoat();
    box.removeEventListener("mouseover", (event) => {
      handleMouseOver(event, size);
    });

    box.removeEventListener("mouseout", (event) => {
      handleMouseOut(event, size);
    });

    target.removeEventListener("click", handleClick);
  };

  if (ROTATION === VERTICAL) {
    if (size + row > 10) {
      target.style.backgroundColor = "var(--wrong)";
      return;
    }
    target.addEventListener("click", handleClick);
    for (let i = 0; i < size; i++) {
      element = findElementByRowCol(i + row, col);
      element.style.backgroundColor = "var(--good-place-hover)";
    }
    return;
  } else if (ROTATION === HORIZONTAL) {
    if (size + col > 10) {
      target.style.backgroundColor = "var(--wrong)";
      return;
    }
    target.addEventListener("click", handleClick);
    for (let i = 0; i < size; i++) {
      element = findElementByRowCol(row, col + i);
      element.style.backgroundColor = "var(--good-place-hover)";
    }
    return;
  }
};

//delete the style of the last visited elements
const handleHoverDeletion = (row, col, size, element) => {
  if (ROTATION === VERTICAL) {
    for (let i = 0; i < size; i++) {
      element = findElementByRowCol(i + row, col);
      element.style.backgroundColor = "transparent";
    }
    return;
  } else if (ROTATION === HORIZONTAL) {
    for (let i = 0; i < size; i++) {
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
