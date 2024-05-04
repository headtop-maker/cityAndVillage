import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {ServiceTitle, ImportantContact, userRole} from './types';
import {RootState} from '../../app/store';

export const serviceApi = createApi({
  reducerPath: 'serviceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.1.101:3000/',
    prepareHeaders: (headers, {getState}) => {
      const token = (state: RootState) => state.counter.currentUser?.userToken;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: builder => ({
    getAllServiceCategory: builder.query<ServiceTitle, void>({
      query: () => '/category',
    }),
    getServiceByName: builder.query<ServiceTitle, string>({
      query: name => `/category/${name}`,
    }),
    getAllImportantContacts: builder.query<ImportantContact[], void>({
      query: () => '/important-contacts',
    }),
    getAdmins: builder.query<
      {
        id: number;
        name: string;
        email: string;
        banned: boolean;
        userRole: userRole;
      }[],
      void
    >({
      query: () => `/auth/admins`,
    }),
  }),
});

export const {
  useGetAllServiceCategoryQuery,
  useGetServiceByNameQuery,
  useGetAllImportantContactsQuery,
  useGetAdminsQuery,
} = serviceApi;
