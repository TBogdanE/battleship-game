class Player {
  constructor() {
    this.boats = [];
  }

  boatPositions() {
    let arr = [];
    for (let boats of this.boats) {
      for (let position of boats.position) {
        arr.push(position);
      }
    }
    return arr;
  }
}

class Computer {
  constructor() {
    this.boats = [];
  }

  boatPositions() {
    let arr = [];
    for (let boats of this.boats) {
      for (let position of boats.position) {
        arr.push(position);
      }
    }
    return arr;
  }
}

class Boat {
  constructor(size, pos = null) {
    this.size = size;
    this.position = pos;
  }
  hit() {}

  isSunk() {}
}

class settings {
  constructor() {
    this.size = 0;
    this.handleMouseOver = null;
    this.handleMouseOut = null;
  }
}

const gameSettings = new settings();
const player = new Player();
const computerPlayer = new Computer();

export { gameSettings, player, computerPlayer, Boat };
