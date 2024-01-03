import {AxiosInstance} from 'axios';
import axios from 'axios';

const headers = {
  Accept: 'application/json',
};
const IMAGE_URL = 'https://api.slingacademy.com/v1/';

export type Target = Object;
export type TPropertyKey = symbol | string;
type TDescriptor<T> = TypedPropertyDescriptor<T>;
type TUpdateTitleFn = (str: string) => string | void;

export function log(
  target: Target,
  propertyKey: TPropertyKey,
  decorator: TDescriptor<TUpdateTitleFn>,
) {
  const original = decorator.value;

  decorator.value = function (...args: any) {
    console.log('args', args);
    return original?.call(this, args);
  };
}

export default class ApiCall {
  axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = axios.create({
      headers,
      timeout: 10000,
    });
  }

  async apiRequest() {
    const call = await this.axiosInstance({
      timeout: 10000,
      method: 'get',
      url: `${IMAGE_URL}sample-data/photos`,
    });
    return call;
  }
}
