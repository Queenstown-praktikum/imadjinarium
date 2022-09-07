import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from './config';

export const userTagType = 'USER_API';

export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes: [userTagType],
  baseQuery: fetchBaseQuery({
    baseUrl: config.baseURL,
    credentials: 'include',
  }),
  endpoints: (build) => ({
    getUser: build.query({
      query: () => '/auth/user',
      providesTags: () => [userTagType],
    }),
    userSignIn: build.mutation({
      query: (body) => ({
        url: '/auth/signin',
        method: 'POST',
        body,
        responseHandler: (response: Response) => {
          if (response.status === 200) {
            return response.text();
          }
          return response.json();
        },
      }),
      invalidatesTags: (result) => (result ? [{ type: userTagType }] : []),
    }),
    userSignUp: build.mutation({
      query: (body) => ({
        url: '/auth/signup',
        method: 'POST',
        body,
      }),
    }),
    changeAvatar: build.mutation({
      query: (body) => {
        console.log('check body', body);
        return {
          url: '/user/profile/avatar',
          method: 'PUT',
          body,
          headers: {
            accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        };
      },
    }),
    logout: build.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useUserSignInMutation,
  useUserSignUpMutation,
  useChangeAvatarMutation,
  useLogoutMutation,
} = userApi;
