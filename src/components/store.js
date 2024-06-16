// store.js
import { createStore, combineReducers } from 'redux';
import photoReducer from './reducer';

const rootReducer = combineReducers({
  photo: photoReducer,
});

const store = createStore(rootReducer);

export default store;
