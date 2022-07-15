import axios, { AxiosResponse } from 'axios'

const reqInstance = axios.create({
  baseURL: 'https://ya-praktikum.tech/api/v2',
  timeout: 15000,
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
  }
});

export const axiosGet = (url: string) => reqInstance.get(url)
export const axiosPost = <PopstParamsType, UserDataType>(
  url: string,
  params?: PopstParamsType,
): Promise<AxiosResponse<UserDataType>> => reqInstance.post(url, params)
export const axiosPut = <PutParamsType>(url: string, params: PutParamsType) => reqInstance.put(url, params)
export const axiosDelete = <DeleteParamsType>(url: string, params: DeleteParamsType) => reqInstance.delete(url, params)
