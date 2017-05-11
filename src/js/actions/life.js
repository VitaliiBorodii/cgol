import { isEqualMap, countNextGeneration } from '../utils';
import {
  PLAY_LIFE,
  STOP_LIFE,
  RESET_LIFE,
  NEXT_GENERATION_ERROR,
  RESTORE_LIFE,
  NEXT_GENERATION,
  CHANGE_FREQUENCY,
  PREV_GENERATION
} from '../constants/life';
import db from '../services/db';

export const onFrequencyChange = (frequency) => {
  return {
    type: CHANGE_FREQUENCY,
    frequency
  };
};

export const stopLife = () => {
  return {
    type: STOP_LIFE
  }
};

export const playLife = (interval) => {
  return {
    type: PLAY_LIFE,
    interval
  }
};

export const restoreLife = (restore) => ( {
  type: RESTORE_LIFE,
  restore
});

export const resetLife = () => {
  db.clear();

  return {
    type: RESET_LIFE
  }
};

export const previousStep = (state) => ({
  type: PREV_GENERATION,
  state
});

export function tick(cellsState, size) {

  const cells = cellsState.cells;

  if (!cellsState.step) { // save 0 step
    db.set(cellsState.step, cells);
  }

  const nextGeneration = countNextGeneration(cells, size);

  if (isEqualMap(cells, nextGeneration)) {
    return {
      type: NEXT_GENERATION_ERROR,
      error: `Life is Stopped!!`
    };
  }

  const nextStep = cellsState.step + 1;
  db.set(nextStep, nextGeneration);

  return {
    type: NEXT_GENERATION,
    step: nextStep,
    newGeneration: nextGeneration
  }
}
