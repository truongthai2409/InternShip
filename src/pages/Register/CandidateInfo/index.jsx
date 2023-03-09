import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {} from 'src/components/shared/CustomInput/components';
import InputFile from 'src/components/shared/InputFile';
import { registerCandidate } from 'src/store/slices/main/register/registerSlice';
import { TabTitle } from 'src/utils/GeneralFunctions';
import { genderList, schema } from './data';
import SelectCustom from '../../../components/shared/Select';
import { getMajorListThunk } from 'src/store/action/company/companyAction';
import registerImg from 'src/assets/img/register-candidate.png';
import Container from '../Container';
import Grid from '@mui/material/Grid';

import './styles.scss';
import { useTranslation } from 'react-i18next';
const CandidateInfo = () => {
  const { t } = useTranslation('title');
  TabTitle(t('registerCandidateTL'));

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { majorList } = useSelector((state) => state.major);
  const errorMessage = useSelector((state) => state.register.error);

  useEffect(() => {
    dispatch(getMajorListThunk([1, 20]));
  }, [dispatch]);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });
  const handleBackClick = (e) => {
    e.preventDefault();
    navigate(-1, { replace: true });
  };
  console.log(errors, 'error');
  const onSubmit = async (data) => {
    console.log('runnn');
    const userData = {
      fileCV: data.cv || null,
      fileAvatar: data.avatar || null,
      candidate: JSON.stringify({
        createUser: {
          username: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
          // gender: parseInt(data.gender),
          lastName: data.lastName,
          firstName: data.firstName,
          phone: data.phone,
          email: data.email,
        },
        // major: {
        //   id: parseInt(data.major),
        // },
      }),
    };

    dispatch(registerCandidate(userData))
      .then((res) => {
        if (res.payload.status === 200 || res.payload.status === 201) {
          navigate('/login');
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });
  };

  return (
    <Grid container>
      <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
        <div className='register-candidate'>
          <p style={{ fontSize: '30px', color: '#fff' }}>ĐĂNG KÝ ỨNG VIÊN</p>
          <img src={registerImg} />
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
