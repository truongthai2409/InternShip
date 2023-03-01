import axios from 'axios';
import history from '../routes/history';

// get token
const token = JSON.parse(sessionStorage.getItem('userPresent'))
  ? JSON.parse(sessionStorage.getItem('userPresent')).token
  : '';

const httpHandler = (baseURL) => {
  const axiosHttp = axios.create({
    baseURL,
  });

  axiosHttp.interceptors.request.use(
    async function intercept(config) {
      const interceptedConfig = config;
      interceptedConfig.headers['Authorization'] = 'Bearer ' + token;
      return interceptedConfig;
    },
    function interceptError(error) {
      return Promise.reject(error);
    }
  );

  axiosHttp.interceptors.response.use(
    function intercept(response) {
      return response.data;
    },
    function interceptError(error) {
      // const originalRequest = error.config;

      switch (error.response.status) {
        case 403:
          history.push('/403');
          return Promise.reject(error);
        case 401:
          history.push('/');
          return Promise.reject(error);
        default:
          return Promise.reject(error);
      }
    }
  );

  return axiosHttp;
};

export default httpHandler;
