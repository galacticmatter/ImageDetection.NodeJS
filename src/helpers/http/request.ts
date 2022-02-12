import axios, { AxiosRequestConfig, Method } from 'axios';

// Helper object for Axios requests
const request = (method: string, url: string, data?: any, headers?: any): Promise<any> | boolean => {

  if (
    method === '' ||
    method === undefined ||
    url === '' ||
    url === undefined
  ) {
    return false;
  }

  const config: AxiosRequestConfig = {
    method: method as Method,
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

export default request;
