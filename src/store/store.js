import { combineReducers, configureStore } from '@reduxjs/toolkit';
import errorReducer from './error';
import { logger } from './middleware/logger';
import taskReducer from './task';

const rootReducer = combineReducers({ task: taskReducer, error: errorReducer });

function createStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
  });
}

export default createStore;
