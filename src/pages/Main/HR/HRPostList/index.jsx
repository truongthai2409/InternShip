import { useEffect } from "react";
import Button from "../../../../components/Button";
import "./styles.scss";
import CardPost from "../../../../components/CardPost";
import { useDispatch, useSelector } from "react-redux";
import {
  getJobList,
  getJobListByUsername,
} from "../../../../store/slices/main/home/job/jobSlice";

const formatLocation = (location) => {
  return `${location.address}, ${location.district?.name}, 
    ${location.district?.province?.name}`;
};

const HRPostList = (props) => {
  const dispatch = useDispatch();
  const { jobList } = useSelector((state) => state.job);
  const userPresent = JSON.parse(localStorage.getItem("userPresent"));

  useEffect(() => {
    dispatch(getJobListByUsername(userPresent.username));
  }, [dispatch]);

  return (
    <div className="hrpost__list">
      <div className="hrpost__list-bt">
        <Button name="ĐĂNG BÀI"></Button>
      </div>
      {jobList.map((job) => (
        <CardPost
          key={job.id}
          status={job.status}
          jobName={job.name}
          amount={job.amount}
          timeStart={job.timeStartStr}
          timeEnd={job.timeEndStr}
          timeCreated={job.createDate}
          companyName={job.hr?.company?.name}
          companyLocation={job.locationjob}
        />
      ))}
    </div>
  );
};

export default HRPostList;
