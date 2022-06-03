import React from "react";
import { Avatar, Tooltip } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import "./styles.scss";

const AdminNav = () => {
  return (
    <>
      <div className="admin-navbar">
        <Avatar
          src="https://berrydashboard.io/free/static/media/user-round.13b5a31b.svg"
          alt="admin-avatar"
          className="admin-navbar__avatar"
        />
        <Tooltip title="Cài đặt">
          <SettingsOutlinedIcon className="admin-navbar__icon" />
        </Tooltip>
      </div>
    </>
  );
};

export default AdminNav;
