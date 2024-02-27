import { placePlayerBoats } from "./handlePlayer";
import { placeComputerBoats } from "./handleComputer";
import { checkContainsAny } from "./utils/checkContainsAny";
import { computerPlayer, player } from "./players";
import { removeRotateBtn, showBullet, showHittedPos } from "./homepageUi";

const computerBox = document.getElementById("computer-box");
const playerBox = document.getElementById("player-box");

//handles the game itself
async function startGame() {
  await placePlayerBoats();
  await placeComputerBoats();
  removeRotateBtn();
  playerTurn();
}

//adds eventlistener on computer gameboard childs
function playerTurn() {
  computerBox.addEventListener("click", clickHandler);
}

//get the coordonate where player shot
function clickHandler(event) {
  const row = parseInt(event.target.getAttribute("row"));
  const col = parseInt(event.target.getAttribute("col"));
  //console.log("selected", [row, col]);
  playerClickHandler([row, col]);
}
//handles the shooting
function playerClickHandler(hitPosition) {
  //check if player doesn't shoot on an already shooted position
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

//handle computer shooting
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

//check if boat was hit
function checkIfBoatHit(player, hitPosition) {
  player.boats.forEach((boat) => {
    if (checkContainsAny([hitPosition], boat.position)) {
      showHittedPos(hitPosition[0], hitPosition[1], player.gameBoardId);
      boat.hit();
    }
  });
}

//check if player wins, by checking if every boat of a player are sunk
function checkWin(player) {
  return player.boats.every((boat) => boat.isSunk());
}

export { startGame };
