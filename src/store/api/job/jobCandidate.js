import { internshipTransport } from 'src/config/http/transport';

const jobCandidate = {
  getJobCareByCandidate: (username) => {
    const url = `/api/candidate-job-care/user/${username}?no=0&limit=200`;

    return internshipTransport.get(url);
  },

  getJobAppliedByCandidate: (id) => {
    const url = `/api/candidate-application/candidate/${id}?no=0&limit=200`;

    return internshipTransport.get(url);
  },
};

export default jobCandidate;
