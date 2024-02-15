import { placePlayerBoats } from "./handlePlayer";
import { placeComputerBoats } from "./handleComputer";

function startGame() {
  placeComputerBoats();
  placePlayerBoats();
}

export { startGame };
