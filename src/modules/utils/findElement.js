//searches the gameboard elements based on row and col
export function findElementByRowCol(parent, row, col) {
  const selector = `[row="${row}"][col="${col}"]`;
  console.log("parent", parent);
  return parent.querySelector(selector);
}
