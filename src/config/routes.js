import Dashboard from "../pages/Admin/Dashboard";
import User from "../pages/Admin/User";
import Company from "../pages/Admin/Company";
import University from "../pages/Admin/University";
import NotFound from "../pages/NotFound";
<<<<<<< HEAD
import CompanyDetail from "../pages/Admin/CompanyDetail";

=======
import { RegisterStep1, RegisterStep2 } from '../pages/Register/index'
>>>>>>> 709795478e58cca20432b07193ad166188045bb6
export const adminRouter = [
  {
    path: "dashboard",
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
];

// main router
export const mainRouter = [];

// register router
export const registerRouter = [
  {
    path: "",
    Component: RegisterStep1
  },
  {
    path: "step2/:roleId",
    Component: RegisterStep2
  }
];
