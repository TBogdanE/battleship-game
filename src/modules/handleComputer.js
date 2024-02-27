import { HORIZONTAL, VERTICAL } from "./utils/getRotation";
import { Boat, computerPlayer } from "./players";
import { checkContainsAny } from "./utils/checkContainsAny";
import { findElementByRowCol } from "./utils/findElement";
import { checkNearby } from "./utils/checkNearby";

const box = document.getElementById("computer-box");

//place computer boats in order
async function placeComputerBoats() {
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

//handles the addition of boats
function placeNewBoat(name, size) {
  return new Promise((resolve) => {
    checkValidPlace(resolve, name, size);
  });
}
//checks if the place where coomputer want to place the boat is valid
function checkValidPlace(resolve, name, size) {
  let position = randomPosition(size);
  let computerBoats = computerPlayer.boatPositions();
  console.log("position", position, "comp", computerBoats);

  //while the position isn't valid, search for a valid one
  while (
    checkContainsAny(position, computerBoats) ||
    checkNearby(position, computerBoats)
  ) {
    position = randomPosition(size);
    step += 1;
  }

  const newBoat = new Boat(name, size, position);
  computerPlayer.boats.push(newBoat);

  //temporary !!!!!!!!!!!!!
  //SHOWS COMPUTER BOATS
  /*for (let element of position) {
    const e = findElementByRowCol(box, element[0], element[1]);
    e.style.backgroundColor = "var(--good-place-hover)";
  }*/
  resolve();
}

//returns random position for boat placement
function randomPosition(size) {
  let arr = [];
  let subRow, subCol;

  const [rotation, rowStep, colStep] = randomRotation();

  if (rotation === VERTICAL) {
    subRow = size + 1;
    subCol = 10;
  } else {
    subRow = 10;
    subCol = size + 1;
  }

  const startRow = Math.floor(Math.random() * subRow);
  const startCol = Math.floor(Math.random() * subCol);

  for (let i = 0; i < size; i++) {
    const newRow = startRow + i * rowStep;
    const newCol = startCol + i * colStep;
    arr.push([newRow, newCol]);
  }
  console.log("arr", arr);
  return arr;
}

//returns random rotation
function randomRotation() {
  const randomNumber = Math.random();
  let rotation, rowStep, colStep;
  if (randomNumber < 0.5) {
    rotation = VERTICAL;
    rowStep = 1;
    colStep = 0;
  } else {
    rotation = HORIZONTAL;
    rowStep = 0;
    colStep = 1;
  }

  return [rotation, rowStep, colStep];
}
export { placeComputerBoats, checkNearby };
