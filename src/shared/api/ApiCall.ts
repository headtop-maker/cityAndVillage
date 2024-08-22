import {AxiosHeaderValue, AxiosInstance, Method} from 'axios';
import axios from 'axios';
import {log} from './decorators/perfDecorators';
import {Dispatch, SetStateAction} from 'react';

type THeaders = Partial<{
  Accept: AxiosHeaderValue;
  'Content-Length': AxiosHeaderValue;
  'User-Agent': AxiosHeaderValue;
  'Content-Encoding': AxiosHeaderValue;
  'Content-type': AxiosHeaderValue;
  Authorization: AxiosHeaderValue;
}>;

type TRequestData<T> = {
  timeout?: number;
  method: Method;
  url: string;
  data?: T;
  headers?: THeaders;
};

const headers: THeaders = {
  Accept: 'application/json',
};

type TcallOutFn = Dispatch<SetStateAction<string>> | undefined;

class OtherCall {
  callOutFn: TcallOutFn;
  requestParams: string | undefined;
  static instance: OtherCall;

  constructor() {
    if (OtherCall.instance) {
      return OtherCall.instance;
    }
    OtherCall.instance = this;
    this.requestParams = '';
    this.callOutFn = undefined;
  }
  setOtherFn(fn: Dispatch<SetStateAction<string>>) {
    if (!this.callOutFn) {
      this.callOutFn = fn;
    }
  }

  getOtherFn(data: string) {
    if (this.callOutFn) {
      this.callOutFn(data);
    }
  }

  setRequestParams(data: string) {
    if (!!data) {
      this.requestParams = data;
    }
  }

  getRequestParams() {
    if (!!this.requestParams) {
      return this.requestParams;
    }
  }
}

export const callOtherFn = new OtherCall();

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
