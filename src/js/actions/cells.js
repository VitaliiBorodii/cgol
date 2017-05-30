import { TOGGLE_CELL, ADD_PATTERN } from '../constants/cells';

export const onAddPattern = (pattern, coords) => {
  return {
    type: ADD_PATTERN,
    pattern,
    coords
  };
};


export const toggleCell = (coords) => {
  return {
    type: TOGGLE_CELL,
    coords,
  }
};