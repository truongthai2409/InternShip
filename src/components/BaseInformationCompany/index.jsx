import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import "./styles.scss";
import JobCandidate from "../Job";
import Grid from "@mui/material/Grid";
import Button from "../Button";
import { useSelector, useDispatch } from "react-redux";
import { getRatingCompany } from "src/store/slices/main/home/rating/rating";
import { Link } from "react-router-dom";
import { getJobByCompany } from "src/store/slices/main/home/job/jobSlice";

function BaseInformationCompany(props) {
  const dispatch = useDispatch();
  const { rating } = useSelector((state) => state.rating);
  const { jobListCompany } = useSelector((state) => state.job);
  const idCompany = props.jobDetail?.hr?.company.id;
  console.log("jobList", jobListCompany);
  useEffect(() => {
    dispatch(getRatingCompany(idCompany));
    dispatch(getJobByCompany(idCompany));
  }, [idCompany, dispatch]);

  console.log(jobListCompany);

  return (
    <div className="">
      <div className="base__information">
        <h3 className="company-name">
          {}
        </h3>
        <div className="base__information-card">
          <img
            className="img-logo"
            alt=""
            src="https://r2s.com.vn/wp-content/uploads/2020/04/r2s.com_.vn_.png"
          />
          <div className="base__information-card-detail">
            <div className="">
              <h5>Mã số thuế: </h5>
              <p>123456789</p>
            </div>
            <div className="">
              <h5>Số điện thoại: </h5>
              <p>090876542132</p>
            </div>
            <div className="">
              <h5>Email: </h5>
              <p>tuyendung@r2s.com</p>
            </div>
            <div className="">
              <h5>Website: </h5>
              <p>r2s.com.vn</p>
            </div>
            <div className=" base__information-card-detail-location">
              <h5 className="">Địa điểm:</h5>
              <p className="">1164 Phạm Văn Đồng, TP Thủ Đức, TPHCM</p>
            </div>
          </div>

          {props.information ? (
            <div>
              <Rating
                name="read-only"
                precision={0.5}
                readOnly
                defaultValue={rating}
              />
              <p>5.0 trong 48 lượt đánh giá</p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="intro__company">
        <h5 className="intro__company-title">Giới thiệu về công ty</h5>
        <p className="intro__company-detail">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos non fuga
          voluptatibus. Excepturi eveniet natus laboriosam? Consequuntur odio
          dicta maiores beatae a, voluptatibus quis non quo dolorem autem, omnis
          sunt.
        </p>
      </div>
      <div className="job-applying-container">
        <h5 className="intro__company-title">Việc làm đang tuyển</h5>
        <Grid
          container
          spacing={3}
          sx={{ paddingLeft: `${props.pl}`, paddingRight: `${props.pr}` }}
        >
          {/* {jobListCompany.map((job) => {
            <Grid item lg="auto" md="auto" xs={6}>
              <JobCandidate job={job} />
            </Grid>;
          })} */}
          <div className="company-job-detail__card">
            <Grid item lg="auto" md="auto" xs={6}>
              <JobCandidate />
            </Grid>
            <Grid item lg="auto" md="auto" xs={6}>
              <JobCandidate />
            </Grid>
            <Grid item lg="auto" md="auto" xs={6}>
              <JobCandidate />
            </Grid>
            <Grid item lg="auto" md="auto" xs={6}>
              <JobCandidate />
            </Grid>
          </div>
        </Grid>
      </div>
      <div className="button-card">
        <Link to="/candidate/information_company">
          <Button name="Xem thêm"></Button>
        </Link>
      </div>
    </div>
  );
}

BaseInformationCompany.propTypes = {};

export default BaseInformationCompany;
