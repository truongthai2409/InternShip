import { useEffect } from "react";
import PropTypes from "prop-types";
import Button from "../../../../components/Button";
import "./styles.scss";
import CardPost from "../../../../components/CardPost";
import { useDispatch, useSelector } from "react-redux";
import { getJobList } from "../../../../store/slices/main/home/job/jobSlice";

const formatLocation = (location) => {
  return `${location.address}, ${location.district?.name}, ${location.district?.province?.name}`;
};

const HRPostList = (props) => {
  const dispatch = useDispatch();
  const { jobList } = useSelector((state) => state.job);

  useEffect(() => {
    dispatch(getJobList());
  }, []);

  // console.log(jobList);

  return (
    <div className="hrpost__list">
      <div className="hrpost__list-bt">
        <Button name="ĐĂNG BÀI"></Button>
      </div>
      {jobList.map((job) => (
        <CardPost
          key={job.id}
          status={job.status.id}
          jobName={job.name}
          amount={job.amount}
          timeStart={job.timeStartStr}
          timeEnd={job.timeEndStr}
          timeCreated={job.createDate}
          companyName={job.hr.company?.name}
          companyLocation={formatLocation(job.locationjob)}
        />
      ))}
    </div>
  );
};

HRPostList.propTypes = {};

export default HRPostList;
