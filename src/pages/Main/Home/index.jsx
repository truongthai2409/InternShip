import { Grid } from "@mui/material";
import SearchResultHome from "../../../components/SearchResultHome";
import DetailCard from "../../../components/DetailCard";
import SideBarHomeList from "../../../components/SideBarHomeList";
import FilterPanelHome from "../../../components/FilterPanelHome";
import "./styles.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobByName } from "../../../store/slices/main/home/job/jobSlice";

const Home = (props) => {
  const [valueSearch, setValueSearch] = useState("");
  const dispatch = useDispatch();

  // get global state from redux store
  const { jobListName, jobList, jobDetail, indexCardActive } = useSelector(
    (state) => state.job
  );
  useEffect(() => {
    dispatch(getJobByName(""));
  }, [dispatch]);

  const handleSearch = (value) => {
    setValueSearch(value);
    if (value) {
      dispatch(getJobByName(value));
    }
    if (value === "") {
      dispatch(getJobByName(""));
    }
  };

  return (
    <Grid className="wrapper" container>
      <Grid item lg={2} md={2} sm={2} xs={12}>
        <SideBarHomeList />
      </Grid>
      <Grid item lg={4} md={10} sm={10} xs={12}>
        <div className="onDesktop">
          <SearchResultHome onClick={handleSearch} />
        </div>

        <FilterPanelHome
          jobList={jobListName}
          indexCardActive={indexCardActive}
        />
      </Grid>
      <Grid item lg={6} className="onTablet">
        <div className="containerDetailCard containerDetailCard-none">
          <div className="none__res">
            <SearchResultHome onClick={handleSearch} />
          </div>
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
            jobDetail={jobDetail}
            jobListName={jobListName}
            candidate={props.candidate}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default Home;
