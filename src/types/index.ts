// Types
import type {
  AxiosInstance,
  AxiosRequestConfig,
  RawAxiosResponseHeaders,
  AxiosResponseHeaders,
  InternalAxiosRequestConfig
} from "axios";

export declare class AxiosApiRequestType {
  static init(_defaultConfig: AxiosRequestConfig): void;
  static getClient(): AxiosApiRequestType;
  static getNewAxiosInstance(_defaultConfig: AxiosRequestConfig): AxiosInstance;

  // Methods
  get<T>(
    url: string,
    config: AxiosRequestConfig,
    configResponse: ConfigResponseDataType
  ): Promise<CustomResponseType<T, AxiosRequestConfig> | T>;
  post<T>(
    url: string,
    body: Record<string, any>,
    config: AxiosRequestConfig,
    configResponse: ConfigResponseDataType
  ): Promise<CustomResponseType<T, AxiosRequestConfig> | T>;
  put<T>(
    url: string,
    body: Record<string, any>,
    config: AxiosRequestConfig,
    configResponse: ConfigResponseDataType
  ): Promise<CustomResponseType<T, AxiosRequestConfig> | T>;
  patch<T>(
    url: string,
    body: Record<string, any>,
    config: AxiosRequestConfig,
    configResponse: ConfigResponseDataType
  ): Promise<CustomResponseType<T, AxiosRequestConfig> | T>;
  delete<T>(
    url: string,
    config: AxiosRequestConfig,
    configResponse: ConfigResponseDataType
  ): Promise<CustomResponseType<T, AxiosRequestConfig> | T>;
}

// Allowed methods to launch a request
export type MethodTypes = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

// Elements that can be returned in the response or error
export type ConfigResponseTypes =
  | "status"
  | "statusText"
  | "headers"
  | "config"
  | "request";

// Array with valid elements that can be returned in the error or response
export type ConfigResponseDataType = Array<ConfigResponseTypes>;

// Custom response type, since 'data' is always returned
export interface CustomResponseType<T = any, D = any> {
  data: T;
  status?: number;
  statusText?: string;
  headers?: RawAxiosResponseHeaders | AxiosResponseHeaders;
  config?: InternalAxiosRequestConfig<D>;
  request?: any;
}
