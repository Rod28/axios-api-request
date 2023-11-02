/**
 * @jest-environment jsdom
 */

import AxiosApiRequest from "../src";

const baseURL = "http://localhost";

describe("All tests LocalStorage", () => {
  beforeAll(() => {
    AxiosApiRequest.init({
      baseURL,
      headers: {
        Connection: "Keep-Alive",
        "Content-Type": "text/html"
      }
    });
  });

  it("We verify that the instance has been created successfully", () => {
    const client = AxiosApiRequest.getClient();
    expect(client.defaultConfig.baseURL).toEqual(baseURL);
  });

  it("We try the GET method", async () => {
    const client = AxiosApiRequest.getClient();
    const response: any = await client.get("/something");
    expect(client.defaultConfig.baseURL).toEqual(baseURL);
    expect(response.products.length).toEqual(1);
  });

  it("We try the POST method", async () => {
    const client = AxiosApiRequest.getClient();
    const response: any = await client.post(
      "/something",
      { user: "123" },
      { headers: { "Content-Type": "application/json" } }
    );
    expect(client.defaultConfig.baseURL).toEqual(baseURL);
    expect(response.products.length).toEqual(1);
  });

  it("We try the PUT method", async () => {
    const client = AxiosApiRequest.getClient();
    const response: any = await client.put("/something", {});
    expect(client.defaultConfig.baseURL).toEqual(baseURL);
    expect(response.products.length).toEqual(1);
  });

  it("We try the PATCH method", async () => {
    const client = AxiosApiRequest.getClient();
    const response: any = await client.patch("/something", {});
    expect(client.defaultConfig.baseURL).toEqual(baseURL);
    expect(response.products.length).toEqual(1);
  });

  it("We try the DELETE method", async () => {
    const client = AxiosApiRequest.getClient();
    const response: any = await client.delete("/other", {});
    expect(client.defaultConfig.baseURL).toEqual(baseURL);
    expect(response.products.length).toEqual(0);
  });

  it("We return data and headers from the request response", async () => {
    const client = AxiosApiRequest.getClient();
    const response: any = await client.get(
      "/something2",
      { headers: { "X-Custom-Header": "foobar" } },
      ["headers"]
    );
    expect(client.defaultConfig.baseURL).toEqual(baseURL);
    expect(response.data.products.length).toEqual(2);
    expect(Object.keys(response.headers).length).not.toEqual(0);
  });

  it("We return new axios instance", async () => {
    const instance = AxiosApiRequest.getNewAxiosInstance({
      baseURL: "http://localhost/api-fake"
    });
    expect(instance.defaults.baseURL).not.toEqual(baseURL);
  });

  it("We return data error", async () => {
    try {
      const client = AxiosApiRequest.getClient();
      await client.post("/something3", {}, {});
    } catch (error) {
      expect(error).toEqual("Error");
    }
  });
});
