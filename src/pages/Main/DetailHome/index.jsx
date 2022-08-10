import React from "react";
// import PropTypes from "prop-types";
import DetailCard from "../../../components/DetailCard";
import CardVisit from "../../../components/CardVisit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Grid } from "@mui/material";
import "./styles.scss";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getJobById,
  getJobByNameAndLocation,
} from "../../../store/slices/main/home/job/jobSlice";
import ArrowButton from "src/components/ArrowButton";
const DetailHome = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { jobDetailById, idJobActive } = useSelector((state) => state.job);

  useEffect(() => {
    const dataSearch = {
      name: "",
      province: "",
      no: 0,
      limit: 10,
    };
    dispatch(getJobByNameAndLocation(dataSearch));
    dispatch(getJobById(idJobActive));
  }, [dispatch]);
  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <div>
      <Grid
        className="wrapper"
        container
        spacing={4}
        sx={{
          padding: 0,
          paddingLeft: 3,
          paddingRight: 3,
        }}
      >
        <Grid item md={8} sm={12} xs={12}>
          <div className="">
            <DetailCard
              logo="https://r2s.edu.vn/wp-content/uploads/2021/05/r2s.com_.vn_-316x190.png"
              jobDetailById={jobDetailById}
            />
            <div className="config__arow-back hide-on-table">
              <div className="demand-detail__back" onClick={handleBackClick}>
                <ArrowButton direction="left" text="Trở lại" />
              </div>
            </div>
          </div>
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
          <CardVisit
            logo="https://r2s.edu.vn/wp-content/uploads/2021/05/r2s.com_.vn_-316x190.png"
            jobDetailById={jobDetailById}
          />
        </Grid>
        <div className="config__arow-back hide-on-desktop ">
          <Link to="/" className="config__arow-back">
            <ArrowBackIcon></ArrowBackIcon>
            Trở lại
          </Link>
        </div>
      </Grid>
    </div>
  );
};

DetailHome.propTypes = {};

export default DetailHome;
