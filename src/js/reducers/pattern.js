import { ADD_PATTERN } from '../constants/pattern';

const initState = {
  pattern: ''
};

export default (state = initState, action) => {
  switch (action.type) {
    case ADD_PATTERN:
      return {
        ...state,
        pattern: action.pattern
      };

    default:
      return state;
  }
};
