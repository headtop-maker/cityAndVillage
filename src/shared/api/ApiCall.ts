import {AxiosInstance, Method} from 'axios';
import axios from 'axios';
import {log} from './decorators/perfDecorators';

const headers = {
  Accept: 'application/json',
};

export default class ApiCall {
  private axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = axios.create();
  }

  @log()
  apiRequest<T>(reqData: {
    timeout: number;
    method: Method;
    url: string;
    data?: T;
  }) {
    const call = this.axiosInstance({
      ...reqData,
      headers,
    });
    return call;
  }
}
