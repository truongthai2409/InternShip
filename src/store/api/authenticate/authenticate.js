import { internshipTransport } from 'src/config/http/transport';

const authenticate = {
  resetPassword: (data) => {
    const url = `/api/user/changePasswordByToken/`;

    return internshipTransport.post(url, {
      token: data.token,
      newPassword: data.newPassword,
    });
  },
  verifyEmail: (data) => {
    const url = `/api/mail/activeUser/?email=${data.email}`;

    return internshipTransport.get(url, {
      email: data.email,
    });
  },
};

export default authenticate;
