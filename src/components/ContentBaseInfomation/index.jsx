import React from "react";
import PropTypes from "prop-types";
import JobCandidate from "../Job";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import Button from "../Button";
import "./styles.scss";
const ContentBaseInformation = ({
  jobDetail,
  jobListCompany,
  pdLeft,
  pdRight,
}) => {
  const location = useLocation();
  const pathUrl = location.pathname;
  return (
    <div>
      <div className="job-applying-container _scroll">
        <h5 className="intro__company-title intro__company-title-appling">
          Việc làm đang tuyển
        </h5>
        <Grid
          container
          spacing={1.5}
          sx={{
            // paddingLeft: `${pl}px`,
            // paddingRight: `${pr}px`,
            // marginLeft: `${ml}px`,
            width: "auto",
          }}
        >
          {jobListCompany.length > 0 &&
            jobListCompany?.map((job) => (
              <Grid
                item
                lg="12"
                md="12"
                sm="12"
                key={job.id}
                sx={{
                  // paddingLeft: `0px`,
                  width: "200px",
                }}
              >
                <JobCandidate
                  job={job}
                  key={job.id}
                  idJob={job.id}
                  pdLeft={pdLeft}
                  pdRight={pdRight}
                />
              </Grid>
            ))}
        </Grid>
      </div>
      {pathUrl !== "/candidate/information_company" ? (
        <div className="button-card">
          <Link to="/candidate/information_company">
            <Button name="Xem thêm" bwidth="130px" bheight="40px"></Button>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

ContentBaseInformation.propTypes = {};

export default ContentBaseInformation;
