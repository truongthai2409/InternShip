import { Fragment } from "react";
import { useSelector } from "react-redux";
import HeaderWithCandidate from "src/components/HeaderWithCandidate";
import HeaderWithHR from "src/components/HeaderWithHR";
import HeaderWithPartner from "src/components/HeaderWithPartner";
import Login from "../Login";
import Logo from "../shared/Logo";
import "./styles.scss";
import LanguageSetting from "./../shared/LanguageSetting/LanguageSetting";

export default function HeaderContainer() {
  const { role } = useSelector((state) => state.profile);

  const renderLayout = () => {
    switch (role) {
      case "Role_HR": {
        return <HeaderWithHR />;
      }
      case "Role_Partner": {
        return <HeaderWithPartner />;
      }
      case "Role_Candidate": {
        return <HeaderWithCandidate />;
      }
      default: {
        return <Fragment />;
      }
    }
  };

  return (
    <div className="container-header__hr header__hr config">
      <Logo />
      {renderLayout()}
      <LanguageSetting />
      <div className="header__hr-icon">
        <Login />
      </div>
    </div>
  );
}
