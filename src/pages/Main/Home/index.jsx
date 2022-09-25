import { Grid, Hidden } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMajorList } from "src/store/slices/Admin/major/majorSlice";
import { typeFilterChange, majorFilterChange, positionFilterChange, jobFilters, provinceFilterChange, nameFilterChange, noFilterChange } from "src/store/slices/main/home/filter/filterSlices";
import { getAllRating } from "src/store/slices/main/home/rating/rating";
import DetailCard from "../../../components/DetailCard";
import ListCardJobHome from "../../../components/ListCardJobHome";
import SearchResultHome from "../../../components/SearchResultHome";
import SideBarHomeList from "../../../components/SideBarHomeList";
import {
  getJobPositionList,
} from "../../../store/slices/main/home/job/jobSlice";
import "./styles.scss";

const Home = (props) => {
  const { 
    type,
    order,
    position,
    name,
    province,
    major,
    no,
    limit,
    index,
    jobFilter,
    jobPage } = useSelector(state => state.filter)
    console.log(jobFilter)
    console.log(jobPage)
  const dispatch = useDispatch();
  const { allRating } = useSelector((state) => state.rating);
  const { jobPosition } = useSelector((state) => state.job);
  const listPositionWorkingFormat = jobPosition.map((item) => { return item.name })
  
  const [jobs, setJob] = useState([])
  const [jobDetail, setJobDetail] = useState([])
  const listWorkingFormat = [
    { name: "Fulltime", id: 1 },
    { name: "Parttime", id: 2 },
    { name: "Remote", id: 3 },
  ];

  useEffect(() => {
    dispatch(getMajorList([1, 20]));
    dispatch(getJobPositionList());
    dispatch(getAllRating([0, 5]));
  }, [dispatch]);
  useEffect(() => {
    const dataFilter = {
      type: type +"",
      order: order,
      position: position +"",
      name: name,
      province: province,
      major: major + "",
      no: no,
      limit: limit,
    };
    dispatch(jobFilters(dataFilter))
  }, [type, order, position, name, province, major, no, limit , dispatch]);
  useEffect(()=>{
    setJob(jobFilter)
    setJobDetail(jobFilter[0])
  },[jobFilter, dispatch])
  const handleSearch = (value) => {
    dispatch(nameFilterChange(value))
    const dataFilter = {
      type: type + "",
      order: order,
      position: position + "",
      name: name,
      province: province,
      major: major + "",
      no: no,
      limit: limit,
    };
      dispatch(jobFilters(dataFilter))
      dispatch(noFilterChange(0))
  };

  const getValueLocationAndHandle = (value) => {
    dispatch(provinceFilterChange(value))
    dispatch(noFilterChange(0))
  };
  const handleCheck = (value) => {
    let tempType = [];
    let tempPosition = [];
    let tempMajor = [];
    if (value.length > 0) {
      tempType = value.filter(sp => listWorkingFormat.map((items) => { return items.name }).includes(sp))
      tempPosition = value.filter(items => listPositionWorkingFormat.map((item) => { return item }).includes(items))
      tempMajor = value.filter(items => (!listPositionWorkingFormat.map((item) => { return item }).includes(items) && (!listWorkingFormat.map((item) => { return item.name }).includes(items))))
      dispatch(typeFilterChange(tempType))
      dispatch(positionFilterChange(tempPosition))
      dispatch(majorFilterChange(tempMajor))
      dispatch(noFilterChange(0))
    }
  };

  const getValuePageAndHandle = (value) => {
    dispatch(noFilterChange(value -1))
    window.scroll(0, 0);
  };

  return (
    <>
      <Grid
        className="wrapper"
        spacing={{ xs: 1, height: "700px" }}
        xs={12}
        sx={{ padding: "18px" }}
        container
      >
        <Grid item xs={2.5}>
          <Hidden mdDown>
            <SideBarHomeList
              onChange={handleCheck}
              slideBarHome__wrapper={true}
            />
          </Hidden>
        </Grid>
        <Grid xs={9.5} item>
          <Grid container spacing={{ xs: 1 }}>
            <Grid item xs={12}>
              <div className="none__res">
                <SearchResultHome
                  onClick={handleSearch}
                  onChange={getValueLocationAndHandle}
                />
              </div>
            </Grid>

            <Grid item xs={5} md={5}>
              <ListCardJobHome
                jobList={jobs}
                indexCardActive={index}
                jobListHavePages={jobPage}
                onChange={getValuePageAndHandle}
                allRating={allRating}
              />
            </Grid>
            <Grid item xs={7} md={7}>
              <div className="containerDetailCard containerDetailCard-none">
                <DetailCard
                  logo="https://r2s.edu.vn/wp-content/uploads/2021/05/r2s.com_.vn_-316x190.png"
                  jobDetail={jobDetail}
                  jobList={jobs}
                  candidate={props.candidate}
                  jobListCompany={jobs}
                />
              </div>
            </Grid>

          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={{ xs: 1 }}></Grid>
    </>
  );
};

export default Home;