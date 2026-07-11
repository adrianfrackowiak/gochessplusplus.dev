import axios, {
  type AxiosInstance,
  type AxiosResponse,
  HttpStatusCode,
  type InternalAxiosRequestConfig,
  isAxiosError,
} from 'axios';

import { appConfig } from '@/app/app.config';
import { ApiError } from '@/models';

export const api: AxiosInstance = axios.create({
  baseURL: appConfig.baseUrl,
  timeout: 10_000,
  responseType: 'json',
  headers: {
    Accept: 'application/json',
  },
});

let authToken: string | null = null;

export const setAuthToken: (token: string | null) => void = (token: string | null): void => {
  authToken = token;
};

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (authToken) {
      config.headers.set('Authorization', `Bearer ${authToken}`);
    } else {
      config.headers.delete('Authorization');
    }

    return config;
  },
);

api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error: unknown): Promise<never> => {
    if (isAxiosError(error)) {
      if (error.response?.status === HttpStatusCode.Unauthorized) {
        // todo: token refresh or logout
        authToken = null;
      }

      return Promise.reject(new ApiError(error.response?.status ?? 0, error.message));
    }

    return Promise.reject(error);
  },
);
