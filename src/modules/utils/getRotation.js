const VERTICAL = "Vertical";
const HORIZONTAL = "Horizontal";
let ROTATION = VERTICAL;

const getRotation = (data = null) => {
  if (data === null) return ROTATION;
  ROTATION = data;
  return;
};

export { VERTICAL, HORIZONTAL, ROTATION, getRotation };
