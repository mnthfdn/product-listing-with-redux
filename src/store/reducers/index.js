// src/store/reducers/index.js

import { combineReducers } from 'redux';
import productReducer from './productReducers';

const rootReducer = combineReducers({
  products: productReducer
});

export default rootReducer;
