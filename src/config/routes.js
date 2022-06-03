import Dashboard from "../pages/Admin/Dashboard";
import User from "../pages/Admin/User";
import Company from "../pages/Admin/Company";
import University from "../pages/Admin/University";
import NotFound from "../pages/NotFound";

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
    path: "*",
    Component: NotFound,
  },
];

// main router
export const mainRouter = [];
