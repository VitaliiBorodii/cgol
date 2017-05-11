import { TOGGLE_CELL } from '../constants/cells';

export const toggleCell = (coords) => {
  return {
    type: TOGGLE_CELL,
    coords
  }
};