import { placePlayerBoats } from "./handlePlayer";
import { placeComputerBoats } from "./handleComputer";
import { checkContainsAny } from "./utils/checkContainsAny";
import { computerPlayer, gameSettings, player } from "./players";

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
  console.log([row, col]);
  playerClickHandler([row, col]);
}

function playerClickHandler(position) {
  if (checkContainsAny([position], gameSettings.allHits)) {
    console.log("already hit");
    return;
  }

  checkIfBoatHit(computerPlayer, position);
  gameSettings.allHits.push(position);
  computerBox.removeEventListener("click", clickHandler);
  computerTurn();
}

function computerTurn() {
  //logic will go here
  playerTurn();
}

function checkWin(player) {}

function checkIfBoatHit(player, hitPosition) {
  player.boats.forEach((boat) => {
    //console.log("hp", hitPosition, "bp", boat.position);
    if (checkContainsAny([hitPosition], boat.position)) {
      console.log("hitted");
      boat.hit();
    }
  });
}

export { startGame };
