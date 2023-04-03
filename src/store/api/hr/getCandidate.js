import { internshipTransport } from 'src/config/http/transport';

const getCandidateByHr = {
  getCandidate: () => {
    const url = `/api/candidate/job-status`;
    return internshipTransport.post(url);
  },
};

export default getCandidateByHr;
