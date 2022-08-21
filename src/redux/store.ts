import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { userReducer } from './slices/user';
import { userApi } from './userApi';

const reducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  user: userReducer,
});

const loggerMiddleware = createLogger();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(userApi.middleware)
      .concat(loggerMiddleware),
});

export type ApplicationState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
