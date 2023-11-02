module.exports = {
  get: jest.fn(() => {
    return Promise.resolve({
      data: "data"
    });
  }),
  post: jest.fn(() => {
    return Promise.resolve({
      data: "data"
    });
  }),
  put: jest.fn(() => {
    return Promise.resolve({
      data: "data"
    });
  }),
  patch: jest.fn(() => {
    return Promise.resolve({
      data: "data"
    });
  }),
  delete: jest.fn(() => {
    return Promise.resolve({
      data: "data"
    });
  }),
  create: jest.fn(function () {
    return {
      interceptors: {
        request: {
          use: jest.fn(() => Promise.resolve({ data: {} }))
        }
      },
      defaults: {
        headers: {
          common: {
            "Content-Type": "",
            Authorization: ""
          }
        }
      },
      get: jest.fn(() => Promise.resolve({ data: {} })),
      post: jest.fn(() => Promise.resolve({ data: {} })),
      put: jest.fn(() => Promise.resolve({ data: {} })),
      patch: jest.fn(() => Promise.resolve({ data: {} })),
      delete: jest.fn(() => Promise.resolve({ data: {} })),
      request: jest.fn((config) => {
        if (config.url === "/something") {
          return Promise.resolve({
            data: { products: [{ id: "1", name: "example" }] }
          });
        }

        if (config.url === "/something2") {
          return Promise.resolve({
            data: {
              products: [
                { id: "1", name: "example" },
                { id: "2", name: "example-2" }
              ]
            },
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "X-Custom-Header": "foobar"
            },
            config: {}
          });
        }

        if (config.url === "/something3") {
          return Promise.reject({
            response: {
              data: "Error",
              status: 200,
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              config: {}
            }
          });
        }

        return Promise.resolve({ data: { products: [] } });
      })
    };
  })
};
