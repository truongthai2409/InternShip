import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardJob from "src/components/CardJob";
import FeedBack from "src/components/FeedBack";
import UserCard from "src/components/UserCard";
import { getMark } from "src/store/slices/main/mark/markSlice";
import { TabTitle } from "src/utils/GeneralFunctions";
import "./styles.scss";

const CandidateViewList = () => {
  TabTitle("Danh sách ứng viên")
  const dispatch = useDispatch();

  const { careListCandidate } = useSelector((state) => state.mark);
  useEffect(() => {
    dispatch(getMark());
  }, [dispatch]);
  return (
    <div className="view-list">
      <div className="view-list__container">
        <div className="view-list__job-card">
          {careListCandidate.map((jobCare) => (
            <CardJob key={jobCare.id} jobCare={jobCare} />
          ))}
        </div>
        <div className="view-list__job-user-card">
          <UserCard />
          <FeedBack />
        </div>
      </div>
    </div>
  );
};

export default CandidateViewList;
