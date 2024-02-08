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
  constructor(size) {
    this.size = size;
    this.position = null;
  }
  hit() {}

  isSunk() {}
}
