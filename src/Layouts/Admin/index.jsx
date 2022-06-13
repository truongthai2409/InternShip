import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Drawer, Hidden } from "@mui/material";

import "./styles.scss";
import Sidebar from "../../components/Sidebar";
import AdminNav from "../../components/AdminNav";

const AdminLayout = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  /**
   * handle Close drawer
   * setOpenDrawer(false);
   */
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  // console.log(openDrawer);

  return (
    <div className="admin-layout">
      <div className="admin-layout__sidebar">
        <Hidden mdDown>
          <Drawer
            variant="persistent"
            className="admin-layout__sidebar-block"
            open
          >
            <Sidebar />
          </Drawer>
        </Hidden>
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
          <Sidebar />
        </Drawer>
      </div>
      <div className="admin-layout__content">
        <header className="admin-layout__header">
          <AdminNav openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
        </header>
        <main className="admin-layout__main">
          <section>
            <Outlet />
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
