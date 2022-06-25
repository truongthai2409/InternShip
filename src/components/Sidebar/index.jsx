import React, { useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import { Hidden } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./styles.scss";
import CustomLink from "../CustomLink";

const sidebarLink = [
  {
    id: 1,
    to: "",
    name: "Dashboard",
    icon: AppsOutlinedIcon,
  },
  {
    id: 2,
    to: "user",
    name: "Quản lý tài khoản",
    icon: AccountCircleOutlinedIcon,
  },
  {
    id: 3,
    to: "university",
    name: "Quản lý trường",
    icon: SchoolOutlinedIcon,
  },
  {
    id: 4,
    to: "company",
    name: "Quản lý công ty",
    icon: BusinessOutlinedIcon,
  },
  {
    id: 7,
    to: "statistical",
    name: "Thống kê",
    icon: AnalyticsOutlinedIcon,
  },
  
];

const Sidebar = () => {
  // render sidebar link
  const renderSideberLink = () => {
    return sidebarLink.map((item) => {
      return (
        <CustomLink to={item.to} key={item.id}>
          <div className="sidebar__link">
            <item.icon className="sidebar__icon" />
            <p>{item.name}</p>
          </div>
        </CustomLink>
      );
    });
  };

  return (
    <div className="sidebar">
      <Hidden mdUp>
        <div className="sidebar-logo">
          <h2>ITInternshipJob</h2>
        </div>
      </Hidden>
      <ul>{renderSideberLink()}</ul>
    </div>
  );
};

export default Sidebar;
