import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { getUserById } from 'src/store/slices/main/user/userSlice';
import { TabTitle } from 'src/utils/GeneralFunctions';
// import Footer from "../../components/Footer";
import Footer from 'src/components/shared/Footer/Footer';
import HeaderContainer from '../../components/HeaderContainer';
import './styles.scss';
import Container from './Container';
import { useTranslation } from 'react-i18next';
import VerifyEmail from 'src/components/VerifyEmail/VerifyEmail';
const MainLayout = () => {
  const { t } = useTranslation('title');
  TabTitle(t('homeITInternshipJobsTL'));
  // Sau khi Login . Với role Candidate, Hr, Partner. Comnponent này sẽ đuợc chạ
  // đem thông tin trong localStorage hoặc sesionStorage dispatch lấy thông tin đầy đủ. Các component khác chỉ dùng. không dispatch
  const dispatch = useDispatch();
  const user =
    JSON.parse(sessionStorage.getItem('userPresent')) ||
    JSON.parse(localStorage.getItem('userPresent'));
  // const renderUser = useCallback(
  //   () => user && dispatch(getUserById(user)),
  //   [ user]
  // );
  const userDetail = useSelector((state) => state.profile.user);
  const verifiedEmail =
    userDetail?.statusDTO?.name === 'Not available' ? true : false;
  useEffect(() => {
    dispatch(getUserById(user));
  }, []);
  return (
    <Container>
      <div className='main__layout'>
        <HeaderContainer />
        <div className='main__layout-body-outlet'>
          {verifiedEmail ? <VerifyEmail /> : <Outlet />}
        </div>
        <Footer />
      </div>
    </Container>
  );
};

export default MainLayout;
