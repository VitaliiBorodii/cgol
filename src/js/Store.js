import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import dbSaga from './sagas/db';
import cellsSaga from './sagas/cells';
import playSaga from './sagas/play';

import cellsReducer from './reducers/life';
import sizeReducer from './reducers/size';
import intervalReducer from './reducers/interval';

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  cells: cellsReducer,
  size: sizeReducer,
  interval: intervalReducer,
});

const Store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(cellsSaga);
sagaMiddleware.run(dbSaga);
sagaMiddleware.run(playSaga);

export default Store;
