import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {} from 'src/components/shared/CustomInput/components';
import { registerCandidate } from 'src/store/slices/main/register/registerSlice';
import { TabTitle } from 'src/utils/GeneralFunctions';
import { genderList, schema } from './data';
import registerImg from 'src/assets/img/register-candidate.png';
import Container from '../Container';
import Grid from '@mui/material/Grid';

import './styles.scss';
import { useTranslation } from 'react-i18next';
import { verifyEmailThunk } from 'src/store/action/authenticate/authenticateAction';
const CandidateInfo = () => {
  const { t } = useTranslation('title');
  TabTitle(t('registerCandidateTL'));

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.register.error);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    const userData = {
      candidate: JSON.stringify({
        userCreationDTO: {
          username: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
          lastName: data.lastName,
          firstName: data.firstName,
          phone: data.phone,
          email: data.email,
        },
      }),
    };

    dispatch(registerCandidate(userData))
      .then((res) => {
        if (res.payload.status === 200 || res.payload.status === 201) {
          const formData = {
            email: data.email,
          };
          dispatch(verifyEmailThunk(formData))
            .then((res) => {
              toast.success('Vui lòng kiểm tra email và xác thực tài khoản',{
                position: 'top-right',
                autoClose: 3000,
                theme: 'dark',
              });
            })
            .catch((err) => {
              toast.error('Email xác thực chưa được gửi về',{
                position: 'top-right',
                autoClose: 3000,
                theme: 'dark',
              });
            });
          navigate('/login');
        }
      })
      .catch((error) => {
        toast.error(error,{
          position: 'top-right',
          autoClose: 3000,
          theme: 'dark',
        });
      });
  };

  return (
    <Grid container>
      <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
        <div className='register-candidate'>
          <p style={{ fontSize: '30px', color: '#fff' }}>ĐĂNG KÝ ỨNG VIÊN</p>
          <img src={registerImg} className='register-candidate__image' />
        </div>
      </Grid>
      <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
        <Container
          title='Ứng Viên'
          handleClick={handleSubmit(onSubmit)}
          err={errors}
          errorMessage={errorMessage}
          genderList={genderList}
          register={register}
          setValue={setValue}
          children={<></>}
        />
      </Grid>
    </Grid>
  );
};
export default CandidateInfo;
