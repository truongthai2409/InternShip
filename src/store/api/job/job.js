import { internshipTransport } from 'src/config/http/transport';

const job = {
  getDetailJobById: (id) => {
    const url = `/api/job/${id}`;

    return internshipTransport.get(url);
  },

  getRelatedJobByCompanyId: (companyId) => {
    const url = `/api/job/company/${companyId}`;

    return internshipTransport.get(url);
  },
};

export default job;
