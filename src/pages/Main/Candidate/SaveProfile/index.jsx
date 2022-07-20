import React, { useEffect } from "react";
import CandidateProfile from "src/components/CandidateProfile";
import "./styles.scss";
import ContactCandidate from "src/components/ContactCandidate";
import { useDispatch, useSelector } from "react-redux";
import { getCandidateById } from "src/store/slices/main/candidate/info/infoCandidateSlice";

const CandidateSaveProfile = () => {
  const dispatch = useDispatch();

  const { candidateInfo } = useSelector((state) => state.infoCandidate);
  useEffect(() => {
    dispatch(getCandidateById(1));
  }, [dispatch]);

  console.log("candidate", candidateInfo);
  return (
    <div className="candidate-save-profile__container">
      <div className="candidate-card-profile-container">
        <CandidateProfile candidateInfo={candidateInfo} />
        <ContactCandidate candidateInfo={candidateInfo} />
      </div>
    </div>
  );
};

export default CandidateSaveProfile;
