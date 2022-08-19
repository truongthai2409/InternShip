import { Grid } from "@mui/material";
import SearchResultHome from "../../../components/SearchResultHome";
import DetailCard from "../../../components/DetailCard";
import SideBarHomeList from "../../../components/SideBarHomeList";
import FilterPanelHome from "../../../components/FilterPanelHome";
import "./styles.scss";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getJobByCompany,
  getJobByNameAndLocation,
  getJobFilterByUser,
} from "../../../store/slices/main/home/job/jobSlice";
import { getMarkByUser } from "src/store/slices/main/mark/markSlice";

const Home = (props) => {
  const dispatch = useDispatch();

  const [locationValue, setLocationValue] = useState("");
  const [positionValue, setPositionValue] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  // let [filters, setFilters] = useState();
  const { profile } = useSelector((state) => state.authentication);
  // get global state from redux store
  let {
    jobListName,
    jobDetail,
    indexCardActive,
    jobListHavePages,
    jobFilter,
    jobListCompany,
  } = useSelector((state) => state.job);

  const [jobs, setJobs] = useState(jobFilter);
  const [type, setType] = useState([]);
  const [position, setPosition] = useState([]);
  const [major, setMajor] = useState([]);
  const idCompany = jobDetail?.hr?.company?.id;
  const listPositionWorkingFormat = [
    "Backend",
    "Business Analysis",
    "Frontend",
    "Project Management",
  ];
  const updateJob = useCallback(() => {
    let temp = jobFilter;
    if (type.length > 0) {
      temp = temp.filter((e) => type.includes(e?.jobType?.name));
    }

    if (position.length > 0) {
      temp = temp.filter((e) => position.includes(e?.jobposition?.name));
    }
    if (major.length > 0) {
      temp = temp.filter((e) => major?.includes(e?.major?.name));
    }
    setJobs(temp);
  }, [type, position, major, jobFilter]);

  useEffect(() => {
    updateJob();
  }, [updateJob]);
  // const clearFilter = () => setFilter(initFilter);

  useEffect(() => {
    const dataSearch = {
      name: "",
      province: "",
      no: currentPage,
      limit: 10,
    };
    dispatch(getJobByNameAndLocation(dataSearch));
    // dispatch(getJobList([1, 10]));
  }, [dispatch]);

  const dataGetMarkByUser = {
    userName: profile.username,
    page: {
      no: 0,
      limit: 10,
    },
  };
  useEffect(() => {
    if (profile.role === "Role_Candidate") {
      dispatch(getMarkByUser(dataGetMarkByUser));
    }
  }, [idCompany, dispatch]);

  useEffect(() => {
    const dataFilter = {
      type: "",
      order: "oldest",
      position: "",
      name: "",
      province: "",
      major: "",
      no: currentPage,
      limit: 5,
    };
    dispatch(getJobFilterByUser(dataFilter));
    dispatch(getJobByCompany(idCompany));
  }, [idCompany, currentPage]);

  const handleSearch = (value) => {
    const dataFilter = {
      type: "",
      order: "oldest",
      position: "",
      name: value || "",
      province: locationValue || "",
      major: "",
      no: 0,
      limit: 5,
    };
    dispatch(getJobFilterByUser(dataFilter));
  };

  const getValueLocationAndHandle = (value) => {
    setLocationValue(value);
  };

  const handleCheck = (value) => {
    let tempType = [];
    let tempPosition = [];
    let tempMajor = [];

    if (value.length > 0) {
      tempType = value.filter(
        (el) => el === "Fulltime" || el === "Parttime" || el === "Remote"
      );
    }
    setType(tempType);

    if (value.length > 0) {
      tempPosition = value.filter(
        (el) =>
          el === listPositionWorkingFormat[0] ||
          el === listPositionWorkingFormat[1] ||
          el === listPositionWorkingFormat[2] ||
          el === listPositionWorkingFormat[3]
      );
    }
    setPosition(tempPosition);

    if (value.length > 0) {
      tempMajor = value.filter(
        (el) =>
          el !== "Fulltime" &&
          el !== "Parttime" &&
          el !== "Remote" &&
          el !== listPositionWorkingFormat[0] &&
          el !== listPositionWorkingFormat[1] &&
          el !== listPositionWorkingFormat[2] &&
          el !== listPositionWorkingFormat[3]
      );
    }
    setMajor(tempMajor);
  };

  const getValuePageAndHandle = (value) => {
    setCurrentPage(value);
    window.scroll(0, 0);
  };
  return (
    <>
      {jobDetail && (
        <Grid
          className="wrapper"
          spacing={{ xs: 1 }}
          sx={{ padding: "18px" }}
          container
        >
          <Grid item lg={2} md={3} sm={4} xs={12}>
            <SideBarHomeList onChange={handleCheck} />
          </Grid>
          <Grid item lg={4} md={8} sm={8} xs={12}>
            <div className="onDesktop">
              <SearchResultHome
                onClick={handleSearch}
                onChange={getValueLocationAndHandle}
              />
            </div>

            <FilterPanelHome
              jobList={jobs}
              indexCardActive={indexCardActive}
              positionValue={positionValue}
              jobListHavePages={jobListHavePages}
              onChange={getValuePageAndHandle}
            />
          </Grid>
          <Grid item lg={6} className="onTablet">
            <div className="containerDetailCard containerDetailCard-none">
              <div className="none__res">
                <SearchResultHome
                  onClick={handleSearch}
                  onChange={getValueLocationAndHandle}
                />
              </div>
              <DetailCard
                logo="https://r2s.edu.vn/wp-content/uploads/2021/05/r2s.com_.vn_-316x190.png"
                jobDetail={jobDetail}
                jobListName={jobListName}
                candidate={props.candidate}
                jobListCompany={jobListCompany}
              />
            </div>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Home;
