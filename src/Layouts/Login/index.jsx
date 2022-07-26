import React from "react";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import LoginContainer from "../../containers/LoginContainer";
import "./styles.scss";

const LoginLayout = () => {
  return (
    <div className="login-layout">
      <Header />
      <LoginContainer />
      <Footer />
    </div>
  );
};

export default LoginLayout;
