import Profile from 'src/components/User/Profile';
import Password from 'src/containers/Home/ChangePasswordForm';
import DetailPostPartner from 'src/pages/Main/Partner/DetailPostPartner';
import PartnerHome from 'src/pages/Main/Partner/Home';
import PartnerPostList from 'src/pages/Main/Partner/PartnerPostList';
import PartnerPost from 'src/pages/Main/Partner/Post';
import MainLayout from 'src/Layouts/Main';

const partnerRouter = [
  {
    role: 'Role_Partner',
    path: '/partner',
    element: <MainLayout />,
    children: [
      {
        path: '',
        Component: PartnerHome,
      },
      {
        path: 'post',
        Component: PartnerPost,
      },
      {
        path: 'post-list',
        Component: PartnerPostList,
      },
      {
        path: 'profile',
        Component: Profile,
      },
      {
        path: 'setting',
        Component: Password,
      },
      {
        path: 'search/:keyword',
        Component: PartnerHome,
      },
      {
        path: 'detail_demand/:keyword',
        Component: DetailPostPartner,
      },
    ],
  },
];

export default partnerRouter;
