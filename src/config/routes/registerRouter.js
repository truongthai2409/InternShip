import RegisterLayout from 'src/Layouts/Authenticate/Register';
import CandidateInfo from 'src/pages/Register/CandidateInfo';
import HRInfo from 'src/pages/Register/HRInfo';
import PartnerInfo from 'src/pages/Register/PartnerInfo';
import RegisterNew from 'src/pages/Register/NewRegister';

const registerRouter = [
  {
    path: '/register',
    element: <RegisterLayout />,
    children: [
      {
        path: 'candidate',
        Component: CandidateInfo,
      },
      {
        path: 'hr',
        Component: RegisterNew,
      },
      {
        path: 'partner',
        Component: PartnerInfo,
      },
      // {
      //   path: 'newhr',
      //   Component: RegisterNew
      // }
      //   ,
    ],
  },
];
export default registerRouter;
