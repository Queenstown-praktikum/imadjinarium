import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from './config';

export const userApi = createApi({
  reducerPath: 'oAuthApi',
  baseQuery: fetchBaseQuery({
    baseUrl: config.baseURL,
    credentials: 'include',
  }),
  endpoints: (build) => ({
    getTokenByCode: build.mutation({
      query: (code) => ({
        url: '/oauth/yandex',
        method: 'POST',
        body: {
          code,
        },
      }),
    }),
  }),
});

export const {
  useGetTokenByCodeMutation
} = userApi;
