import Profile from 'src/components/User/Profile';
import Password from 'src/containers/Home/ChangePasswordForm';
import HrFindUser from 'src/containers/HrFindUser';
import MainLayout from 'src/Layouts/Main';
import CandidateList from 'src/pages/Main/HR/CandidateList';
import CandidateManagement from 'src/pages/Main/HR/CandidateManagement/CandidateManagement';
import DemoHR from 'src/pages/Main/NewHR/Home/DemoHR';
import DetailCandidate from 'src/pages/Main/NewHR/HRSearch/DetailCandidate';
import HR from '../../pages/Main/HR';
import HRPost from '../../pages/Main/HR/HRPost';
import HRPostList from '../../pages/Main/HR/HRPostList';
const hrRouter = [
  {
    role: 'Role_HR',
    path: '/hr',
    element: <MainLayout />,
    children: [
      {
        path: '',
        Component: DemoHR,
      },
      {
        path: 'profile',
        Component: Profile,
      },
      {
        path: 'post',
        Component: HRPost,
      },
      {
        path: 'list',
        Component: HRPostList,
      },
      {
        path: 'setting',
        Component: Password,
      },
      {
        // Version 2 🌹
        path: 'candidatemanagement',
        Component: CandidateManagement,
      },
      {
        path: 'finduser',
        Component: HrFindUser,
      },
      {
        path: 'finduser/detailCandidate',
        Component: DetailCandidate,
      },
    ],
  },
];

export default hrRouter;
