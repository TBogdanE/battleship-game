import { placeBoats } from "./gameBoard";

const VERTICAL = "Vertical";
const HORIZONTAL = "Horizontal";
let ROTATION = VERTICAL;

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

const btnStartGame = () => {
  const page = document.querySelector("body");
  const button = document.getElementById("btn-start-game");
  const handleBtn = () => {
    placeBoats();
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
    ROTATION = ROTATION === HORIZONTAL ? VERTICAL : HORIZONTAL;
    btn.textContent = ROTATION;
  });

  page.appendChild(btn);
};

export { renderComputerBox, renderPlayerBox, btnStartGame };