import { put, takeEvery, select } from 'redux-saga/effects'

import { ADD_PATTERN, ADD_PATTERN_DONE, TOGGLE_CELL, TOGGLE_CELL_DONE } from '../constants/cells';
import { READ_ONLY_ERROR } from '../constants/lifecycles'
import { formKey } from '../utils';

const getCells = state => state.cells;
const getSize = state => state.size;

function* toggleCell(action) {
  const { coords: {x, y} } = action;
  const cells = yield select(getCells);

  const newCells = new Map(cells.cells);
  const key = formKey(x, y);

  yield put({
    type: TOGGLE_CELL_DONE,
    cells: newCells.has(key) ? (newCells.delete(key) && newCells) : (newCells.set(key, 1)),
    step: cells.step
  });
}

function* addPattern(action) {
  const { pattern } = action;

  const cells = yield select(getCells);
  const size = yield select(getSize);

  const x = size.xCount;
  const y = size.yCount;

  if (cells.readOnly) {
    return yield put({
      type: READ_ONLY_ERROR
    });
  }

  const patternString = pattern.split('\n');

  const patternHeight = patternString.length;
  let patternWidth = 0;

  patternString.forEach(row => {
    const len = row.length;
    if (len > patternWidth) {
      patternWidth = len;
    }
  });

  const startY = Math.floor((y - patternHeight) / 2);
  const startX = Math.floor((x - patternWidth) / 2);

  const newCells = [];
  patternString.forEach((row, j) => {
    row
      .split('')
      .forEach((cell, i) => {
        const x = startX + i;
        const y = startY + j;
        if (cell === '*') {
          newCells.push(formKey(x, y));
        }
      });
  });

  yield put({
    type: ADD_PATTERN_DONE,
    pattern,
    cells: newCells.reduce((acc, key) => {
      return acc.set(key, 1);
    }, new Map(cells.cells)),
    step: cells.step
  });
}

function* cellSaga() {
  yield takeEvery(ADD_PATTERN, addPattern);
  yield takeEvery(TOGGLE_CELL, toggleCell);
}

export default cellSaga;