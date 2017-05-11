import { createStore, combineReducers } from 'redux';
//import createSagaMiddleware from 'redux-saga';
//import sizeSaga from './sagas/size';
import cellsReducer from './reducers/life';
import sizeReducer from './reducers/size';
import intervalReducer from './reducers/interval';
import patternReducer from './reducers/pattern';

//const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  cells: cellsReducer,
  size: sizeReducer,
  interval: intervalReducer,
  pattern: patternReducer
});


const Store = createStore(reducers /*applyMiddleware(sagaMiddleware)*/);

//sagaMiddleware.run(sizeSaga);

export default Store;
