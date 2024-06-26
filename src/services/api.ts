import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {BASE_URL} from '../constants/url';
import {Alert} from 'react-native';
import {storage} from '../../App';

export const axiosApiInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    // 'Content-Type': 'application/json',
  },
});

axiosApiInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    try {
      const idToken = storage.getString('ID_TOKEN');

      if (idToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${idToken}`;
      }

      return config;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
);
class Api {
  async getData(url: string, params?: AxiosRequestConfig<string>) {
    return await axiosApiInstance
      .get(url, params)
      .then(this.handleResponse)
      .catch(this.errorCatcher);
  }
  async getDataCur(url: string, params?: AxiosRequestConfig<string>) {
    return await axiosApiInstance
      .get(url + `&currency=USD`, params)
      .then(this.handleResponse)
      .catch(this.errorCatcher);
  }
  async getDataWithoutUser(url: string, params?: AxiosRequestConfig<string>) {
    return await axiosApiInstance
      .get(url, params)
      .then(this.handleResponse)
      .catch(this.errorCatcher);
  }
  async post(url: string, data?: unknown, params?: AxiosRequestConfig<string>) {
    return await axiosApiInstance
      .post(url, data, params)
      .then(this.handleResponse)
      .catch(this.errorCatcher);
  }
  async patch(url: string, params?: AxiosRequestConfig<string>) {
    return await axiosApiInstance.patch(url, params);
  }
  async put(url: string, data?: unknown, params?: AxiosRequestConfig<string>) {
    return await axiosApiInstance
      .put(url, data, params)
      .then(this.handleResponse)
      .catch(this.errorCatcher);
  }
  async delete(url: string, params?: AxiosRequestConfig<string>) {
    return await axiosApiInstance
      .delete(url, params)
      .then(this.handleResponse)
      .catch(this.errorCatcher);
  }
  private handleResponse(response: AxiosResponse) {
    return {
      status: response.status,
      data: response.data,
      headers: response.headers,
    };
  }
  private errorCatcher = (error: any) => {
    let e = {} as any;

    switch (error.response?.status) {
      case 401:
        return;
      case 409:
        Alert.alert('You have already placed your bet for this lot');
        console.log(error.response);
      case 501:
      case 503:
        return;
      case 426:
        return;
      default:
        Alert.alert(error.message || error.errorMessage);
        console.log('Request failed with the code: ', error.response?.status);
    }

    if (error.response) {
      if (error.response?.status) {
        e.status = error.response.status;
      }
      if (error?.code) {
        e.code = error.code;
      }
      if (error?.message) {
        e.errorMessage = error.message;
      }
      if (
        error.response?.request?._response &&
        error.response.headers.getContentType === 'application/json'
      ) {
        const respBody = JSON.parse(error.response.request._response);
        e = {
          ...e,
          message: error?.response?.data?.message,
          ...respBody,
        };
      }
    }

    return error;
  };
}

export default new Api();
