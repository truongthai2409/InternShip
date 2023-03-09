import { internshipTransport } from 'src/config/http/transport';

const getCandidateByHr = {
  getCandidate: (data) => {
    const url = `/api/r2s/candidate/job-status`;
    return internshipTransport.get(url, {
      params: {
        limit: data[0],
        no: data[1],
        skills: data[2],
        province: data[3],
      },
    });
  },
};

export default getCandidateByHr;
