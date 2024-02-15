import { checkContainsAny } from "./checkContainsAny";

export function checkNearby(position, computerBoats) {
  for (let [row, col] of position) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const newRow = row + i;
        const newCol = col + j;
        if (newRow >= 0 && newRow < 10 && newCol >= 0 && newCol < 10) {
          if (checkContainsAny([[newRow, newCol]], computerBoats)) {
            return true;
          }
        }
      }
    }
  }
  return false;
}
