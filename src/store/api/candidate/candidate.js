import { internshipTransport } from 'src/config/http/transport';

const candidate = {
  applyJob: (data) => {
    const url = `/api/candidate-application/`;

    return internshipTransport.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  jobStatus: (data) => {
    const url = `/api/r2s/job-status/`;

    return internshipTransport.put(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default candidate;
