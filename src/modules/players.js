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
  constructor(name, size, pos = null) {
    this.name = name;
    this.size = size;
    this.position = pos;
    this.hits = 0;
    this.sunk = false;
  }

  hit() {
    this.hits += 1;
  }

  isSunk() {
    return hits === this.size;
  }
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
