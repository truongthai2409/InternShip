import { internshipTransport } from 'src/config/http/transport';

const authenticate = {
  resetPassword: (data) => {
    const url = `/api/user/change-password-by-token/`;

    return internshipTransport.post(url, {
      token: data.token,
      newPassword: data.newPassword,
    });
  },
  // send token from server to your email
  verifyEmail: (data) => {
    const url = `/api/mail/active-user/?email=${data.email}`;

    return internshipTransport.get(url);
  },
  // active account by send verified token from client to server
  activeAccount: (data) => {
    const url = `/api/candidate/active/?activeToken=${data.activeToken}`;

    return internshipTransport.get(url);
  },
};

export default authenticate;
