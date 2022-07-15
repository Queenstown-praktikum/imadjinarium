import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import { UserLoginDataType } from '../api/userApi/userApi';

const SLICE_NAME = 'login';

// login
const loginUserAction = createAction<UserLoginDataType>(`${SLICE_NAME}/loginUser`);

export interface LoginState {
  logged: boolean;
  user: any;
}

const initialState: LoginState = {
  logged: false,
  user: null,
};

const loginSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setUserData: (state: LoginState, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.logged = true;
    },
  },
});

const {
  reducer: loginReducer,
  actions: {
    setUserData,
  },
} = loginSlice;

export {
  loginReducer,
  loginUserAction,
  setUserData,
};
