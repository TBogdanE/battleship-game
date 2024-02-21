import { placePlayerBoats } from "./handlePlayer";
import { placeComputerBoats } from "./handleComputer";
import { checkContainsAny } from "./utils/checkContainsAny";
import { computerPlayer, gameSettings, player } from "./players";
import { drawBoatOnGameBoard, showBullet, showHittedBoad } from "./homepageUi";
import { findElementByRowCol } from "./utils/findElement";

const computerBox = document.getElementById("computer-box");
const playerBox = document.getElementById("player-box");

async function startGame() {
  //await placePlayerBoats();
  await placeComputerBoats();
  playerTurn();
}

function playerTurn() {
  computerBox.addEventListener("click", clickHandler);
}

function clickHandler(event) {
  const row = parseInt(event.target.getAttribute("row"));
  const col = parseInt(event.target.getAttribute("col"));
  console.log("selected", [row, col]);
  playerClickHandler([row, col]);
}

function playerClickHandler(hitPosition) {
  if (checkContainsAny([hitPosition], gameSettings.allHits)) {
    console.log("already hit");
    return;
  }

  checkIfBoatHit(computerPlayer, hitPosition);
  gameSettings.allHits.push(hitPosition);
  computerBox.removeEventListener("click", clickHandler);

  showBullet(computerBox, hitPosition[0], hitPosition[1]);
  checkWin(computerPlayer);
  setTimeout(() => computerTurn(), 1000);
}

function computerTurn() {
  const randRow = Math.floor(Math.random() * 10);
  const randCol = Math.floor(Math.random() * 10);

  if (checkContainsAny([[randRow, randCol]], gameSettings.allHits)) {
    computerTurn();
    console.log("already hit");
    return;
  }

  showBullet(playerBox, randRow, randCol);
  checkWin(player);
  playerTurn();
}

function checkIfBoatHit(player, hitPosition) {
  player.boats.forEach((boat) => {
    if (checkContainsAny([hitPosition], boat.position)) {
      showHittedBoad(hitPosition[0], hitPosition[1]);
      console.log("hitted", hitPosition[0], hitPosition[1]);
      boat.hit();
      console.log("boat", boat.hits);
    }
  });
}

function checkWin(player) {
  return player.boats.every((boat) => boat.isSunk());
}

export { startGame };
