import { takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { postUserSingInApi, UserLoginDataType } from '../api/userApi/userApi';
import { loginUserAction } from '../store/userSlice';

function* signInSaga(action: PayloadAction<UserLoginDataType>) {
  yield postUserSingInApi(action.payload)
}

export default function* () {
  // login
  yield takeLatest(loginUserAction, signInSaga);
  // registration
  // ...
}