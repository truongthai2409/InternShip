import { internshipTransport } from 'src/config/http/transport';
const companyManagementAPI = {
  getJobByCompany: (id) => {
    const url = `/api/job/company/${id}`;

    return internshipTransport.get(url);
  },

  getMajorListAPI: (args) => {
    const url = `/api/admin/major?no=${args[0] - 1}&limit=${args[1]}`;

    return internshipTransport.get(url);
  },
  getMajorDetailAPI: (uniId) => {
    const url = `/api/${uniId}`;

    return internshipTransport.get(url);
  },

  getDetailCompanyByid: (id) => {
    const url = `/api/company/${id}`;
    return internshipTransport.get(url);
  },
};

export default companyManagementAPI;
