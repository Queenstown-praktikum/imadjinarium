import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from './config';

type Topic = {
  id: number;
  name: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
};

export const topicApi = createApi({
  reducerPath: 'topicApi',
  tagTypes: ['Topic'],
  baseQuery: fetchBaseQuery({
    baseUrl: config.backendURL,
    credentials: 'include',
  }),
  endpoints: (build) => ({
    getTopics: build.query<Topic[], void>({
      query: () => 'topics',
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Topic' as const, id })), { type: 'Topic', id: 'LIST' }]
          : [{ type: 'Topic', id: 'LIST' }],
    }),
    addTopic: build.mutation<Topic, Partial<Topic>>({
      query: (body) => ({
        url: 'topics',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Topic', id: 'LIST' }],
    }),
    deleteTopic: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `topics/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, id) => [{ type: 'Topic', id }],
    }),
  }),
});

export const { useGetTopicsQuery, useAddTopicMutation, useDeleteTopicMutation } = topicApi;
