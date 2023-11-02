import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
// Types
import type {
  AxiosApiRequestType,
  MethodTypes,
  ConfigResponseDataType,
  CustomResponseType
} from "./types";

/**
 * Client configured with an axios instance to make all requests to the API, generating a
 * single instance for all requests.
 * @see https://axios-http.com/es/docs/api_intro
 */
class AxiosApiRequest implements AxiosApiRequestType {
  private static client: AxiosApiRequest;
  private readonly instance: AxiosInstance;
  readonly defaultConfig: AxiosRequestConfig;

  /**
   * We initialize all the values of the class
   * @param _defaultConfig Object with the initial configuration of the axios instance
   */
  constructor(_defaultConfig: AxiosRequestConfig) {
    this.defaultConfig = _defaultConfig;
    this.instance = axios.create(_defaultConfig);
  }

  /**
   * Function that is responsible for initializing the values for the axios client.
   * @param _defaultConfig Object with the initial configuration of the axios instance
   */
  static init(_defaultConfig: AxiosRequestConfig): void {
    this.client = new AxiosApiRequest(_defaultConfig);
  }

  /**
   * Function that obtains the same instance that was generated in the 'init' method with the singleton pattern.
   * @returns Client instance
   */
  static getClient(): AxiosApiRequest {
    return this.client;
  }

  /**
   * Function that returns a new axios instance without storing anything in the class
   * @param _defaultConfig Object with the initial configuration of the axios instance
   * @returns New axios instance
   */
  static getNewAxiosInstance(
    _defaultConfig: AxiosRequestConfig
  ): AxiosInstance {
    return axios.create(_defaultConfig);
  }

  /**
   * Function that makes a 'GET' type request with axios.
   * @param url URL to which the request will be made
   * @param config Object with configuration
   * @returns Request response
   */
  get<T>(
    url: string,
    config: AxiosRequestConfig = {},
    configResponse: ConfigResponseDataType = []
  ): Promise<CustomResponseType<T, AxiosRequestConfig> | T> {
    return this.request<T>("GET", url, {}, config, configResponse);
  }

  /**
   * Function that makes a 'POST' type request with axios.
   * @param url URL to which the request will be made
   * @param body Object with the parameters to send in the request
   * @param config Object with configuration
   * @returns Request response
   */
  post<T>(
    url: string,
    body: Record<string, any>,
    config: AxiosRequestConfig = {},
    configResponse: ConfigResponseDataType = []
  ): Promise<CustomResponseType<T, AxiosRequestConfig> | T> {
    return this.request<T>("POST", url, body, config, configResponse);
  }

  /**
   * Function that makes a 'PUT' type request with axios.
   * @param url URL to which the request will be made
   * @param body Object with the parameters to send in the request
   * @param config Object with configuration
   * @returns Request response
   */
  put<T>(
    url: string,
    body: Record<string, any>,
    config: AxiosRequestConfig = {},
    configResponse: ConfigResponseDataType = []
  ): Promise<CustomResponseType<T, AxiosRequestConfig> | T> {
    return this.request<T>("PUT", url, body, config, configResponse);
  }

  /**
   * Function that makes a 'PATCH' type request with axios.
   * @param url URL to which the request will be made
   * @param body Object with the parameters to send in the request
   * @param config Object with configuration
   * @returns Request response
   */
  patch<T>(
    url: string,
    body: Record<string, any>,
    config: AxiosRequestConfig = {},
    configResponse: ConfigResponseDataType = []
  ): Promise<CustomResponseType<T, AxiosRequestConfig> | T> {
    return this.request<T>("PATCH", url, body, config, configResponse);
  }

  /**
   * Function that makes a 'DELETE' type request with axios.
   * @param url URL to which the request will be made
   * @param config Object with configuration
   * @returns Request response
   */
  delete<T>(
    url: string,
    config: AxiosRequestConfig = {},
    configResponse: ConfigResponseDataType = []
  ): Promise<CustomResponseType<T, AxiosRequestConfig> | T> {
    return this.request<T>("DELETE", url, {}, config, configResponse);
  }

  /**
   * The function will return the value of the 'data' property if '_configResponse' is empty.
   * Otherwise it will return an object with each of the values indicated in '_configResponse'
   * plus the value of 'data'.
   * @param _response Response to success or error of the request
   * @param  Array with valid elements that can be returned in the error or response
   * @returns Custom response, 'data' will always be returned
   */
  private generateResponse<T>(
    _response: AxiosResponse,
    _configResponse: ConfigResponseDataType
  ): CustomResponseType<T, AxiosRequestConfig> | T {
    // If there is no '_configResponse', 'data' is always returned so as not to have to access it
    if (!_configResponse.length) {
      return _response.data as T;
    }

    /**
     * If '_configResponse' exists, 'data' is always returned within an object plus the properties
     * specified in '_configResponse'.
     */
    const response: CustomResponseType<T, AxiosRequestConfig> = {
      data: _response.data
    };

    // Adds to 'response' each of the response data that the user specifies in '_configResponse'
    _configResponse.forEach((config: keyof AxiosResponse) => {
      if (_response[config]) {
        response[config] = _response[config];
      }
    });

    return response;
  }

  /**
   * Function that sets up the configuration to make all requests with an axios instance.
   * @param method Method with which the request will be invoked
   * @param url URL to which the request will be made
   * @param body Object with the parameters to send in the request
   * @param config Object with configuration
   * @returns Custom promise with response or error attributes
   */
  private request<T>(
    method: MethodTypes,
    url: string,
    data = {},
    config: AxiosRequestConfig<any>,
    configResponse: ConfigResponseDataType
  ): Promise<CustomResponseType<T, AxiosRequestConfig> | T> {
    // We merge the configuration headers in init, plus those specified by the user in each method
    const { headers } = config;
    const { headers: headersDefaultConfig } = this.defaultConfig;
    const newHeaders = { ...headersDefaultConfig, ...headers };

    // Configuration object to generate the request.
    const requestConfig: AxiosRequestConfig = {
      ...config,
      method,
      url,
      headers: newHeaders
    };

    /**
     * If data contains elements, it is added to the request.
     * For the POST, PUT and PATCH methods, this attribute is always sent, even if it is an empty object
     */
    if (
      Object.keys(data).length ||
      method === "POST" ||
      method === "PUT" ||
      method === "PATCH"
    ) {
      requestConfig.data = data;
    }

    return new Promise((resolve, reject) => {
      this.instance
        .request(requestConfig)
        .then((response) =>
          resolve(this.generateResponse<T>(response, configResponse))
        )
        .catch((error) =>
          reject(this.generateResponse<T>(error.response, configResponse))
        );
    });
  }
}

export default AxiosApiRequest;
