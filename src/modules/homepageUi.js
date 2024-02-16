import { findElementByRowCol } from "./utils/findElement";
import { player } from "./players";
import {
  ROTATION,
  VERTICAL,
  HORIZONTAL,
  getRotation,
} from "./utils/getRotation";
import { startGame } from "./handleGame";

const playerBox = document.getElementById("player-box");
const computerBox = document.getElementById("computer-box");

const renderPlayerBox = () => {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let element = document.createElement("div");
      element.id = `player-box-row${i}col${j}`;
      element.classList.add("box-div");
      element.setAttribute("row", i);
      element.setAttribute("col", j);
      playerBox.appendChild(element);
    }
  }
};

const renderComputerBox = () => {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let element = document.createElement("div");
      element.id = `computer-box-row${i}col${j}`;
      element.classList.add("box-div");
      element.setAttribute("row", i);
      element.setAttribute("col", j);
      computerBox.appendChild(element);
    }
  }
};

const btnStartGame = () => {
  const page = document.querySelector("body");
  const button = document.getElementById("btn-start-game");
  const handleBtn = () => {
    startGame();
    if (page.contains(button)) {
      page.removeChild(button);
      button.removeEventListener("click", handleBtn);
      rotateBoatBtn();
    }
  };

  button.addEventListener("click", handleBtn);
};

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

const drawBoatOnGameBoard = () => {
  const boatsArea = player.boats;
  for (const boat of boatsArea) {
    for (const [row, col] of boat.position) {
      const element = findElementByRowCol(playerBox, row, col);
      element.style.backgroundColor = "var(--element)";
    }
  }
  return;
};

function showHittedBoad(row, col) {
  const element = findElementByRowCol(computerBox, row, col);
  element.style.backgroundColor = "var(--wrong)";
}

export {
  renderComputerBox,
  renderPlayerBox,
  btnStartGame,
  drawBoatOnGameBoard,
  showHittedBoad,
};
