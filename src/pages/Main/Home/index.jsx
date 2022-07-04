import { Grid } from "@mui/material";
import SearchResultHome from "../../../components/SearchResultHome";
import DetailCard from "../../../components/DetailCard";
import SideBarHomeList from "../../../components/SideBarHomeList";
import FilterPanelHome from "../../../components/FilterPanelHome";
import "./styles.scss";
const Home = () => {
  return (
    <Grid className="wrapper" container>
      <Grid item lg={2} md={2} sm={2} xs={12}>
        <SideBarHomeList />
      </Grid>
      <Grid item lg={4} md={10} sm={10} xs={12}>
        <div className="onDesktop">
          <SearchResultHome />
        </div>

        <FilterPanelHome />
      </Grid>
      <Grid item lg={6} className="onTablet">
        <div className="containerDetailCard">
          <SearchResultHome />
          <DetailCard
            logo="https://r2s.edu.vn/wp-content/uploads/2021/05/r2s.com_.vn_-316x190.png"
            star={4.5}
            nameMajor="React-Js"
            nameCompany="R2S"
            detailJob="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque inventore pariatur tenetur fugiat laboriosam voluptas, ea accusamus facilis ut, sunt optio! Expedita beatae voluptates assumenda fugiat nam rerum autem deleniti?"
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
  );
};

export default Home;
