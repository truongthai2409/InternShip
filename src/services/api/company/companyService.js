import api from "src/services/apiConfig";

export const getCompanyDetailAPI = (compId) => {
    return api.get(`/api/job/company/${compId}`);
};

