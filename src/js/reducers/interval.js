import { PLAY_LIFE, STOP_LIFE, NEXT_STEP_ERROR, CHANGE_FREQUENCY, NEXT_STEP } from '../constants/life';
import { RESET_LIFE, RECEIVE_PREVIOUS_STEP } from '../constants/lifecycles';

const initState = {
  frequency: 120,
  running: false,
  error: null
};

export default (state = initState, action) => {

  switch (action.type) {
    case CHANGE_FREQUENCY:
      return {
        ...state,
        error: null,
        frequency: action.frequency
      };

    case PLAY_LIFE:
      return {
        ...state,
        error: null,
        running: true
      };

    case STOP_LIFE:
    case RESET_LIFE:
    case RECEIVE_PREVIOUS_STEP:
    case NEXT_STEP:

      return {
        ...state,
        error: null,
        running: false,
      };

    case NEXT_STEP_ERROR:

      return {
        ...state,
        running: false,
        error: action.error
      };

    default:
      return state;
  }
};
