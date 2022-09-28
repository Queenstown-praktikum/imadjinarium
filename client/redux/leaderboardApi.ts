import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from './config';

export const leaderboardApi = createApi({
  reducerPath: 'leaderboard',
  baseQuery: fetchBaseQuery({
    baseUrl: config.baseURL,
    credentials: 'include',
  }),
  endpoints: (build) => ({
    leaderboardSetScore: build.mutation({
      query: (data: {
        id: number,
        score: number,
        avatar: string,
        login: string,
      }) => ({
        url: '/leaderboard',
        method: 'POST',
        body: {
          data,
          ratingFieldName: 'score',
          teamName: 'queenstown',
        },
        responseHandler: (response: Response) => {
          if (response.status === 200) {
            return response.text();
          }
          return response.json();
        },
      }),
    }),
    getLeaderboard: build.mutation({
      query: () => ({
        url: '/leaderboard/queenstown',
        method: 'POST',
        body: {
          ratingFieldName: 'score',
          cursor: 0,
          limit: 1000,
        },
      }),
    }),
  }),
});

export const {
  useLeaderboardSetScoreMutation,
  useGetLeaderboardMutation,
} = leaderboardApi;
