import { findElementByRowCol } from "./utils/findElement";
import { player } from "./players";
import {
  ROTATION,
  VERTICAL,
  HORIZONTAL,
  getRotation,
} from "./utils/getRotation";
import { startGame } from "./handleGame";

//create player box
const renderPlayerBox = () => {
  const box = document.getElementById("player-box");
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let element = document.createElement("div");
      element.id = `player-box-row${i}col${j}`;
      element.classList.add("box-div");
      element.setAttribute("row", i);
      element.setAttribute("col", j);
      box.appendChild(element);
    }
  }
};

//create computer box
const renderComputerBox = () => {
  const box = document.getElementById("computer-box");
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let element = document.createElement("div");
      element.id = `computer-box-row${i}col${j}`;
      element.classList.add("box-div");
      element.setAttribute("row", i);
      element.setAttribute("col", j);
      box.appendChild(element);
    }
  }
};

//create start game button
const btnStartGame = () => {
  const page = document.querySelector("body");
  const button = document.getElementById("btn-start-game");
  const handleBtn = () => {
    startGame();
    //after starting the game, hides the start button
    if (page.contains(button)) {
      page.removeChild(button);
      button.removeEventListener("click", handleBtn);
      rotateBoatBtn();
    }
  };

  button.addEventListener("click", handleBtn);
};

//create the rotate boat button
const rotateBoatBtn = () => {
  const page = document.querySelector("body");
  const btn = document.createElement("button");
  btn.id = "btn-rotate-boat";
  btn.textContent = ROTATION;

  btn.addEventListener("click", () => {
    let rotation = ROTATION === HORIZONTAL ? VERTICAL : HORIZONTAL;
    getRotation(rotation);
    btn.textContent = ROTATION;
  });

  page.appendChild(btn);
};

//removes the rotate button
function removeRotateBtn() {
  const box = document.querySelector("body");
  const rotateBtn = document.getElementById("btn-rotate-boat");
  box.removeChild(rotateBtn);
}

//draws the boats on the gameboard
const drawBoatOnGameBoard = () => {
  const box = document.getElementById("player-box");
  const boatsArea = player.boats;
  for (const boat of boatsArea) {
    for (const [row, col] of boat.position) {
      const element = findElementByRowCol(box, row, col);
      element.style.backgroundColor = "var(--element)";
    }
  }
  return;
};

//show with red on shooted boats
function showHittedPos(row, col, id) {
  const box = document.getElementById(id);
  const element = findElementByRowCol(box, row, col);
  element.style.backgroundColor = "var(--wrong)";
}

//draws the bullet on the gameboard
function showBullet(playerBox, row, col) {
  const element = findElementByRowCol(playerBox, row, col);
  const shoot = document.createElement("div");
  shoot.classList.add("shoot-div");
  element.appendChild(shoot);
}

export {
  renderComputerBox,
  renderPlayerBox,
  btnStartGame,
  drawBoatOnGameBoard,
  showHittedPos,
  showBullet,
  removeRotateBtn,
};
