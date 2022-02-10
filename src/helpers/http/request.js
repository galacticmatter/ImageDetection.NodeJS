const axios = require("axios");

// Helper object for Axios requests
const request = function (method, url, data, headers) {

  if (
    method === '' ||
    method === undefined ||
    url === '' ||
    url === undefined
  ) {
    return false;
  }

  const config = {
    method: method,
    url: url,
    data: {},
    headers: {}
  }

  if (data) {
    config.data = data;
  }

  if (headers) {
    config.headers = headers;
  }

  return new Promise((resolve, reject) => {
    axios(config)
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => {
      reject(error)
    })
  })
}

module.exports = request;
