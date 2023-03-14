import { internshipTransport } from 'src/config/http/transport';

const job = {
  getDetailJobById: (id) => {
    const url = `/api/job/${id}`;

    return internshipTransport.get(url);
  },
};

export default job;
