import { renderPlayerBox, renderComputerBox, btnStartGame } from "./homepageUi";
const startApp = () => {
  renderPlayerBox();
  renderComputerBox();
  btnStartGame();
};

export { startApp };
