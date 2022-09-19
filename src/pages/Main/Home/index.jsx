import { Grid, Hidden } from "@mui/material";
import SearchResultHome from "../../../components/SearchResultHome";
import DetailCard from "../../../components/DetailCard";
import SideBarHomeList from "../../../components/SideBarHomeList";
import FilterPanelHome from "../../../components/FilterPanelHome";
import "./styles.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getJobByCompany,
  getJobFilterByUser,
} from "../../../store/slices/main/home/job/jobSlice";
import { getMarkByUser } from "src/store/slices/main/mark/markSlice";
import PaginationCustom from "src/components/Pagination";

const limit = 5;
const Home = (props) => {
  const dispatch = useDispatch();
  const [locationValue, setLocationValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { profile } = useSelector((state) => state.authentication);

  // get global state from redux store
  let {
    jobDetail,
    indexCardActive,
    jobListHavePages,
    jobFilter,
    jobListCompany,
  } = useSelector((state) => state.job);

  const [jobs, setJobs] = useState(jobFilter);
  console.log(jobFilter)
  const [type, setType] = useState([]);
  const [position, setPosition] = useState([]);
  const [major, setMajor] = useState([]);
  const idCompany = Number(jobDetail?.hr?.company?.id);
  const listPositionWorkingFormat = [
    "Backend Developer",
    "Business Analyst",
    "Data Engineer",
    "Data Scientist",
    "DevOps",
    "Frontend Developer",
    "Tester",
  ];

  useEffect(() => {
    const updateJob = () => {
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
    }
    updateJob()
  }, [type, position, major, jobFilter])
  const [jobDetails, setJobDetails] = useState(jobs[0])

  useEffect(() => {
    const dataFilter = {
      type: "",
      order: "oldest",
      position: "",
      name: "",
      province: "",
      major: "",
      no: currentPage - 1,
      limit: limit,
    };

    dispatch(getJobFilterByUser(dataFilter));
  }, [currentPage]);
  useEffect(() => {
    setJobDetails(jobs[indexCardActive])
    dispatch(getJobByCompany(Number(idCompany)));
  }, [idCompany, indexCardActive]);
  const dataGetMarkByUser = {
    userName: profile.username,
    page: {
      no: currentPage - 1,
      limit: limit,
    },
  };
  useEffect(() => {
    if (profile.role === "Role_Candidate") {
      dispatch(getMarkByUser(dataGetMarkByUser));
    }
  }, [idCompany]);
  useEffect(() => {
    setJobDetails(jobs[0])
  }, [jobs])
  const handleSearch = (value) => {
    const dataFilter = {
      type: "",
      order: "oldest",
      position: "",
      name: value || "",
      province: locationValue || "",
      major: "",
      no: currentPage - 1,
      limit: limit,
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
          el === listPositionWorkingFormat[3] ||
          el === listPositionWorkingFormat[4] ||
          el === listPositionWorkingFormat[5] ||
          el === listPositionWorkingFormat[6]
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
          el !== listPositionWorkingFormat[3] &&
          el !== listPositionWorkingFormat[4] &&
          el !== listPositionWorkingFormat[5] &&
          el !== listPositionWorkingFormat[6]
      );
    }
    setMajor(tempMajor);
  };

  const getValuePageAndHandle = (value) => {
    setCurrentPage(value);
    window.scroll(0, 0);
  };
  const handleChanges = (e) => {
    if (e.target.dataset.testid === "NavigateNextIcon") {
      return setCurrentPage(currentPage + 1)
    }
    if (e.target.dataset.testid === "NavigateBeforeIcon") {
      return setCurrentPage(currentPage - 1)
    }
    return setCurrentPage(parseInt(e.target.innerText));
  }
  return (
    <>
      {(
        <Grid
          className="wrapper"
          spacing={{ xs: 1 }}
          sx={{ padding: "18px" }}
          container
        >
          <Grid item lg={2} md={3} sm={4} xs={12}>
            <Hidden mdDown>
              <SideBarHomeList
                onChange={handleCheck}
                slideBarHome__wrapper={true}
              />
            </Hidden>
          </Grid>

          <Grid item lg={4} md={8} sm={12} xs={12}>
            <div className="onDesktop">
              <SearchResultHome
                onClick={handleSearch}
                onChange={getValueLocationAndHandle}
              />
            </div>

            <FilterPanelHome
              jobList={jobs}
              indexCardActive={indexCardActive}
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
                jobDetail={jobDetails}
                jobList={jobs}
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
