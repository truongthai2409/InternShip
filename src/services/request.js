import axios from "axios";

const request = axios.create({
  timeout: 60000,
  baseURL: process.env.REACT_APP_API,
  headers: {
    "Content-Type": "application/json-patch+json",
  },
})

const handleError = (error) => {
  const { response = {} } = error;
  const { data, status, statusText } = response;
  return { data, status, statusText };
};

request.interceptors.request.use((config) => {
  const userData = JSON.parse(sessionStorage.getItem("userPresent"));
  const token = userData.token;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

request.interceptors.response.use((response) => {
  return response;
}, handleError);

export default request;
