import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./styles.scss";
import { Outlet } from "react-router-dom";
import HeaderWithHR from "src/components/HeaderWithHR";
import HeaderWithPartner from "src/components/HeaderWithPartner";
import { TabTitle } from "src/utils/GeneralFunctions";
import CandidateLayOut from "../Candidate";

const MainLayout = () => {
  TabTitle("Trang chủ | IT Internship Jobs");
  const role = sessionStorage.getItem("userPresent")
    ? JSON.parse(sessionStorage.getItem("userPresent")).role
    : "";
    const renderLayout = () => {
      switch (role) {
        case "Role_HR" : {
          return <HeaderWithHR />
        }
        case "Role_Partner" : {
          return <HeaderWithPartner />
        }
        case "Role_Candidate" : {
          return <CandidateLayOut />
        }
        default: {
          return <Header />
        }
      }
    }
  return (
    <div className="main__layout">
        {renderLayout()}
      <div className="main__layout-body-outlet">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
