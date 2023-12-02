import axios, {AxiosResponse} from 'axios';

import {TImageResponse} from '../../entities/News/models/types';
import {CounterState, userRole} from '../models/types';
import {createUserData} from '../../widgets/Registration/models/types';
import {loginUserData} from '../../widgets/Login/model/types';

const API_URL =
  'https://65463ee9fe036a2fa95563b7.mockapi.io/apiCityAndVillage/1/';

const TEMP_API = 'http://192.168.0.105:3000';

const IMAGE_URL = 'https://api.slingacademy.com/v1/';

const headers = {
  Accept: 'application/json',
};

const axiosInstance = axios.create({
  headers,
  timeout: 10000,
});

// export const getCurrentNews = (
//   limit: number,
// ): Promise<AxiosResponse<CounterState['news'], unknown>> =>
//   axiosInstance({
//     timeout: 10000,
//     method: 'get',
//     url: `${API_URL}/News/?page=1&limit=${limit}`,
//   });

export const getCurrentNews = (
  limit: number,
): Promise<AxiosResponse<CounterState['news'], unknown>> =>
  axiosInstance({
    timeout: 10000,
    method: 'get',
    url: `${TEMP_API}/news`,
  });

export const getCurrentImportant = (
  limit: number,
): Promise<AxiosResponse<CounterState['important'], unknown>> =>
  axiosInstance({
    timeout: 10000,
    method: 'get',
    url: `${API_URL}/important/?page=1&limit=${limit}`,
  });

export const createNews = (
  data: Omit<CounterState['news'][0], 'id' | 'createdAt'>,
): Promise<AxiosResponse<any, unknown>> =>
  axiosInstance({
    data,
    timeout: 10000,
    method: 'post',
    url: `${TEMP_API}/news`,
  });

export const getImageFromServer = (): Promise<
  AxiosResponse<TImageResponse, unknown>
> =>
  axiosInstance({
    timeout: 10000,
    method: 'get',
    url: `${IMAGE_URL}sample-data/photos`,
  });

export const createUser = (
  data: createUserData,
): Promise<AxiosResponse<{token: string; role: userRole}, unknown>> =>
  axiosInstance({
    data,
    timeout: 10000,
    method: 'post',
    url: `${TEMP_API}/auth/signup`,
  });

export const loginUser = (
  data: loginUserData,
): Promise<
  AxiosResponse<{token: string; role: userRole; name: string}, unknown>
> =>
  axiosInstance({
    data,
    timeout: 10000,
    method: 'post',
    url: `${TEMP_API}/auth/login`,
  });

export const getAllUsersApi = (): Promise<
  AxiosResponse<CounterState['allUsers'], unknown>
> =>
  axiosInstance({
    timeout: 10000,
    method: 'get',
    url: `${TEMP_API}/auth`,
  });
