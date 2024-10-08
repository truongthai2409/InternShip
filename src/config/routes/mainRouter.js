import AboutUS from 'src/components/Footer/FooterChildren/AboutUs';
import Contact from 'src/components/Footer/FooterChildren/Contact';
import Help from 'src/components/Footer/FooterChildren/Help';
import PrivacyPolicy from 'src/components/Footer/FooterChildren/PrivacyPolicy';
import Regulation from 'src/components/Footer/FooterChildren/Regulation';
import TermsOfServices from 'src/components/Footer/FooterChildren/TermsOfServices';
import InfomationDemand from 'src/pages/Main/Partner/InfomationDemand';
import MainLayout from 'src/Layouts/Main';
import ForgotPassword from 'src/pages/Authenticate/ForgotPassword';
import Main from 'src/pages/Main';
import CandidateInformationCompany from 'src/pages/Main/Candidate/InformationCompany';
import CommingSoon from 'src/pages/Main/Home/CommingSoon';
import NotFound from 'src/pages/NotFound';
import DetailHome from '../../pages/Main/DetailHome';
import ResetPassword from 'src/pages/Authenticate/ResetPassword/ResetPassword';
import DemoHR from 'src/pages/Main/NewHR/Home/DemoHR';
import AddJob from 'src/pages/Main/NewHR/AddJob/AddJob';
import ActiveAccount from 'src/pages/ActiveAccount/ActiveAccount';
const mainRouter = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        Component: Main,
      },
      {
        path: '/detail_job/:keyword',
        Component: DetailHome,
      },
      {
        path: '/information_company/:keyword',
        Component: CandidateInformationCompany,
      },
      {
        path: '/about-us',
        Component: AboutUS,
      },
      {
        path: '/contact',
        Component: Contact,
      },
      {
        path: '/help',
        Component: Help,
      },
      {
        path: 'privacy-policy',
        Component: PrivacyPolicy,
      },
      {
        path: 'terms-of-services',
        Component: TermsOfServices,
      },
      {
        path: 'regulation',
        Component: Regulation,
      },
      {
        path: 'infomation_demand/:keywod',
        Component: InfomationDemand,
      },
      {
        path: 'demoHR',
        Component: DemoHR,
      },
      {
        path: 'demoHR/add',
        Component: AddJob,
      },
      {
        path: 'api/r2s/candidate/active',
        Component: ActiveAccount,
      },
    ],
  },
  {
    path: '/not-found',
    element: <NotFound />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/api/user/edit',
    element: <ResetPassword />,
  },
  {
    path: '/comming-soon',
    element: <CommingSoon />,
  },
  {
    //Doesn't match route?, It's here. If you want to change just delete children and change element
    path: '*',
    element: <MainLayout />,
    children: [
      {
        path: '*',
        Component: Main,
      },
    ],
  },
];
export default mainRouter;
