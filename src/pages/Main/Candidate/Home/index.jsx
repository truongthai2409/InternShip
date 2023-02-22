import { useEffect } from "react";
import { TabTitle } from "src/utils/GeneralFunctions";
import Main from "../..";

const CandidateHome = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  TabTitle("Trang chủ");
  return (
    <div>
      <Main />
    </div>
  );
};

export default CandidateHome;
