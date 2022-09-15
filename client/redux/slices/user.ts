import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApplicationState } from '../store';

export interface IUser {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

const initialState: IUser = {
  id: 3,
  first_name: 'Дмитрий',
  second_name: 'Дрозов',
  display_name: '',
  login: 'drozdov',
  email: '',
  phone: '',
  avatar: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (_, action: PayloadAction<IUser>) => ({ ...action.payload }),
    clearUserData: () => initialState,
  },
});

const {
  reducer: userReducer,
  actions: { setUserData, clearUserData },
} = userSlice;

export { userReducer, setUserData, clearUserData };

export const userSelectors = {
  user: (s: ApplicationState) => s.user,
};
