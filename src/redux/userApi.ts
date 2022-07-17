import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import config from './config'

const userTagType = 'USER'

export const userApi = createApi({
  reducerPath: 'user',
  tagTypes: [userTagType],
  baseQuery: fetchBaseQuery({
    baseUrl: config.baseURL,
    credentials: 'include',
  }),
  endpoints: (build) => ({
    getUser: build.query({
      query: () => '/auth/user',
      providesTags: () => [{ type: userTagType, id: userTagType }],
    }),
    userSignIn: build.mutation({
      query: (body) => ({
        url: '/auth/signin',
        method: 'POST',
        body,
      }),
      invalidatesTags: () => [{ type: userTagType, id: userTagType }],
    }),
    userSignUp: build.mutation({
      query: (body) => ({
        url: '/auth/signup',
        method: 'POST',
        body,
      }),
      invalidatesTags: () => [{ type: userTagType, id: userTagType }],
    }),
    postUserLogout: build.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: () => [{ type: userTagType, id: userTagType }],
    })
  })
})

export const {
  useGetUserQuery,
  useUserSignInMutation,
  useUserSignUpMutation,
  usePostUserLogoutMutation,
} = userApi
