
import request from './../../request';

export const getCompanyDetailAPI = (compId) => {
    return request.get(`/api/job/company/${compId}`);
};

