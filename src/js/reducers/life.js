import { NEXT_STEP_DONE } from '../constants/life';
import { RESET_LIFE, RESTORE_LIFE, RECEIVE_PREVIOUS_STEP } from '../constants/lifecycles';
import { ADD_PATTERN_DONE, TOGGLE_CELL_DONE } from '../constants/cells';

const initState = {
  cells: new Map(),
  step: 0,
  readOnly: false,
};

export default (state = initState, action) => {

  switch (action.type) {

    case RESTORE_LIFE:
      return {
        ...state,
        ...action.restore
      };

    case TOGGLE_CELL_DONE:
      return state.readOnly ? state : {
        ...state,
        cells: action.cells
      };

    case ADD_PATTERN_DONE:

      return {
        ...state,
        cells: action.cells
      };

    case NEXT_STEP_DONE:

      return {
        ...state,
        step: action.step,
        cells: action.cells,
        readOnly: false,
      };

    case RECEIVE_PREVIOUS_STEP:
    {
      return {
        ...state,
        readOnly: true,
        cells: action.cells,
        step: state.step - 1
      };
    }

    case RESET_LIFE:
    {
      return {
        ...initState
      };
    }

    default:
      return state;
  }
};
