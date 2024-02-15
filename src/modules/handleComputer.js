import { HORIZONTAL, VERTICAL } from "./utils/getRotation";
import { Boat, computerPlayer } from "./players";
import { checkContainsAny } from "./utils/checkContainsAny";
import { findElementByRowCol } from "./utils/findElement";
import { checkNearby } from "./utils/checkNearby";

const box = document.getElementById("computer-box");

async function placeComputerBoats() {
  await placeNewBoat("Carrier", 5);
  await placeNewBoat("Batleship", 4);
  await placeNewBoat("Destroyer", 3);
  await placeNewBoat("Submarine", 3);
  await placeNewBoat("Patrol boat", 2);
  await placeNewBoat("Boat", 2);
}

//place carriere boat
function placeNewBoat(name, size) {
  return new Promise((resolve) => {
    checkValidPlace(resolve, name, size);
  });
}

function checkValidPlace(resolve, name, size) {
  let step = 0;
  let position = randomPosition(size);
  let computerBoats = computerPlayer.boatPositions();
  console.log("position", position, "comp", computerBoats);

  while (
    checkContainsAny(position, computerBoats) ||
    checkNearby(position, computerBoats)
  ) {
    if (step > 100) return;
    position = randomPosition(size);
    step += 1;
  }

  const newBoat = new Boat(name, size, position);
  computerPlayer.boats.push(newBoat);

  //temporary !!!!!!!!!!!!!
  for (let element of position) {
    const e = findElementByRowCol(box, element[0], element[1]);
    e.style.backgroundColor = "var(--good-place-hover)";
  }
  resolve();
}

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
