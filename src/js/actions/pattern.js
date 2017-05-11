import { ADD_PATTERN } from '../constants/pattern';
import { formKey } from '../utils';
export const onAddPattern = (pattern, {x, y}) => {

  const patternString = pattern.split('\n');

  const patternHeight = patternString.length;
  let patternWidth = 0;

  patternString.forEach(row => {
    const len = row.length;
    if (len > patternWidth) {
      patternWidth = len;
    }});

  const startY = Math.floor((y - patternHeight) / 2);
  const startX = Math.floor((x - patternWidth) / 2);

  const cells = [];
  patternString.forEach((row, j) => {
    row
      .split('')
      .forEach((cell, i) => {
        const x = startX + i;
        const y = startY + j;
        if (cell === '*') {
          cells.push(formKey(x, y));
        }
      });
  });

  return {
    type: ADD_PATTERN,
    pattern,
    cells
  }
};
