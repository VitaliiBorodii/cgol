import { WINDOW_SIZE_CHANGE, SCALE_CHANGE } from '../constants/size';

const initState = {
  rectSize: 10,
  canvasHeight: 0,
  canvasWidth: 0,
  xCount: 0,
  yCount: 0,
};

export default (state = initState, action) => {

  switch (action.type) {
    case WINDOW_SIZE_CHANGE:
      const { rectSize } = state;
      const xCount = Math.floor(action.sizes.width / rectSize);
      const yCount = Math.floor(action.sizes.height / rectSize);

      return {
        ...state,
        xCount,
        yCount,
        canvasWidth: rectSize * xCount,
        canvasHeight: rectSize * yCount
      };

    case SCALE_CHANGE:

      let setRectSize = state.rectSize;
      const newRectSize = setRectSize + action.direction;

      if ((newRectSize < state.xCount && newRectSize < state.yCount) && (newRectSize >= 2)) {

        return {
          ...state,
          rectSize: newRectSize,
          xCount: Math.floor(state.canvasWidth / newRectSize),
          yCount: Math.floor(state.canvasHeight / newRectSize)
        };

      }

      return state;

    default:
      return state;
  }
};
