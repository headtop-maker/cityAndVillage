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
  constructor() {
    this.axiosInstance = axios.create();
  }

  @log()
  apiRequest<T>(reqData: TRequestData<T>) {
    const call = this.axiosInstance({
      ...reqData,
      headers: reqData.headers ? reqData.headers : headers,
    });
    return call;
  }
}
