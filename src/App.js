import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import AdminRouterLayout from "./Layouts/Admin/index";
import MainLayout from "./Layouts/Main";
import { adminRouter } from "./config/routes";

function App() {
  const renderAdminRouter = () => {
    return adminRouter.map(({ path, Component }, index) => {
      return <Route path={path} element={<Component />} key={index} />;
    });
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/admin" element={<AdminRouterLayout />}>
            {renderAdminRouter()}
          </Route>
          <Route path="/" element={<MainLayout />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
