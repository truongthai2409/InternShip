import * as yup from 'yup';

export const schema = yup.object({
  username: yup.string().required('mustEnterAnAccountTL'),
  password: yup.string().required('mustEnterAnPasswordTL'),
});
