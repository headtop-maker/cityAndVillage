import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
  ServiceTitle,
  ImportantContact,
  userRole,
  TDocuments,
  IAppVersion,
  ServiceTitleItem,
  PrepareAds,
  GetPrepareAds,
} from './types';
import {RootState} from '../../app/store';
import {TEMP_API} from '../api/axiosInstance';
import {resetCurrentUser, setFireBaseTokenAdded} from './counterSlice';
import {Alert} from 'react-native';

export const serviceApi = createApi({
  reducerPath: 'serviceApi',
  tagTypes: [
    'Category',
    'FireBaseTokens',
    'Documents',
    'UploadFile',
    'PrepareAds',
  ],
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
        owner: string;
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
          if (error?.error?.status === 401) {
            dispatch(resetCurrentUser());
            Alert.alert(
              'Не авторизован',
              'Требуется ввести логин/пароль в приложении',
            );
          } else {
            console.log('Ошибка при выполнении мутации:', error);
          }
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
      providesTags: ['Documents'],
    }),

    addNewDocument: builder.mutation<
      {
        documentTitle: string;
        filePath: string;
        id: string;
      },
      {
        documentTitle: string;
        filePath: string;
      }
    >({
      query: data => ({
        url: '/documents',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Documents'],
    }),
    deleteDocument: builder.mutation<{data: string}, string>({
      query: id => ({
        url: `/documents/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Documents'],
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

    addPrepareAds: builder.mutation<GetPrepareAds, PrepareAds>({
      query: data => ({
        url: '/prepare-ads',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['PrepareAds'],
    }),

    deletePrepareAds: builder.mutation<{data: string}, string>({
      query: id => ({
        url: `/prepare-ads/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PrepareAds'],
    }),
    getPrepareAds: builder.query<GetPrepareAds, void>({
      query: () => '/prepare-ads',
      providesTags: ['PrepareAds'],
    }),
    getUploadFiles: builder.query<string[], void>({
      query: () => '/upload',
      providesTags: ['UploadFile'],
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
  useGetUploadFilesQuery,
  useAddNewDocumentMutation,
  useDeleteDocumentMutation,
  useGetPrepareAdsQuery,
  useAddPrepareAdsMutation,
  useDeletePrepareAdsMutation,
} = serviceApi;
