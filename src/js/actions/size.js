import {
  WINDOW_SIZE_CHANGE,
  SCALE_CHANGE
} from '../constants/size';

export const windowSizeChanged = (sizes) => {
  return {
    type: WINDOW_SIZE_CHANGE,
    sizes
  }
};

export const scaleChanged = (direction) => {
  return {
    type: SCALE_CHANGE,
    direction
  }
};