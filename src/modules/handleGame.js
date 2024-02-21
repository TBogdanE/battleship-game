import { placePlayerBoats } from "./handlePlayer";
import { placeComputerBoats } from "./handleComputer";
import { checkContainsAny } from "./utils/checkContainsAny";
import { computerPlayer, gameSettings, player } from "./players";
import {
  drawBoatOnGameBoard,
  removeRotateBtn,
  showBullet,
  showHittedPos,
} from "./homepageUi";
import { findElementByRowCol } from "./utils/findElement";

const computerBox = document.getElementById("computer-box");
const playerBox = document.getElementById("player-box");

async function startGame() {
  await placePlayerBoats();
  await placeComputerBoats();
  removeRotateBtn();
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
  if (checkContainsAny([hitPosition], computerPlayer.gameBoardHits)) {
    console.log("already hit");
    return;
  }

  checkIfBoatHit(computerPlayer, hitPosition);
  computerPlayer.gameBoardHits.push(hitPosition);
  computerBox.removeEventListener("click", clickHandler);

  showBullet(computerBox, hitPosition[0], hitPosition[1]);
  checkWin(computerPlayer);
  setTimeout(() => computerTurn(), 1000);
}

function computerTurn() {
  let randRow = Math.floor(Math.random() * 10);
  let randCol = Math.floor(Math.random() * 10);

  while (checkContainsAny([[randRow, randCol]], player.gameBoardHits)) {
    randRow = Math.floor(Math.random() * 10);
    randCol = Math.floor(Math.random() * 10);
  }
  player.gameBoardHits.push([randRow, randCol]);
  checkIfBoatHit(player, [randRow, randCol]);
  showBullet(playerBox, randRow, randCol);
  checkWin(player);
  playerTurn();
}

function checkIfBoatHit(player, hitPosition) {
  player.boats.forEach((boat) => {
    if (checkContainsAny([hitPosition], boat.position)) {
      showHittedPos(hitPosition[0], hitPosition[1], player.gameBoardId);
      boat.hit();
    }
  });
}

function checkWin(player) {
  return player.boats.every((boat) => boat.isSunk());
}

export { startGame };
