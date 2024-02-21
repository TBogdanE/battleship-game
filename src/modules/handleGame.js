import { placePlayerBoats } from "./handlePlayer";
import { placeComputerBoats } from "./handleComputer";
import { checkContainsAny } from "./utils/checkContainsAny";
import { computerPlayer, gameSettings, player } from "./players";
import { drawBoatOnGameBoard, showHittedBoad } from "./homepageUi";

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
  computerTurn();
  checkWin(computerPlayer);
}

function computerTurn() {
  //logic will go here
  playerTurn();
}

function checkWin(player) {
  return player.boats.every((boat) => boat.isSunk());
}

function checkIfBoatHit(player, hitPosition) {
  player.boats.forEach((boat) => {
    //console.log("hp", hitPosition, "bp", boat.position);
    if (checkContainsAny([hitPosition], boat.position)) {
      showHittedBoad(hitPosition[0], hitPosition[1]);
      console.log("hitted", hitPosition[0], hitPosition[1]);
      boat.hit();
      console.log("boat", boat.hits);
      return true;
    }
  });
  return false;
}

export { startGame };
