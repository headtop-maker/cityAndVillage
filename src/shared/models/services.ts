import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {ServiceTitle} from './types';

export const serviceApi = createApi({
  reducerPath: 'serviceApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://192.168.1.101:3000/'}),
  endpoints: builder => ({
    getAllServiceCategory: builder.query<ServiceTitle, void>({
      query: () => '/category',
    }),
    getServiceByName: builder.query<ServiceTitle, string>({
      query: name => `/category/${name}`,
    }),
  }),
});

export const {useGetAllServiceCategoryQuery, useGetServiceByNameQuery} =
  serviceApi;
