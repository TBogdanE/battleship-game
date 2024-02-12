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
    console.log(arr);
    return arr;
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
