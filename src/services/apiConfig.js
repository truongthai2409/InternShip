import axios from "axios";

const api = axios.create({
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

api.interceptors.response.use((config) => {
  const userData = JSON.parse(sessionStorage.getItem("userPresent"));
  const token = userData.token;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use((response) => {
  return response;
}, handleError);

export default api;
