import { Grid, Hidden } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMajorList } from "src/store/slices/Admin/major/majorSlice";
import {
  indexFilterChange,
  jobFilters,
} from "src/store/slices/main/home/filter/filterSlices";
import { getAllRating } from "src/store/slices/main/home/rating/rating";
import DetailCard from "../../../components/DetailCard";
import ListCardJobHome from "../../../components/ListCardJobHome";
import SearchResultHome from "../../../components/SearchResultHome";
import SideBarHomeList from "../../../components/SideBarHomeList";
import { getJobByCompany, getJobPositionList } from "../../../store/slices/main/home/job/jobSlice";
import "./styles.scss";
import notfound from 'src/assets/img/notfound.webp'
import { userCandidateRemainingSelector } from "src/store/slices/main/candidate/user/userCandidateRemaining";
import { changeFilterChange, getAllUserCandidate, majorFilterChange, nameFilterChange } from "src/store/slices/main/candidate/user/userCandidateSlice";
import SearchHR from "../HR/SearchHR";
import { useNavigate } from "react-router-dom";
const initialState = {
  type: [],
  position: [],
  major: [],
  no: 0,
  order: "oldest",
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
      return { ...state, type: action.payload };
    case "position":
      return { ...state, position: action.payload };
    case "major":
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

const Home = (props) => {

  const dispatch = useDispatch();
  const { index, id } = useSelector(state => state.filter)
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
    dispatch(nameFilterChange(value))
    dispatch(indexFilterChange(0));
    dispatcher({ type: "name", payload: value });
    dispatcher({ type: "no", payload: 0 });
    dispatcher({ type: "province", payload: valueLocation });
    dispatch(changeFilterChange(false))
  };
  const getValueLocationAndHandle = (value) => {
    dispatch(majorFilterChange(value))
    setValueLocation(value);
  };
  const getValuePageAndHandle = (value) => {
    dispatcher({ type: "no", payload: value - 1 });
    dispatch(indexFilterChange(0));
    window.scroll(0, 0);
  };
  const handleCheck = (value) => {
    dispatch(indexFilterChange(0));
    dispatch(changeFilterChange(false))
    let tempType = [];
    let tempPosition = [];
    let tempMajor = [];
    if (value.length > 0) {
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
    }
  };

  useEffect(() => {
    const dataFilter = [{
      type: state.type + "",
      order: state.order,
      position: state.position + "",
      name: state.name,
      province: state.province,
      major: state.major + "",
      no: state.no,
      limit: 5,
    }, { link: props.linkFilter }];
    dispatch(jobFilters(dataFilter));
  }, [state, dispatch, props.linkFilter]);

  useEffect(() => {
    setJob(props.jobFilter);
    setJobDetail(props.jobFilter[index]);
  }, [props.jobFilter, dispatch, index]);

  useEffect(() => {
    dispatch(getJobByCompany(id));
    dispatch(getJobPositionList());
  }, [dispatch, id])
  const navigate = useNavigate()
  useEffect(() => {
    if (props.userCandidate) {
        navigate("finduser")
      }
  }, [dispatch, navigate, props.userCandidate])
  return (
    <>
      <Grid
        className="wrapper"
        sx={{ padding: "8px" }}
        spacing={{ xs: 1 }}
        container
      >
        <Grid item xs={2}>
          <Hidden mdDown>
            <SideBarHomeList
              onChange={handleCheck}
              slideBarHome__wrapper={true}
            />
          </Hidden>
        </Grid>
        {jobs.length === 0 ?
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
                <img src={notfound} alt="notfound" width={"70%"} height={"50%"} />
              </Grid>
            </Grid>
          </Grid> :
          <>
            <Grid item xs={4}>
              <Grid container spacing={{ xs: 1 }}>
                <Grid item xs={12}>
                  <div className="none__res">
                    <div style={{ backgroundColor: "#fff", height: 45 }}>
                      <h4 style={{ color: "#000", padding: 12, textAlign: "center" }}>Tìm kiếm {props.nameSearch}</h4>
                    </div>
                    <SearchResultHome
                      onClick={handleSearch}
                      onChange={getValueLocationAndHandle}
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <ListCardJobHome
                    jobList={jobs}
                    indexCardActive={index}
                    jobListHavePages={props.jobPage}
                    onChange={getValuePageAndHandle}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <div className="containerDetailCard containerDetailCard-none">
                {props.hr &&
                  <SearchHR />
                }
                <DetailCard
                  logo="https://r2s.edu.vn/wp-content/uploads/2021/05/r2s.com_.vn_-316x190.png"
                  jobDetail={jobDetail}
                  jobList={jobs}
                  jobListCompany={jobListCompany}
                  demandPartner={props.demandPartner}
                />
              </div>
            </Grid>
          </>
        }
      </Grid>
    </>
  );
};

export default Home;
