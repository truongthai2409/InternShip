import LoginLayout from 'src/Layouts/Authenticate/Login';
import LoginHrLayout from 'src/Layouts/Authenticate/Login/loginHr';

const loginRouter = [
  {
    path: '/login/candidate',
    element: <LoginLayout />,
  },
  {
    path: '/login/hr',
    element: <LoginHrLayout />,
  },
];
export default loginRouter;
