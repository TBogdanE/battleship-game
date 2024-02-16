import { placePlayerBoats } from "./handlePlayer";
import { placeComputerBoats } from "./handleComputer";
import { checkContainsAny } from "./utils/checkContainsAny";
import { gameSettings } from "./players";

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

  playerClickHandler([row, col]);
}

function playerClickHandler(position) {
  if (checkContainsAny([position], gameSettings.allHits)) {
    console.log("already hit");
    return;
  }
  gameSettings.allHits.push(position);
  computerBox.removeEventListener("click", clickHandler);
  computerTurn();
}

function computerTurn() {
  //logic will go here
  playerTurn();
}

function checkWin(player) {}

export { startGame };
