import Profile from 'src/components/User/Profile';
import Password from 'src/containers/Home/ChangePasswordForm';
import HrFindUser from 'src/containers/HrFindUser';
import MainLayout from 'src/Layouts/Main';
import CandidateManagement from 'src/pages/Main/HR/CandidateManagement/CandidateManagement';
import DemoHR from 'src/pages/Main/NewHR/Home/DemoHR';
import DetailCandidate from 'src/pages/Main/NewHR/HRSearch/DetailCandidate';
import AddJob from 'src/pages/Main/NewHR/AddJob/AddJob';
import HRPost from 'src/pages/Main/HR/HRPost';
import HRPostList from 'src/pages/Main/HR/HRPostList';
import SearchHR from 'src/pages/Main/NewHR/HRSearch/SearchHR';
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
        path: 'addPost',
        Component: AddJob,
      },
      {
        path: 'managePost',
        Component: HRPostList,
      },
      {
        path: 'setting',
        Component: Password,
      },
      {
        path: 'searchCandidate',
        Component: SearchHR,
      },
      {
        path: 'searchCandidate/detailCandidate/:keyword',
        Component: DetailCandidate,
      },
    ],
  },
];

export default hrRouter;
