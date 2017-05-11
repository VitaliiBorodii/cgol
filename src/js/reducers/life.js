import { TOGGLE_CELL } from '../constants/cells';
import { RESET_LIFE, RESTORE_LIFE, NEXT_GENERATION, PREV_GENERATION } from '../constants/life';
import { ADD_PATTERN } from '../constants/pattern';
import { formKey } from '../utils/index';

const initState = {
  cells: new Map(),
  step: 0,
  readOnly: false,
};

export default (state = initState, action) => {
  let newCells;
  switch (action.type) {

    case RESTORE_LIFE:
      return {
        ...state,
        ...action.restore
      };

    case TOGGLE_CELL:
      const { x, y } = action.coords;
      newCells = new Map(state.cells);
      const key = formKey(x, y);

      return state.readOnly ? state : {
        ...state,
        cells: newCells.has(key) ? (newCells.delete(key) && newCells) : (newCells.set(key, 1))
      };

    case ADD_PATTERN:

      return state.readOnly ? state : {
        ...state,
        cells: action.cells.reduce((acc, key) => {
          return acc.set(key, 1);
        }, new Map(state.cells))
      };

    case NEXT_GENERATION:

      return {
        ...state,
        step: action.step,
        cells: action.newGeneration,
        readOnly: false,
      };

    case PREV_GENERATION: {
      return {
        ...state,
        readOnly: true,
        cells: action.state.cells,
        step: action.state.step
      };
    }

    case RESET_LIFE: {
      return {
        ...initState
      };
    }

    default:
      return state;
  }
};
