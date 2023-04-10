import axios from 'axios';
import history from '../routes/history';

const httpHandler = (baseURL) => {
  const axiosHttp = axios.create({
    baseURL,
  });

  axiosHttp.interceptors.request.use(
    async function intercept(config) {
      const token =
        JSON.parse(sessionStorage.getItem('userPresent'))?.token ||
        JSON.parse(localStorage.getItem('userPresent'))?.token;
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
          // history.push('/403');
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
