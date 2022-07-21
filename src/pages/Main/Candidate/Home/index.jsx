import React from "react";
import { TabTitle } from "src/utils/GeneralFunctions";
import Home from "../../Home";

const CandidateHome = (props) => {
  TabTitle("Trang chủ");
  return (
    <div>
      <Home candidate={true}></Home>
    </div>
  );
};

export default CandidateHome;
