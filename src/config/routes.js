import Dashboard from "../pages/Admin/Dashboard";
import User from "../pages/Admin/User";
import Company from "../pages/Admin/Company";
import University from "../pages/Admin/University";
import Demand from "../pages/Admin/Demand";
import NotFound from "../pages/NotFound";
import CompanyDetail from "../pages/Admin/CompanyDetail";
import UserDetail from "../pages/Admin/UserDetail";
import UniversityDetail from "../pages/Admin/UniversityDetail";
import Home from "../pages/Main/Home";
import CandidateList from "../pages/Main/HR/CandidateList/CandidateList";

import {
  RegisterStep1,
  RegisterStep2,
  RegisterStep3,
} from "../pages/Register/index";
import DemandDetail from "../pages/Admin/DemandDetail";
import Major from "../pages/Admin/Major";
import MajorDetail from "../pages/Admin/MajorDetail";
import DetailHome from "../pages/Main/DetailHome";
import HR from "../pages/Main/HR";
import HRPost from "../pages/Main/HR/HRPost";
import HRPostList from "../pages/Main/HR/HRPostList";
import CandidateHome from "src/pages/Main/Candidate/Home";
import CandidateViewList from "src/pages/Main/Candidate/ViewList";
import CandidateSaveProfile from "src/pages/Main/Candidate/SaveProfile";
import CandidateInformationCompany from "src/pages/Main/Candidate/InformationCompany";

export const adminRouter = [
  {
    path: "",
    Component: Dashboard,
  },
  {
    path: "user",
    Component: User,
  },
  {
    path: "university",
    Component: University,
  },
  {
    path: "/admin/university/:uniId",
    Component: UniversityDetail,
  },

  {
    path: "/admin/company/:comid",
    Component: CompanyDetail,
  },
  {
    path: "major",
    Component: Major,
  },
  {
    path: "/admin/major/:id",
    Component: MajorDetail,
  },
  {
    path: "/admin/user/:username",
    Component: UserDetail,
  },
  {
    path: "demand",
    Component: Demand,
  },
  {
    path: "demand/:demandId",
    Component: DemandDetail,
  },
  {
    path: "*",
    Component: NotFound,
  },
];

// main router
export const mainRouter = [
  {
    path: "",
    Component: Home,
  },
  {
    path: "/detail",
    Component: DetailHome,
  },
];

// hr router
export const hrRouter = [
  {
    path: "/hr",
    Component: HR,
  },
  {
    path: "/hr/post",
    Component: HRPost,
  },
  {
    path: "/hr/post/list",
    Component: HRPostList,
  },
  {
    path: "/hr/candidate/list",
    Component: CandidateList,
  },
];

// hr router
export const candidateRouter = [
  {
    path: "/candidate",
    Component: CandidateHome,
  },
  {
    path: "/candidate/view-list",
    Component: CandidateViewList,
  },
  {
    path: "/candidate/save-profile",
    Component: CandidateSaveProfile,
  },
  {
    path: "/candidate/information_company",
    Component: CandidateInformationCompany,
  },
];

// register router
export const registerRouter = [
  {
    path: "",
    Component: RegisterStep1,
  },
  {
    path: "step2/:roleId",
    Component: RegisterStep2,
  },
  {
    path: "step3",
    Component: RegisterStep3,
  },
];
