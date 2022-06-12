import React from "react";
import { Outlet } from "react-router-dom";
import { Grid } from "@mui/material";

import "./styles.scss";
import Sidebar from "../../components/Sidebar";
import AdminNav from "../../components/AdminNav";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <div className="admin-layout__sidebar">
        <Sidebar />
      </div>
      <div className="admin-layout__content">
        <header className="admin-layout__header">
          <AdminNav />
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
