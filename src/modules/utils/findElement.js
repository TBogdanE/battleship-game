//searches the gameboard elements based on row and col
export function findElementByRowCol(row, col) {
  const selector = `[row="${row}"][col="${col}"]`;
  return document.querySelector(selector);
}
