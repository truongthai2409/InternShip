import { internshipTransport } from "src/config/http/transport";

const companyManagementAPI = {
    getJobByCompany: (id)=>{
        const url = `/api/job/company/${id}`

        return internshipTransport.get(url)
    }
}

export default companyManagementAPI;