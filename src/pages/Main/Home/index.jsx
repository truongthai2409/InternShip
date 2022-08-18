import { Grid } from "@mui/material";
import SearchResultHome from "../../../components/SearchResultHome";
import DetailCard from "../../../components/DetailCard";
import SideBarHomeList from "../../../components/SideBarHomeList";
import FilterPanelHome from "../../../components/FilterPanelHome";
import "./styles.scss";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getJobByNameAndLocation,
  getJobFilterByUser,
  getJobList,
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
    jobListNameHavePages,
    jobFilter,
  } = useSelector((state) => state.job);
  // const [totalPages, setTotalPages] = useState();

  const [jobs, setJobs] = useState(jobFilter);
  const [type, setType] = useState([]);
  const [position, setPosition] = useState([]);
  const [major, setMajor] = useState([]);

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
  }, [dispatch, currentPage]);

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
  }, []);

  useEffect(() => {
    const dataFilter = {
      type: positionValue?.[0] || "",
      order: "oldest",
      position: positionValue?.[1] || "",
      name: "",
      province: "",
      major: positionValue?.[2] || "",
      no: 0,
      limit: 5,
    };
    dispatch(getJobFilterByUser(dataFilter));
    // const _getJobs = async () => {
    //   const data = await dispatch(getJobFilterByUser(dataFilter));
    //   const res = unwrapResult(data);
    //   setFilters(res.contents);
    // };
    // _getJobs();
  }, []);

  const handleSearch = (value) => {
    // const dataSearch = {
    //   name: value || "",
    //   province: locationValue || "",
    //   no: 0,
    //   limit: 5,
    // };
    const dataFilter = {
      type: "",
      order: "oldest",
      position: "",
      name: value || "",
      province: locationValue || "",
      major: "",
      no: 0,
      limit: 10,
    };
    dispatch(getJobFilterByUser(dataFilter));
    // dispatch(getJobByNameAndLocation(dataSearch));
    // navigate(
    //   `/candidate` +
    //     `?name=${value || ""}&province=${
    //       encodeURIComponent(locationValue)
    //         .replace(/%20/g, "+")
    //         .replace(/\s/g, "-") || ""
    //     }&no=0&limit=10`
    // );
  };

  const getValueLocationAndHandle = (value) => {
    setLocationValue(value);
  };

  const handleCheck = (value) => {
    // let temp = [];
    // temp = value.filter(() =>
    //   value.includes("Parttime" || "Fulltime" || "Remote")
    // );
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

    // setPositionValue(temp);
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
              // positionJobValue={positionJobValue}
              positionValue={positionValue}
              jobListNameHavePages={jobListNameHavePages}
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
              />
            </div>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Home;
