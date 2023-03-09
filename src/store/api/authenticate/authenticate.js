import { internshipTransport } from 'src/config/http/transport';

const authenticate = {
  resetPassword: (data) => {
    const url = `/api/user/changePasswordByToken/`;

    return internshipTransport.post(url, {
      token: data.token,
      newPassword: data.newPassword,
    });
  },
};

export default authenticate;
