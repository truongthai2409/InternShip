import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import // useSelector,
"react-redux";
// import { getJobList } from "../../store/slices/main/home/job/jobSlice";
// import moment from "moment";
import "./styles.scss";
import Detail from "./component";

const DetailCard = ({
  logo,
  jobDetail,
  jobListName,
  candidate,
  jobPostHR,
  jobDetailById,
  demandPartner = false,
}) => {
  return (
    <div>
      {jobListName && jobListName.length > 0 ? (
        <Detail jobDetail={jobDetail} />
      ) : (
        <Detail jobDetailById={jobDetailById} /> || null
      )}
    </div>
  );
};

DetailCard.propTypes = {
  logo: PropTypes.string.isRequired,
  nameMajor: PropTypes.string,
  nameCompany: PropTypes.string,
  detailJob: PropTypes.string,
  requireJob: PropTypes.string,
  timeJob: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  salary: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default DetailCard;
