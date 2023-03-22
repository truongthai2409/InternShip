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
    const url = `/api/candidate/job-status/`;

    return internshipTransport.put(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default candidate;
