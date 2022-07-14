import React from "react";
import CardJob from "src/components/CardJob";
import FeedBack from "src/components/FeedBack";
import UserCard from "src/components/UserCard";
import "./styles.scss";

const CandidateViewList = () => {
  return (
    <div className="view-list">
      <div className="view-list__container">
        <div className="view-list__job-card">
          <CardJob />
          <CardJob />
          <CardJob />
          <CardJob />
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
