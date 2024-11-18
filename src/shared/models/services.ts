import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
  ServiceTitle,
  ImportantContact,
  userRole,
  TDocuments,
  IAppVersion,
  ServiceTitleItem,
} from './types';
import {RootState} from '../../app/store';
import {TEMP_API} from '../api/axiosInstance';
import {setFireBaseTokenAdded} from './counterSlice';

export const serviceApi = createApi({
  reducerPath: 'serviceApi',
  tagTypes: ['Category', 'FireBaseTokens'],
  baseQuery: fetchBaseQuery({
    baseUrl: TEMP_API,
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState).counter.currentUser?.userToken;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: builder => ({
    getServiceCategory: builder.query<ServiceTitle, void>({
      query: () => '/category',
      providesTags: ['Category'],
    }),
    addNewCategory: builder.mutation<
      ServiceTitleItem,
      {
        categoryName: string;
        description: string;
      }
    >({
      query: data => ({
        url: '/category',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Category'],
    }),

    addFireBaseToken: builder.mutation<
      {id: string; tokens: string},
      {
        tokens: string;
      }
    >({
      query: data => ({
        url: '/firebase-tokens',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled; // Ожидаем успешного ответа
          !!data.tokens && dispatch(setFireBaseTokenAdded(true));
        } catch (error) {
          console.log('Ошибка при выполнении мутации:', error);
        }
      },
      invalidatesTags: ['FireBaseTokens'],
    }),
    deleteCategory: builder.mutation<{data: string}, string>({
      query: id => ({
        url: `/category/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'],
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
  useDeleteCategoryMutation,
  useAddNewCategoryMutation,
  useGetServiceCategoryQuery,
  useGetAllImportantContactsQuery,
  useGetAdminsQuery,
  useGetDocumentsQuery,
  useAddFireBaseTokenMutation,
} = serviceApi;
