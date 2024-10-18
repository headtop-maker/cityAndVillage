import {AxiosResponse} from 'axios';

import {CounterState, IServices, userRole} from '../models/types';
import {createUserData} from '../../features/Registration/models/types';
import {loginUserData} from '../../features/Login/model/types';
import {setImportantDataType} from '../../features/Users/types/types';
import ApiCall from './ApiCall';

export const TEMP_API = 'http://193.32.188.98:3000/';

export const response = new ApiCall();

export const getCurrentNews = (): // limit: number,
Promise<AxiosResponse<CounterState['news'], unknown>> =>
  response.apiRequest({
    timeout: 3000,
    method: 'get',
    url: `${TEMP_API}news`,
  });

export const getCurrentImportant = (
  limit: number,
  userEmail: string,
): Promise<AxiosResponse<CounterState['important'], unknown>> =>
  response.apiRequest({
    timeout: 1000,
    method: 'get',
    url: `${TEMP_API}important/${userEmail}`,
  });

export const createNews = (
  data: Omit<CounterState['news'][0], 'id' | 'createdAt'>,
): Promise<AxiosResponse<any, unknown>> =>
  response.apiRequest({
    data,
    timeout: 3000,
    method: 'post',
    url: `${TEMP_API}news`,
  });

export const getImageFromServer = (): Promise<
  AxiosResponse<string[], unknown>
> =>
  response.apiRequest({
    timeout: 3000,
    method: 'get',
    url: `${TEMP_API}upload`,
  });

export const createUser = (
  data: createUserData,
): Promise<AxiosResponse<{message: string}, unknown>> =>
  response.apiRequest({
    data,
    timeout: 3000,
    method: 'post',
    url: `${TEMP_API}auth/signup`,
  });

export const loginUser = (
  data: loginUserData,
): Promise<
  AxiosResponse<{token: string; role: userRole; name: string}, unknown>
> =>
  response.apiRequest({
    data,
    timeout: 3000,
    method: 'post',
    url: `${TEMP_API}auth/login`,
  });

export const getAllUsersApi = (): Promise<
  AxiosResponse<CounterState['allUsers'], unknown>
> =>
  response.apiRequest({
    timeout: 3000,
    method: 'get',
    url: `${TEMP_API}auth`,
  });

export const setImportantMessageApi = (
  data: setImportantDataType,
): Promise<
  AxiosResponse<{token: string; role: userRole; name: string}, unknown>
> =>
  response.apiRequest({
    data,
    timeout: 3000,
    method: 'post',
    url: `${TEMP_API}important`,
  });

export const setBannedUserApi = (
  id: number,
  banned: boolean,
): Promise<
  AxiosResponse<
    {
      id: number;
      name: string;
      email: string;
      banned: boolean;
      userRole: userRole;
    },
    unknown
  >
> =>
  response.apiRequest({
    data: {banned},
    timeout: 3000,
    method: 'put',
    url: `${TEMP_API}auth/banned/${id}`,
  });

export const setFileApi = (
  formData: FormData,
): Promise<AxiosResponse<Record<string, unknown>, unknown>> =>
  response.apiRequest({
    timeout: 3000,
    data: formData,
    method: 'post',
    url: `${TEMP_API}upload`,
    headers: {
      Accept: 'application/json',
      'Content-type': 'multipart/form-data',
    },
  });

export const getServicesByCategory = (
  serviceCategory: string,
): Promise<AxiosResponse<IServices['response'], unknown>> =>
  response.apiRequest({
    timeout: 3000,
    method: 'get',
    url: `${TEMP_API}adsboard/${serviceCategory}`,
  });
