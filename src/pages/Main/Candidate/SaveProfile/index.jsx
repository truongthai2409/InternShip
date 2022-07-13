import React from "react";
import CandidateProfile from "src/components/CandidateProfile";
import "./styles.scss";
import ContactCandidate from "src/components/ContactCandidate";

const CandidateSaveProfile = () => {
  return (
    <div className="candidate-save-profile__container">
      <div className="candidate-card-profile-container">
        <CandidateProfile />
        <ContactCandidate />
      </div>
    </div>
  );
};

export default CandidateSaveProfile;
