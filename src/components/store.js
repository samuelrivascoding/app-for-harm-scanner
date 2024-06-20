/* // store.js
import { createStore, combineReducers } from 'redux';
import photoReducer from './reducer';

const rootReducer = combineReducers({
  photo: photoReducer,
});

const store = createStore(rootReducer);

export default store;
*/

// store.js
import { configureStore } from '@reduxjs/toolkit'
import photoSlice from './reducer';

const store = configureStore({
  reducer: {
    photo: photoSlice, // Assuming visionReducer manages visionResult
    // Other reducers if any
  },
});

export default store;
