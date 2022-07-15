import { axiosGet, axiosPost } from '..';

export type UserLoginDataType = {
  login: string;
  password: string;
}

export type UserRegistrationDataType = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export type UserDataType = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: number;
  avatar: string;
}

export const getUserApi = () => axiosGet('/auth/user')
export const postUserSingInApi = (loginData: UserLoginDataType) => axiosPost<UserLoginDataType, UserDataType>('/auth/signin', loginData)
export const postUserSingUpApi = (regData: UserRegistrationDataType) => axiosPost<UserRegistrationDataType, UserDataType>('/auth/signin', regData)
export const logoutUserApi = () => axiosPost('/auth/logout')
