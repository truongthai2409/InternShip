import { internshipTransport } from 'src/config/http/transport';

const jobCandidate = {
  getJobCareByCandidate: (id) => {
    const url = `/api/job-care/candidate/${id}?no=0&limit=200`;

    return internshipTransport.get(url);
  },
};

export default jobCandidate;
