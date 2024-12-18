import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
  ServiceTitle,
  ImportantContact,
  userRole,
  TDocuments,
  IAppVersion,
} from './types';
import {RootState} from '../../app/store';
import {TEMP_API} from '../api/axiosInstance';

export const serviceApi = createApi({
  reducerPath: 'serviceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: TEMP_API,
    prepareHeaders: headers => {
      const token = (state: RootState) => state.counter.currentUser?.userToken;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: builder => ({
    getServiceCategory: builder.query<ServiceTitle, void>({
      query: () => '/category',
    }),
    getDocuments: builder.query<TDocuments, void>({
      query: () => '/documents',
    }),
    getServiceByName: builder.query<ServiceTitle, string>({
      query: name => `/category/${name}`,
    }),

    getAllImportantContacts: builder.query<ImportantContact[], void>({
      query: () => '/important-contacts',
    }),
    getAppVersion: builder.query<IAppVersion, void>({
      query: () => '/version',
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
  useGetServiceCategoryQuery,
  useGetAllImportantContactsQuery,
  useGetAdminsQuery,
  useGetDocumentsQuery,
  useGetAppVersionQuery,
} = serviceApi;
