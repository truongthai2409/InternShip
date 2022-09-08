import RegisterLayout from "src/Layouts/Register";
import { RegisterStep1 } from "src/pages/Register";
import CandidateInfo from "src/pages/Register/RegisterStep3/CandidateInfo";
import HRInfo from "src/pages/Register/RegisterStep3/HRInfo";
import PartnerInfo from "src/pages/Register/RegisterStep3/PartnerInfo";

const registerRouter = [
    {
        path: "/register",
        element: <RegisterLayout />,
        index : <RegisterStep1 />,
        children: [
            {
                path: "candidate",
                Component: CandidateInfo,
            },
            {
                path: "hr",
                Component: HRInfo,
            },
            {
                path: "partner",
                Component: PartnerInfo,
            },
        ]
    }
]
export default registerRouter