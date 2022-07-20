export const compareArrays = (arr1, arr2) => {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
};
export const randomFrom2DArray = (arr) => {
  const x = Math.floor(Math.random() * arr.length);
  const y = Math.floor(Math.random() * arr.length);
  return [x, y];
};
export const randomMultiFrom2DArray = (arr, num) => {
  const result = [];
  while (result.length < num) {
    const newElement = randomFrom2DArray(arr);
    let isOkay = true;
    result.forEach((el) => {
      if (compareArrays(el, newElement)) {
        isOkay = false;
      }
    });
    if (isOkay) result.push(newElement);
  }
  return result;
};
export const getAdjacentElementsINArray = (x, y, arr) => {
  const el = [];
  const size = arr.length;
  //up
  if (x > 0) {
    el.push([x - 1, y]);
  }
  //down
  if (x < size - 1) {
    el.push([x + 1, y]);
  }
  //left
  if (y > 0) {
    el.push([x, y - 1]);
  }
  //right
  if (y < size - 1) {
    el.push([x, y + 1]);
  }
  // top left
  if (x > 0 && y > 0) {
    el.push([x - 1, y - 1]);
  }
  // top right
  if (x > 0 && y < size - 1) {
    el.push([x - 1, y + 1]);
  }
  // bottom right
  if (x < size - 1 && y < size - 1) {
    el.push([x + 1, y + 1]);
  }
  // bottom left
  if (x < size - 1 && y > 0) {
    el.push([x + 1, y - 1]);
  }
  return el;
};
