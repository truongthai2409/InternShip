import React from "react";
// import PropTypes from "prop-types";
import DetailCard from "../../../components/DetailCard";
import CardVisit from "../../../components/CardVisit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Grid } from "@mui/material";
import "./styles.scss";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobByName } from "../../../store/slices/main/home/job/jobSlice";
function DetailHome(props) {
  const { jobListName, jobDetail, indexCardActive } = useSelector(
    (state) => state.job
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getJobByName(""));
  }, []);
  return (
    <div>
      <Grid className="wrapper" container spacing={4}>
        <Grid item md={8} sm={12} xs={12}>
          <div className="">
            <DetailCard
              logo="https://r2s.edu.vn/wp-content/uploads/2021/05/r2s.com_.vn_-316x190.png"
              star={4.5}
              nameMajor="React-Js"
              nameCompany="R2S"
              detailJob={
                "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque inventore pariatur tenetur fugiat laboriosam voluptas, ea accusamus facilis ut, sunt optio! Expedita beatae voluptates assumenda fugiat nam rerum autem deleniti?"
              }
              requireJob={
                "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque inventore pariatur tenetur fugiat laboriosam voluptas, ea accusamus facilis ut, sunt optio! Expedita beatae voluptates assumenda fugiat nam rerum autem deleniti?"
              }
              timeJob={"10/6/2022-10/8/2022"}
              salary={"5.000.000"}
              location={"TPHCM"}
              rating={"5.0 trong 48 lượt đánh giá"}
              jobDetail={jobDetail}
              jobListName={jobListName}
            />
            <div className="config__arow-back hide-on-table">
              <Link to="/" className="config__arow-back">
                <ArrowBackIcon></ArrowBackIcon>
                Trở lại
              </Link>
            </div>
          </div>
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
          <CardVisit
            logo="https://r2s.edu.vn/wp-content/uploads/2021/05/r2s.com_.vn_-316x190.png"
            nameCompany="Công Ty R2S "
            emailCompany="tuyendung@r2s.edu.vn"
            phoneCompany="0902394324"
            website="https://r2s.edu.vn/"
            location="1164 đường Phạm Văn Đồng, P.Linh Đông, TP Thủ Đức, TP.HCM"
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
}

DetailHome.propTypes = {};

export default DetailHome;
