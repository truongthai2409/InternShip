import { internshipTransport } from 'src/config/http/transport';

const getCandidateByHr = {
  getCandidate: (data) => {
    const url = `/api/candidate/job-status?no=${data[0]}&limit=${data[1]}`;
    return internshipTransport.post(url, {
      desiredJob: data[2],
      jobTypeIds: [...data[3]],
      jobPositionIds: [...data[4]],
      majorIds: [...data[5]],
      workProvinceId: data[6],
    });
  },
};

export default getCandidateByHr;
