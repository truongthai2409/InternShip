import React from "react";
import Header from "../../components/Header";
import "./styles.scss";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="main__layout">
      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayout;
