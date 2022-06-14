import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8085",
    // baseURL: "https://6287218e7864d2883e7efbd1.mockapi.io/",
});

api.interceptors.request.use(async (config) => config);

api.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }

        return response;
    },
    (error) => {
        throw error;
    }
);

export default api