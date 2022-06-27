import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import AdminRouterLayout from "./Layouts/Admin/index";
import RegisterLayout from "./Layouts/Register/index";
import MainPage from "./pages/Main";
import LoginLayout from './Layouts/Login/index'
import Dashboard from "./pages/Admin/Dashboard";
import { adminRouter, registerRouter } from "./config/routes";

function App() {
  const renderAdminRouter = () => {
    return adminRouter.map(({ path, Component }, index) => {
      return <Route path={path} element={<Component />} key={index} />;
    });
  };

  const renderRegisterRouter = () => {
    return registerRouter.map(({ path, Component }, index) => {
      return <Route path={path} element={<Component />} key={index} />;
    });
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/admin" element={<AdminRouterLayout />}>
            <Route index element={<Dashboard />} />
            {renderAdminRouter()}
          </Route>
          <Route path="/register" element={<RegisterLayout />}>
            {renderRegisterRouter()}
          </Route>
          <Route path="/login" element={<LoginLayout/>}></Route>
          <Route path="/" element={<MainPage />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
