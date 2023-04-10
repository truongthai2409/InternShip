import { internshipTransport } from 'src/config/http/transport';

const HrSeachAPI = {
  getDemandList: (params) => {
    const url = `/api/demand?type=${params.type}&order=${params.order}&position=${params.position}&name=${params.name}&province=${params.province}&major=${params.major}&no=${params.no}&limit=${params.limit}`;

    return internshipTransport.get(url);
  },
};

export default HrSeachAPI;
