import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./styles.scss";
import { Outlet } from "react-router-dom";
import HeaderWithHR from "src/components/HeaderWithHR";
import HeaderWithPartner from "src/components/HeaderWithPartner";
import { TabTitle } from "src/utils/GeneralFunctions";

const MainLayout = () => {
  TabTitle("Trang chủ | IT Internship Jobs")
  const role = localStorage.getItem("userPresent") ? JSON.parse(localStorage.getItem("userPresent")).role : '';
  console.log(role);
  return (
    <div className="main__layout">
      {role === "Role_HR" ? (
        <HeaderWithHR />
      ) : role === "Role_Partner" ? (
        <HeaderWithPartner />
      ) : (
        <Header />
      )}
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
