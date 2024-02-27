import { renderPlayerBox, renderComputerBox, btnStartGame } from "./homepageUi";
//starts the app
//renders player and computer box, and add start game btn
const startApp = () => {
  renderPlayerBox();
  renderComputerBox();
  btnStartGame();
};

export { startApp };
