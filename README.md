# axios-api-request<!-- omit from toc -->

This package creates an axios handler that helps facilitate requests to endpoints with a single instance for all.

## Table of Contents

- [Installation](#installation)
- [Quick use](#quick-use)
- [Methods reference](#methods-reference)
  - [get()](#get)
  - [post()](#post)
  - [put()](#put)
  - [patch()](#patch)
  - [delete()](#delete)
- [Data Types](#data-types)
  - [ConfigResponseDataType](#configresponsedatatype)
  - [ConfigResponseTypes](#configresponsetypes)
- [Resources](#resources)
- [License](#license)

## Installation

Using npm:

  ```zsh
    npm i -D axios-api-request

    npm install --save-dev axios-api-request
  ```

Using yarn:

  ```zsh
    yarn add axios-api-request -D

    yarn add axios-api-request --dev
  ```

## Quick use

This line of code generates the same instance for all requests. This makes it easier to work with requests to an API, since the baseUrl is only declared once in this file and the methods make use of this configuration.

- Sample:

  It is important to call 'AxiosApiRequest.init' from a high-level input file that is called only once so as not to overwrite the installation

  **index.js** - It could be any other input file

  ```javascript
    import AxiosApiRequest from "axios-api-request";

    const main = () => {
      AxiosApiRequest.init({
        baseURL: "https://my-url-api/api",
        headers: { "Content-Type": "text/html" }
        timeout: 20000
      });

      // Do something...
    }
  ```

  From another file, we can make a request with traditional http methods. This retrieves the instance created in the entry file.

   **other.js**

  ```javascript
    import AxiosApiRequest from "axios-api-request";

    const myApiRequest = async () => {
      const client = AxiosApiRequest.getClient();
      const response = await client.get("/something");

      /*
        * Generate a request in the following way
        axios.request({
          baseURL: 'https://my-url-api/api',
          method: 'GET',
          url: '/something',
          headers: { "Content-Type": "text/html" },
          timeout: 20000
        });

        * Returns the service response without having to access 'data' from the axios response
        response = { ... }
      */

      // Do something...
    }
  ```

It is also possible to overwrite the value of a specified property in the config of the 'init' method and add new values.

  ```javascript
    import AxiosApiRequest from "axios-api-request";

    const myApiRequest = async () => {
      const client = AxiosApiRequest.getClient();
      const response = await client.post(
        "/product/1",
        { name: "example", id: "k39-123nb19319-asdcloj234" },
        {
          headers: { Connection: "Keep-Alive", "Content-Type": "application/json" },
          timeout: 40000
        }
      );

      /*
        * Generate a request in the following way
        axios.request({
          baseURL: 'https://my-url-api/api',
          method: 'POST',
          url: '/product/1',
          headers: { Connection: "Keep-Alive", "Content-Type": "application/json" },
          data: { name: "example", id: "k39-123nb19319-asdcloj234" },
          timeout: 40000
        });

        * Returns the service response without having to access 'data' from the axios response
        response = { ... }
      */

      // Do something...
    }
  ```

> Please review the [tests of each of the methods](https://github.com/Rod28/axios-api-request/blob/main/tests/index.spec.ts) in the tests to get a clearer idea of ​​the capabilities of their use.

## Methods reference

Description of each of the methods. To use each of these methods, you must first call 'AxiosApiRequest.init' to generate the instance with axios.

The current instance to use the following methods must first be recovered as follows:

  ```javascript
    const client = AxiosApiRequest.getClient();
  ```

- [client.get(url, config, configResponse)](#get)
- [client.post(url, data, config, configResponse)](#post)
- [client.put(url, data, config, configResponse)](#put)
- [client.patch(url, data, config, configResponse)](#patch)
- [client.delete(url, config, configResponse)](#delete)

---

### get()

  ```javascript
    client.get(url, config, configResponse)

    // Sample
    const client = AxiosApiRequest.getClient();
    const response = await client.get(
      "/products",
      { headers: { "X-Requested-With": "XMLHttpRequest" } },
      ["headers"]
    );

    /*
      response = {
        data: { ... }, -> response that the service returns
        headers: { ... } -> headers that the service returns
      };
    */
  ```

  The traditional **'GET'** method of http with some improvements

  **Parameters:**

  | Name | Type | required | Default | Description |
  | -----|------|----------|---------|------------ |
  | url | string | yes | N/A | Server URL that will be used for the request |
  | config | AxiosRequestConfig | no | {} | Axios configuration available to make the request, headers added from the 'init' method are added to those specified here. If the **'method'** or **'url'** attribute is specified here, they will be ignored since these are configured in each of the methods to make http requests. Review [Axios config](https://axios-http.com/es/docs/req_config) for more information. |
  | configResponse | ConfigResponseDataType | no | [] | Array with the name of the attributes that the request could return. By default it always returns the content of 'data', review [Axios response schema](https://axios-http.com/es/docs/res_schema ) for more information. |

---

### post()

  ```javascript
    client.post(url, data, config, configResponse)

    // Sample
    const client = AxiosApiRequest.getClient();
    const response = await client.post(
      "/product/1",
      { name: "example", id: "k39-123nb19319-asdcloj234" },
      { headers: { "Content-Type": "application/json" } },
      ["headers", "status"]
    );

    /*
      response = {
        data: { ... }, -> response that the service returns
        headers: { ... } -> headers that the service returns
        status: { ... } -> status that the service returns
      };
    */
  ```

  The traditional **'POST'** method of http with some improvements

  **Parameters:**

  | Name | Type | required | Default | Description |
  | -----|------|----------|---------|------------ |
  | url | string | yes | N/A | Server URL that will be used for the request |
  | data | object | yes | N/A | These are the data to be sent as the body of the request. It must always be an object, if this is not required send an empty object |
  | config | AxiosRequestConfig | no | {} | Axios configuration available to make the request, headers added from the 'init' method are added to those specified here. If the **'method'** or **'url'** attribute is specified here, they will be ignored since these are configured in each of the methods to make http requests. Review [Axios config](https://axios-http.com/es/docs/req_config) for more information.. |
  | configResponse | ConfigResponseDataType | no | [] | Array with the name of the attributes that the request could return. By default it always returns the content of 'data', review [Axios response schema](https://axios-http.com/es/docs/res_schema ) for more information. |

---

### put()

  ```javascript
    client.put(url, data, config, configResponse)

    // Sample
    const client = AxiosApiRequest.getClient();
    const response = await client.put(
      "/product/1",
      { name: "example", id: "k39-123nb19319-asdcloj234" },
      { headers: { "Content-Type": "application/json" } },
      ["headers", "status"]
    );

    /*
      response = {
        data: { ... }, -> response that the service returns
        headers: { ... } -> headers that the service returns
        status: { ... } -> status that the service returns
      };
    */
  ```

  The traditional **'PUT'** method of http with some improvements

  **Parameters:**

  | Name | Type | required | Default | Description |
  | -----|------|----------|---------|------------ |
  | url | string | yes | N/A | Server URL that will be used for the request |
  | data | object | yes | N/A | These are the data to be sent as the body of the request. It must always be an object, if this is not required send an empty object |
  | config | AxiosRequestConfig | no | {} | Axios configuration available to make the request, headers added from the 'init' method are added to those specified here. If the **'method'** or **'url'** attribute is specified here, they will be ignored since these are configured in each of the methods to make http requests. Review [Axios config](https://axios-http.com/es/docs/req_config) for more information.. |
  | configResponse | ConfigResponseDataType | no | [] | Array with the name of the attributes that the request could return. By default it always returns the content of 'data', review [Axios response schema](https://axios-http.com/es/docs/res_schema ) for more information. |

---

### patch()

  ```javascript
    client.patch(url, data, config, configResponse)

    // Sample
    const client = AxiosApiRequest.getClient();
    const response = await client.patch(
      "/product/1",
      { name: "example", id: "k39-123nb19319-asdcloj234" },
      { headers: { "Content-Type": "application/json" } },
      ["headers", "status"]
    );

    /*
      response = {
        data: { ... }, -> response that the service returns
        headers: { ... } -> headers that the service returns
        status: { ... } -> status that the service returns
      };
    */
  ```

  The traditional **'PATCH'** method of http with some improvements

  **Parameters:**

  | Name | Type | required | Default | Description |
  | -----|------|----------|---------|------------ |
  | url | string | yes | N/A | Server URL that will be used for the request |
  | data | object | yes | N/A | These are the data to be sent as the body of the request. It must always be an object, if this is not required send an empty object |
  | config | AxiosRequestConfig | no | {} | Axios configuration available to make the request, headers added from the 'init' method are added to those specified here. If the **'method'** or **'url'** attribute is specified here, they will be ignored since these are configured in each of the methods to make http requests. Review [Axios config](https://axios-http.com/es/docs/req_config) for more information.. |
  | configResponse | ConfigResponseDataType | no | [] | Array with the name of the attributes that the request could return. By default it always returns the content of 'data', review [Axios response schema](https://axios-http.com/es/docs/res_schema ) for more information. |

---

### delete()

  ```javascript
    client.delete(url, config, configResponse)

    // Sample
    const client = AxiosApiRequest.getClient();
    const response = await client.delete(
      "/products",
      { headers: { "X-Requested-With": "XMLHttpRequest" } },
      ["headers"]
    );

    /*
      response = {
        data: { ... }, -> response that the service returns
        headers: { ... } -> headers that the service returns
      };
    */
  ```

  The traditional **'DELETE'** method of http with some improvements

  **Parameters:**

  | Name | Type | required | Default | Description |
  | -----|------|----------|---------|------------ |
  | url | string | yes | N/A | Server URL that will be used for the request |
  | config | AxiosRequestConfig | no | {} | Axios configuration available to make the request, headers added from the 'init' method are added to those specified here. If the **'method'** or **'url'** attribute is specified here, they will be ignored since these are configured in each of the methods to make http requests. Review [Axios config](https://axios-http.com/es/docs/req_config) for more information.. |
  | configResponse | ConfigResponseDataType | no | [] | Array with the name of the attributes that the request could return. By default it always returns the content of 'data', review [Axios response schema](https://axios-http.com/es/docs/res_schema ) for more information. |

&nbsp;

## Data Types

These types can be destructured from the package to be used in their interfaces.

### ConfigResponseDataType

  Array of type ConfigResponseTypes with the name of the attributes that the request could return. By default it always returns the content of 'data', review [Axios response schema](https://axios-http.com/es/docs/res_schema ) for more information.

### ConfigResponseTypes

  Name of elements that can be returned in the request response or error, review [Axios response schema](https://axios-http.com/es/docs/res_schema ) for more information.

  **Interface:**

  | Type | Values ​​you can take | Description |
  | -----|---------------------|------------ |
  | string | "status" \\| "statusText" \\| "headers" \\| "config" \\| "request" | Name of the attributes that the request could return. |

&nbsp;

## Resources

- [Changelog](https://github.com/Rod28/axios-api-request/blob/main/CHANGELOG.md)
- [Tests](https://github.com/Rod28/axios-api-request/blob/main/tests/index.spec.ts)

## License

[MIT](LICENSE)

&nbsp;
