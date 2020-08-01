import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { rootReducer, rootInitialState } from '../reducers';

const store = createStore(
  rootReducer,
  rootInitialState,
  applyMiddleware(
    thunkMiddleware,
  ),
);

export default store;
