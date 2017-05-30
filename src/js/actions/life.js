import {
  PLAY_LIFE,
  STOP_LIFE,
  NEXT_STEP,
  CHANGE_FREQUENCY
} from '../constants/life';

import { REQUEST_LAST_STEP, REQUEST_PREVIOUS_STEP, RESET_LIFE } from '../constants/lifecycles'

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

export const playLife = () => {
  return {
    type: PLAY_LIFE
  }
};

export const restoreLife = () => ( {
  type: REQUEST_LAST_STEP
});

export const resetLife = () => {
  return {
    type: RESET_LIFE
  }
};

export const previousStep = (step) => ({
  type: REQUEST_PREVIOUS_STEP
});

export const nextStep = () => {
  return {
    type: NEXT_STEP
  }
};
