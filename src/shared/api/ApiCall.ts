import {AxiosInstance} from 'axios';
import axios from 'axios';
import {log} from './decorators/perfDecorators';

const headers = {
  Accept: 'application/json',
};
const IMAGE_URL = 'https://api.slingacademy.com/v1/';

export default class ApiCall {
  private axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = axios.create({
      headers,
      timeout: 10000,
    });
  }

  @log()
  apiRequest() {
    const call = this.axiosInstance({
      timeout: 10000,
      method: 'get',
      url: `${IMAGE_URL}sample-data/photos`,
    });
    return call;
  }
}
