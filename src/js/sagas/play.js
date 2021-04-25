import { put, takeEvery, select, delay } from 'redux-saga/effects';

import { REQUEST_PREVIOUS_STEP, RESET_LIFE } from '../constants/lifecycles';
import { NEXT_STEP, NEXT_STEP_DONE, NEXT_STEP_ERROR, PLAY_LIFE, STOP_LIFE } from '../constants/life';
import { countNextGeneration, isEqualMap } from '../utils';

let interval;

const getCells = state => state.cells;
const getInterval = state => state.interval;
const getSize = state => state.size;

function* play() {
  stop();

  const intervalState = yield select(getInterval);

  if (!intervalState.running) {
    return; //life is stopped!!
  }

  const timeout = Math.round(60000 / intervalState.frequency);

  const result = yield tick();
  yield put(result);

  interval = yield delay(timeout);
  yield play();
}

function* nextStep () {
  stop();
  yield put(yield tick());
}

function* tick () {

  const cellsState = yield select(getCells);
  const size = yield select(getSize);

  const { cells, step } = cellsState;

  const nextGeneration = countNextGeneration(cells, size);

  if (isEqualMap(cells, nextGeneration)) {
    return {
      type: NEXT_STEP_ERROR,
      error: `Life is Stopped!!`
    };
  }

  return {
    type: NEXT_STEP_DONE,
    step: step + 1,
    cells: nextGeneration
  };
}

function stop() {
  clearInterval(interval);
}

function* playSaga() {
  yield takeEvery(PLAY_LIFE, play);
  yield takeEvery(NEXT_STEP, nextStep);
  yield takeEvery([REQUEST_PREVIOUS_STEP, STOP_LIFE, RESET_LIFE], stop);
}

export default playSaga;