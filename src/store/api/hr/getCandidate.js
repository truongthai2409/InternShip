import { internshipTransport } from 'src/config/http/transport';

const getCandidateByHr = {
  getCandidate: (no, limit, skills, province) => {
    const url = `/api/r2s/candidates/job-status`;

    return internshipTransport.get(url, {
      params: { no, limit, province, skills },
    });
  },
};

export default getCandidateByHr;
