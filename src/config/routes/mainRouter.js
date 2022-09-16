import MainLayout from "src/Layouts/Main";
import ForgotPassword from "src/pages/ForgotPassword";
import CandidateInformationCompany from "src/pages/Main/Candidate/InformationCompany";
import Home from "src/pages/Main/Home";
import NotFound from "src/pages/NotFound";
import DetailHome from "../../pages/Main/DetailHome";

const mainRouter = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                Component: Home,
            },
            {
                path: "/candidate/detail_job/:keyword",
                Component: DetailHome,
            },
            {
                path: "/candidate/information_company/:keyword",
                Component: CandidateInformationCompany,
            }
        ],
    },
    {
        path: "/not-found",
        element: <NotFound />

    },
    {
        path: "/forgot-password",
        element: <ForgotPassword />

    },
    {
        //Doesn't match route?, It's here. If you want to change just delete children and change element
        path: "*",
        element: <MainLayout />,
        children: [
            {
                path: "*",
                Component: Home
            }
        ]
    }
]
export default mainRouter