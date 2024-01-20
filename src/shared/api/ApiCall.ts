import {AxiosHeaderValue, AxiosInstance, Method} from 'axios';
import axios from 'axios';
import {log} from './decorators/perfDecorators';

type THeaders = Partial<{
  Accept: AxiosHeaderValue;
  'Content-Length': AxiosHeaderValue;
  'User-Agent': AxiosHeaderValue;
  'Content-Encoding': AxiosHeaderValue;
  'Content-type': AxiosHeaderValue;
  Authorization: AxiosHeaderValue;
}>;

type TRequestData<T> = {
  timeout: number;
  method: Method;
  url: string;
  data?: T;
  headers?: THeaders;
};

const headers: THeaders = {
  Accept: 'application/json',
};

export default class ApiCall {
  private axiosInstance: AxiosInstance;
  token: string;

  constructor() {
    this.axiosInstance = axios.create();
    this.token = '';
  }

  @log()
  apiRequest<T>(reqData: TRequestData<T>) {
    const call = this.axiosInstance({
      ...reqData,
      headers: reqData.headers
        ? {
            Authorization: 'Bearer ' + this.token,
            ...reqData.headers,
          }
        : {
            ...headers,
            Authorization: 'Bearer ' + this.token,
          },
    });
    return call;
  }

  setToken(data: string) {
    this.token = data;
  }
}
