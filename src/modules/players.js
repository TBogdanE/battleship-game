class Player {
  constructor() {
    this.boats = [];
  }
}

class Computer {
  constructor() {
    this.boats = [];
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

const player = new Player();
const computerPlayer = new Computer();

export { player, computerPlayer, Boat };
