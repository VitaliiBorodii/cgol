export const formKey = (x, y) => `${x}x${y}`;
export const unformKey = (str) => str.split('x').map(Number);

export const createNeighboursArray = (x, y, maxX, maxY) => [
  [x - 1, y - 1],
  [x, y - 1],
  [x + 1, y - 1],
  [x - 1, y],
  [x + 1, y],
  [x - 1, y + 1],
  [x, y + 1],
  [x + 1, y + 1]
]
  .map(coord => {
    let [x, y] = coord;

    if (x < 0) {
      x += maxX;
    } else if (x >= maxX) {
      x -=  maxX;
    }

    if (y < 0) {
      y += maxY;
    } else if (y >= maxY) {
      y -= maxY;
    }

    return [x, y];
  });

export const isEqualMap = (a, b) => {

  if (a.size !== b.size) return false;

  let equal = true;

  a.forEach((value, key) => {
    if (!value !== !b.get(key)) {
      equal = false;
    }
  });

  if (!equal) return equal;

  b.forEach((value, key) => {
    if (!a.get(key) !== !value) {
      equal = false;
    }
  });

  return equal;
};

export const countNextGeneration = (cells, sizeState) => {

  const { xCount, yCount } = sizeState;
  const keys = cells.keys();
  const emptyCells = [];
  const keysArray = Array.from(keys);

  keysArray.forEach((key) => {
    const [x, y] = unformKey(key);
    createNeighboursArray(x, y, xCount, yCount)
      .forEach(neighbour => {
        const [x, y] = neighbour;
        const key = formKey(x, y);
        if (!cells.has(key)) {
          emptyCells.push(key)
        }
      });
  });

  const newGeneration = new Map();

  keysArray.concat(emptyCells)
    .forEach((key) => {
      const cell = cells.has(key);
      const [x, y] = unformKey(key);

      let aliveNeighbours = 0;

      createNeighboursArray(x, y, xCount, yCount)
        .forEach(neighbour => {
          const [x, y] = neighbour;

          const cell = cells.get(formKey(x, y));

          if (cell) {
            aliveNeighbours++;
          }
        });

      if (cell) {
        if (aliveNeighbours > 1 && aliveNeighbours < 4) {
          newGeneration.set(key, 1);
        }
      } else if (aliveNeighbours === 3) {
        newGeneration.set(key, 1);
      }
    });

  return newGeneration;
};

export const isEqualObj = (a, b) => {
  let equal = true;

  Object.keys(a).forEach((key) => {
    if (a[key] !== b[key]) {
      equal = false;
    }
  });

  if (!equal) return equal;

  Object.keys(b).forEach((key) => {
    if (a[key] !== b[key]) {
      equal = false;
    }
  });

  return equal;
};