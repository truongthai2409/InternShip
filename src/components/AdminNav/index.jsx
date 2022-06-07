import React from "react";
import { Avatar, Tooltip, IconButton, Badge } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ViewQuiltOutlinedIcon from "@mui/icons-material/ViewQuiltOutlined";

import "./styles.scss";

const AdminNav = () => {
  return (
    <>
      <div className="admin-navbar">
        <div className="admin-navbar_show">
          <Tooltip title="Show sidebar">
            <ViewQuiltOutlinedIcon />
          </Tooltip>
        </div>

        <div className="admin-navbar__control">
          <Tooltip title="Thông báo">
            <IconButton className="admin-navbar__icon-notification">
              <Badge badgeContent={4} color="error">
                <NotificationsNoneIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <div className="admin-navbar__setting">
            <Tooltip title="Tài khoản">
              <Avatar
                src="https://berrydashboard.io/free/static/media/user-round.13b5a31b.svg"
                alt="admin-avatar"
                className="admin-navbar__avatar"
              />
            </Tooltip>

            <Tooltip title="Cài đặt">
              <SettingsOutlinedIcon className="admin-navbar__icon" />
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminNav;
