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
  jobStatus: (candidateId, status) => {
    const url = `/api/candidate/job-status/${candidateId}?status=${status}`;

    return internshipTransport.put(url);
  },
};

export default candidate;
