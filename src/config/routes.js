import Dashboard from "../pages/Admin/Dashboard";
import User from "../pages/Admin/User";
import Company from "../pages/Admin/Company";
import University from "../pages/Admin/University";
import NotFound from "../pages/NotFound";
import CompanyDetail from "../pages/Admin/CompanyDetail";
import UserDetail from "../pages/Admin/UserDetail";

import {
  RegisterStep1,
  RegisterStep2,
  RegisterStep3,
} from "../pages/Register/index";
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
    path: "company",
    Component: Company,
  },
  {
    path: "/admin/company/:comid",
    Component: CompanyDetail,
  },
  {
    path: "*",
    Component: NotFound,
  },
  {
    path: "/admin/user/:username",
    Component: UserDetail,
  },
];

// main router
export const mainRouter = [];

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
