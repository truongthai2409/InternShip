import "./styles.scss";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import { candidateRouter } from "src/config/routes";
import { useLocation } from "react-router-dom";
import HeaderWithHR from "src/components/HeaderWithHR";

const CandidateLayOut = () => {
  let location = useLocation();

  return (
    <div className="main__layout">
      {location.pathname === "/candidate/information_company" ? (
        <HeaderWithHR id={3} search />
      ) : (
        <HeaderWithHR id={3} />
      )}
      <Outlet />
      <Footer />
    </div>
  );
};

export default CandidateLayOut;
