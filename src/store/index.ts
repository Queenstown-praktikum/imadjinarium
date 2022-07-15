import { configureStore, combineReducers, EnhancedStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { loginReducer } from './userSlice'
import rootSaga from '../sagas';

const reducer = combineReducers({
  login: loginReducer
})

const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();

const createStore = (): EnhancedStore => {
  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => (
      getDefaultMiddleware({
        serializableCheck: false,
      })
        .concat(loggerMiddleware)
        .concat(sagaMiddleware)
    ),
    devTools: process.env.NODE_ENV !== 'production',
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

const store = createStore();

export type AppDispatch = typeof store.dispatch;

export default store;
