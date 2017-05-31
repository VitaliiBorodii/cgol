import { TOGGLE_CELL, ADD_PATTERN } from '../constants/cells';

export const onAddPattern = (pattern) => {
  return {
    type: ADD_PATTERN,
    pattern
  };
};


export const toggleCell = (coords) => {
  return {
    type: TOGGLE_CELL,
    coords,
  }
};