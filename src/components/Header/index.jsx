import {
  Box,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import DehazeIcon from "@mui/icons-material/Dehaze";
import React, { useState } from "react";
import { Link } from "react-router-dom";
// import PropTypes from 'prop-types'
import Button from "../Button";
import Logo from "../Logo";
import "./styles.scss";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SideBarHomeList from "../SideBarHomeList";

function Header(props) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <div className="container onMobile config">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Hidden mdUp>
          <Tooltip title="Show sidebar" onClick={handleOpenDrawer}>
            <DehazeIcon />
          </Tooltip>
        </Hidden>
        <Logo />
      </Box>

      <Drawer
        variant="temporary"
        anchor="left"
        open={openDrawer}
        onClose={handleCloseDrawer}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        className="admin-layout__sidebar-hide"
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            height: "82px",
            padding: 0,
          }}
        >
          <IconButton onClick={handleCloseDrawer}>
            <ChevronLeftIcon
              sx={{
                width: "30px",
                height: "30px",
                color: "#04bf8a",
              }}
            />
          </IconButton>
        </Toolbar>

        <Divider />

        <Toolbar
          sx={{
            my: 2,
          }}
        >
          <SideBarHomeList />
        </Toolbar>
      </Drawer>

      <div className="login__home">
        <Link to="/login">
          <span className="login__home-sign-in">Đăng nhập</span>
        </Link>
        <Link to="/register">
          <Button
            bwidth="117px"
            bheight="45px"
            name="Đăng ký"
            className="login__home-register"
          />
        </Link>
      </div>
    </div>
  );
}

Header.propTypes = {};

export default Header;
