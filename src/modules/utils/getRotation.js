const VERTICAL = "Vertical";
const HORIZONTAL = "Horizontal";
let ROTATION = VERTICAL;
let rowStep = 0;
let colStep = 0;

const getRotation = (data = null) => {
  if (data !== null || data === VERTICAL || data === HORIZONTAL)
    ROTATION = data;

  if (ROTATION === VERTICAL) {
    return [ROTATION, (rowStep = 1), (colStep = 0)];
  } else if (ROTATION === HORIZONTAL) {
    return [ROTATION, (rowStep = 0), (colStep = 1)];
  }
  return;
};

export { VERTICAL, HORIZONTAL, ROTATION, getRotation };
