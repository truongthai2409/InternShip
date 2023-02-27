import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Grid, Hidden } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import notfound from "src/assets/img/notfound.webp";
import TemporaryDrawer from "src/components/shared/Drawer";
import {
  changeFilterChange,
  majorFilterChange,
  nameFilterChange,
} from "src/store/slices/main/candidate/user/userCandidateSlice";
import { getDemandList } from "src/store/slices/main/home/demand/demandSlice";
import {
  indexFilterChange,
  jobFilters,
  pageFilterChange,
} from "src/store/slices/main/home/filter/filterSlices";
import DetailCard from "../../../components/Card/DetailCard";
import ListCardJobHome from "../../../components/Home/ListCardJobHome";
import SearchResultHome from "../../../components/Home/SearchResultHome";
import SideBarHomeList from "../../../components/Home/SideBarHomeList";
import { getJobPositionList } from "../../../store/slices/main/home/job/jobSlice";
import { getJobByCompanyThunk } from "src/store/action/company/companyAction";
import SearchHR from "../HR/SearchHR";
import "./styles.scss";
const initialState = {
  type: [],
  position: [],
  major: [],
  no: 0,
  order: "newest",
  name: "",
  province: "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "no":
      return { ...state, no: action.payload };
    case "province":
      return { ...state, province: action.payload };
    case "type":
      if (action.payload.length === 0) {
        return { ...state, type: "" };
      }
      return { ...state, type: action.payload };
    case "position":
      if (action.payload.length === 0) {
        return { ...state, position: "" };
      }
      return { ...state, position: action.payload };
    case "major":
      if (action.payload.length === 0) {
        return { ...state, major: "" };
      }
      return { ...state, major: action.payload };
    case "reset": {
      return {
        ...state,
        type: [],
        position: [],
        major: [],
        no: 0,
        order: "oldest",
        name: "",
        province: "",
      };
    }
    default:
      return { ...state };
  }
}

const image_notFound =
  "https://images.glints.com/unsafe/1920x0/glints-dashboard.s3.amazonaws.com/images/jobs/empty-view.png";
const Home = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation("client");
  const { index, id, jobPage, jobFilter } = useSelector(
    (state) => state.filter
  );
  // console.log(index)
  const { roleFilter } = props;
  const { jobPosition, jobListCompany } = useSelector((state) => state.job);

  const [state, dispatcher] = useReducer(reducer, initialState);

  const listPositionWorkingFormat = jobPosition?.map((item) => {
    return item.name;
  });
  const [valueLocation, setValueLocation] = useState("");
  const [jobs, setJob] = useState([]);
  const [jobDetail, setJobDetail] = useState([]);
  const listWorkingFormat = [
    { name: "Fulltime", id: 1 },
    { name: "Parttime", id: 2 },
    { name: "Remote", id: 3 },
  ];

  const handleSearch = (value) => {
    dispatch(nameFilterChange(value));
    dispatch(indexFilterChange(0));
    dispatcher({ type: "name", payload: value });
    dispatcher({ type: "no", payload: 0 });
    dispatcher({ type: "province", payload: valueLocation });
    dispatch(changeFilterChange(false));
    dispatch(pageFilterChange(1));
  };
  const getValueLocationAndHandle = (value) => {
    dispatch(majorFilterChange(value));
    setValueLocation(value);
  };
  const getValuePageAndHandle = (value) => {
    console.log(value);
    const userPartner =
      JSON.parse(sessionStorage.getItem("userPresent")) ||
      JSON.parse(localStorage.getItem("userPresent"));
    if (userPartner && userPartner.role === "Role_HR") {
      dispatch(indexFilterChange(0));
      window.scroll(0, 0);
      return dispatch(getDemandList({ currentPage: value, limit: 5 }));
    }
    dispatcher({ type: "no", payload: value - 1 });
    dispatch(indexFilterChange(0));
  };
  const handleCheck = (value) => {
    dispatch(indexFilterChange(0));
    dispatch(changeFilterChange(false));
    let tempType = [];
    let tempPosition = [];
    let tempMajor = [];
    tempType = value.filter((sp) =>
      listWorkingFormat
        .map((items) => {
          return items.name;
        })
        .includes(sp)
    );
    tempPosition = value.filter((items) =>
      listPositionWorkingFormat
        .map((item) => {
          return item;
        })
        .includes(items)
    );
    tempMajor = value.filter(
      (items) =>
        !listPositionWorkingFormat
          .map((item) => {
            return item;
          })
          .includes(items) &&
        !listWorkingFormat
          .map((item) => {
            return item.name;
          })
          .includes(items)
    );
    dispatcher({ type: "type", payload: tempType });
    dispatcher({ type: "position", payload: tempPosition });
    dispatcher({ type: "major", payload: tempMajor });
    dispatcher({ type: "no", payload: 0 });
    dispatch(pageFilterChange(1));
  };

  useEffect(() => {
    const dataFilter = [
      {
        type: state.type + "",
        order: state.order,
        position: state.position + "",
        name: state.name,
        province: state.province,
        major: state.major + "",
        no: state.no,
        limit: 5,
      },
      { link: props.linkFilter },
    ];
    dispatch(jobFilters(dataFilter));
  }, [state, dispatch, props.linkFilter]);
  useEffect(() => {
    setJob(jobFilter);
    if (roleFilter) {
      setJob(roleFilter);
      roleFilter && setJobDetail(roleFilter[index]);
    } else {
      jobFilter && setJobDetail(jobFilter[index]);
    }
  }, [jobFilter, dispatch, index, roleFilter]);

  useEffect(() => {
    dispatch(getJobByCompanyThunk(id));
    dispatch(getJobPositionList());
  }, [dispatch, id]);
  const navigate = useNavigate();
  useEffect(() => {
    if (props.userCandidate) {
      navigate("finduser");
    }
  }, [dispatch, navigate, props.userCandidate]);
  return (
    <Grid
      className="wrapper"
      sx={{ padding: "1rem 2rem", position: "relative" }}
      spacing={{ xs: 4 }}
      container
    >
      <Hidden lgDown>
        <Grid item xs={0} sm={0} md={0} lg={2} xl={2}>
          <SideBarHomeList
            onChange={handleCheck}
            slideBarHome__wrapper={true}
          />
        </Grid>
      </Hidden>
      {jobs?.length === 0 ? (
        <Grid item xs={10}>
          <Grid container spacing={{ xs: 1 }}>
            <Grid item xs={12}>
              <div className="none__res">
                <SearchResultHome
                  onClick={handleSearch}
                  onChange={getValueLocationAndHandle}
                />
              </div>
            </Grid>
            <Grid item xs={12} style={{ textAlignLast: "center" }}>
              <img
                src={image_notFound}
                alt="notfound"
                width={"20%"}
                height={"100%"}
              />
              <p>Rất tiếc, hiện tại không có công việc phù hợp được tìm thấy</p>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <div className="none__res">
                <SearchResultHome
                  onClick={handleSearch}
                  onChange={getValueLocationAndHandle}
                />
              </div>
            </Grid>

            <div className="home__container">
              <ListCardJobHome
                jobList={jobs}
                indexCardActive={index}
                jobListHavePages={jobPage}
                onChange={getValuePageAndHandle}
              />

              <Hidden mdDown>
                <Grid item xs={12} sm={12} md={6} lg={5} xl={5}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div className="containerDetailCard containerDetailCard-none">
                      {/* {props.hr && <SearchHR />} */}
                      <DetailCard
                        logo="https://r2s.edu.vn/wp-content/uploads/2021/05/r2s.com_.vn_-316x190.png"
                        jobDetail={jobDetail}
                        jobList={jobs}
                        jobListCompany={jobListCompany}
                        demandPartner={props.demandPartner}
                      />
                    </div>
                  </Grid>
                </Grid>
              </Hidden>
            </div>
          </Grid>
          <Hidden lgUp>
            <div className="HomePageMenu">
              <TemporaryDrawer
                children={
                  <SideBarHomeList
                    onChange={handleCheck}
                    slideBarHome__wrapper={true}
                  />
                }
                position="left"
                name={<AddCircleIcon />}
              />
            </div>
          </Hidden>
        </Grid>
      )}
    </Grid>
  );
};

export default Home;
