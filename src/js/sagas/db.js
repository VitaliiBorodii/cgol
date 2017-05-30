import { put, takeEvery, select } from 'redux-saga/effects'

import db from '../services/db';
import { ADD_PATTERN_DONE, TOGGLE_CELL_DONE } from '../constants/cells';
import { NEXT_STEP_DONE } from '../constants/life';
import { REQUEST_LAST_STEP, RESTORE_LIFE, REQUEST_PREVIOUS_STEP, RECEIVE_PREVIOUS_STEP, RESET_LIFE } from '../constants/lifecycles';

const CLEANUP_INTERVAL = 10000;
const CLEANUP_SIZE = 500;

let interval;

const cancelCleanup = () => {
  clearInterval(interval);
  interval = null;
};

const runCleanup = () => {
  interval = setInterval(() => {
    db.keys().then(r => {
      if (r.length > CLEANUP_SIZE) {
        const keysToDelete = r.slice(0, r.length - CLEANUP_SIZE);
        keysToDelete.forEach(key => db.delete(key));
        console.log(`Removing ${keysToDelete.length} keys`);
      }
    });
  }, CLEANUP_INTERVAL);
};

const getCells = state => state.cells;

function resetDb() {
  db.clear();
}

function saveStep(action) {
  db.set(action.step, action.cells);
}

function* restoreLife() {
  yield put({
    type: RESTORE_LIFE,
    restore: yield db.getLast()
  });
}

function* previousStep() {
  const cells = yield select(getCells);
  const step = cells.step - 1;

  if (step < 0) return;

  yield put({
    type: RECEIVE_PREVIOUS_STEP,
    cells: yield db.get(step)
  });
}

function* dbSaga() {
  yield takeEvery(RESET_LIFE, resetDb);
  yield takeEvery([ADD_PATTERN_DONE, NEXT_STEP_DONE, TOGGLE_CELL_DONE], saveStep);
  yield takeEvery(REQUEST_LAST_STEP, restoreLife);
  yield takeEvery(REQUEST_PREVIOUS_STEP, previousStep);
  runCleanup();
}

export default dbSaga;