import { spawn } from 'redux-saga/effects';
import loginSagas from './loginSagas'

export default function* rootSaga() {
  yield spawn(loginSagas);
}
