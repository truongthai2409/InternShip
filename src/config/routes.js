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

import { RegisterStep1, RegisterStep2, RegisterStep3 } from "../pages/Register/index";
import DemandDetail from "../pages/Admin/DemandDetail";
import Major from "../pages/Admin/Major";
import MajorDetail from "../pages/Admin/MajorDetail";
import Location from "../pages/Admin/Location";

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
        path: "company",
        Component: Company,
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
    Component: Home
  }
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
