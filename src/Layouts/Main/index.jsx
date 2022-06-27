import React from "react";
import Button from "../../components/Button";
import {  Grid } from "@mui/material";
import Header from "../../components/Header/Header";

const MainLayout = () => {
  return <div>
    <Header/>
    <Grid container>
      <Grid item md={2}>
          <div></div>
      </Grid>
      <Grid item md={4}>
          <div></div>
      </Grid>
      <Grid item md={6}>
          <div></div>
      </Grid>
    </Grid>
  </div>;
};

export default MainLayout;
