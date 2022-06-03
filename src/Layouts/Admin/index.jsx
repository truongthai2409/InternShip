import React from "react";
import { Outlet } from "react-router-dom";
import { Grid } from "@mui/material";

import "./styles.scss";
import Sidebar from "../../components/Sidebar";
import AdminNav from "../../components/AdminNav";

const AdminLayout = () => {
  return (
    <div>
      <Grid container>
        <Grid item md={3}>
          <div className="admin-layout__logo">
            <h2>ITInternshipJob</h2>
          </div>
          <Sidebar />
        </Grid>
        <Grid item md={9}>
          <header className="admin-layout__header">
            <AdminNav />
          </header>
          <main className="admin-layout__main">
            <section>
              <Outlet />
            </section>
          </main>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminLayout;
