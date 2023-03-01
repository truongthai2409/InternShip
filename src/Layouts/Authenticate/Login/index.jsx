import { useEffect } from 'react';
// import Footer from "src/components/Footer";
import Footer from 'src/components/shared/Footer/Footer';
import HeaderContainer from 'src/components/HeaderContainer';
import LoginContainer from '../../../containers/LoginContainer';
import './styles.scss';

const LoginLayout = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <div className='login-layout'>
        <HeaderContainer />
        <div className='login-container-wrapper'>
          <LoginContainer />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginLayout;
