import React from "react";
import { Grid } from "@mui/material";
import Header from "../../components/Header/Header";
import SearchResultHome from "../../components/SearchResultHome/";
import "./styles.scss";
import DetailCard from "../../components/DetailCard";
import SideBarHomeList from "../../components/SideBarHomeList";
import FilterPanelHome from "../../components/FilterPanelHome";
const MainLayout = () => {
  return (
    <div className="main__layout">
      <Header />
      <Grid container>
        <Grid item md={2}>
          <SideBarHomeList />
        </Grid>
        <Grid item md={4}>
          <FilterPanelHome />
        </Grid>
        <Grid item md={6}>
          <div>
            <SearchResultHome />
            <DetailCard
              star={4.5}
              nameMajor="React-Js"
              nameCompany="R2S"
              detailJob={
                "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque inventore pariatur tenetur fugiat laboriosam voluptas, ea accusamus facilis ut, sunt optio! Expedita beatae voluptates assumenda fugiat nam rerum autem deleniti?"
              }
              requireJob={
                "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque inventore pariatur tenetur fugiat laboriosam voluptas, ea accusamus facilis ut, sunt optio! Expedita beatae voluptates assumenda fugiat nam rerum autem deleniti?"
              }
              timeJob={"10/6/2022-10/8/2022"}
              salary={"5.000.000"}
              location={"TPHCM"}
              rating={"5.0 trong 48 lượt đánh giá"}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainLayout;
