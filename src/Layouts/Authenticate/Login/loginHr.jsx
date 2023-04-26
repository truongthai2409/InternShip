import { useEffect } from 'react';
// import Footer from "src/components/Footer";
import Footer from 'src/components/shared/Footer/Footer';
import HeaderContainer from 'src/components/HeaderContainer';
import './styles.scss';
import LoginHrContainer from 'src/containers/LoginContainer/loginHr';

const LoginHrLayout = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <div className='login-layout'>
        <HeaderContainer />
        <div className='login-container-hrwrapper'>
          <LoginHrContainer />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginHrLayout;
