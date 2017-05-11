import { PLAY_LIFE, STOP_LIFE, RESET_LIFE, NEXT_GENERATION_ERROR, CHANGE_FREQUENCY } from '../constants/life';

const initState = {
  interval: null,
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
        interval: action.interval,
        running: true
      };

    case STOP_LIFE:
    case RESET_LIFE:

      clearInterval(state.interval);
      return {
        ...state,
        error: null,
        running: false,
        interval: null
      };

    case NEXT_GENERATION_ERROR:

      clearInterval(state.interval);
      return {
        ...state,
        running: false,
        interval: null,
        error: action.error
      };

    default:
      return state;
  }
};
