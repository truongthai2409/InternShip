import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCompanyList } from 'src/store/slices/Admin/company/companySlice';
import { TabTitle } from 'src/utils/GeneralFunctions';
import { genderList, schema } from './data';
import CustomInput from '../../../components/shared/CustomInput';
import SelectCustom from '../../../components/shared/Select';
import { registerHr } from '../../../store/slices/main/register/registerSlice';
import Container from '../Container';
import registerImg from 'src/assets/img/registerHr.png';

import './styles.scss';
import { updateStatusRegisterForHR } from 'src/store/slices/main/register/registerSlice';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import Collap from 'src/components/Collaps/Collap';
import {
  getDistrictList,
  getProvinceList,
} from 'src/store/slices/location/locationSlice';

const countryList = [
  {
    id: 84,
    name: 'Việt Nam',
  },
];
const HRInfo = () => {
  const { t } = useTranslation('title');
  TabTitle(`${t('registerHRTL')}`);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { companyList } = useSelector((state) => state.company);
  const { statusRegister } = useSelector((state) => state.register);
  const errorMessage = useSelector((state) => state.register.error);
  const { districtList, provinceList } = useSelector((state) => state.location);
  const [showForm, setShowForm] = useState('false');

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    dispatch(getCompanyList([1, 20]));
    if (statusRegister === 'successRegister') {
      navigate('/home', { replace: true });
      dispatch(updateStatusRegisterForHR('idleRegister'));
    }
  }, [statusRegister, dispatch, navigate]);
  const handleShowForm = () => {
    setShowForm(!showForm);
  };
  const onSubmit = async (data) => {
    const hrData = {
      hr: JSON.stringify({
        user: {
          username: data.email,
          phone: data.phone,
          // gender: parseInt(data.gender),
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          password: data.password,
          confirmPassword: data.confirmPassword,
        },
        position: data.position,
        company: {
          id: parseInt(data.company),
        },
      }),
      fileAvatar: data.avatar || null,
    };
    dispatch(registerHr({ hrData, navigate }));
  };

  return (
    <Grid container>
      <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
        <div className='register-hr'>
          <p style={{ fontSize: '30px', color: '#fff' }}>
            ĐĂNG KÝ NHÀ TUYỂN DỤNG
          </p>
          <img src={registerImg} className='register-hr__image' />
        </div>
      </Grid>
      <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
        <Container
          title='Nhà Tuyển Dụng'
          handleClick={handleSubmit(onSubmit)}
          err={errors}
          errorMessage={errorMessage}
          register={register}
          setValue={setValue}
          children={
            <>
              {!showForm ? (
                <>
                  <h4 className='register__container__form--title'>
                    Thông tin công ty
                  </h4>
                  <div className='register__container__form--name'>
                    <SelectCustom
                      label='Công ty'
                      placeholder='Vui lòng chọn...'
                      options={companyList}
                      id='company'
                      register={register}
                    >
                      {errors.company?.message}
                    </SelectCustom>
                    <SelectCustom
                      label='Công ty'
                      placeholder='Vui lòng chọn...'
                      options={companyList}
                      id='company'
                      register={register}
                    >
                      {errors.company?.message}
                    </SelectCustom>
                  </div>
                </>
              ) : (
                ''
              )}
              <Collap
                open={showForm}
                handleClick={handleShowForm}
                title='Chưa có công ty của bạn? Đăng kí ngay'
                children={
                  <>
                    <h4 className='register__container__form--title'>
                      Thông tin công ty
                    </h4>
                    <div className='register__container__form--name'>
                      <CustomInput
                        label={t('emailCompany')}
                        id='emailCompany'
                        type='email'
                        placeholder='tuyendung@r2s.com.vn'
                        register={register}
                        subtitle={t('emailCompanySub')}
                      >
                        {errors.email?.message}
                      </CustomInput>
                      <CustomInput
                        className='custom_req_can'
                        label={t('phoneNumCompany')}
                        id='phone'
                        type='phone'
                        register={register}
                        subtitle={t('phoneNumCompanySub')}
                      >
                        {errors.phone?.message}
                      </CustomInput>
                    </div>
                    <div className='register__container__form--name'>
                      <CustomInput
                        label={t('emailCompany')}
                        id='emailCompany'
                        type='email'
                        placeholder='tuyendung@r2s.com.vn'
                        register={register}
                        subtitle={t('emailCompanySub')}
                      >
                        {errors.email?.message}
                      </CustomInput>
                      <CustomInput
                        className='custom_req_can'
                        label={t('phoneNumCompany')}
                        id='phone'
                        type='phone'
                        register={register}
                        subtitle={t('phoneNumCompanySub')}
                      >
                        {errors.phone?.message}
                      </CustomInput>
                    </div>
                    <div className='row-3-col'>
                      <div className={'university-register__select-location'}>
                        <SelectCustom
                          id='country'
                          label='Quốc gia'
                          placeholder='Vui lòng chọn...'
                          options={countryList}
                          register={register}
                          requirementField={false}
                        >
                          {errors.country?.message}
                        </SelectCustom>
                      </div>
                      <div className={'university-register__select-location'}>
                        <SelectCustom
                          id='province'
                          label='Tỉnh/Thành phố'
                          placeholder='Vui lòng chọn...'
                          dispatch={dispatch}
                          action={getDistrictList}
                          options={provinceList}
                          register={register}
                          requirementField={false}
                        >
                          {errors.province?.message}
                        </SelectCustom>
                      </div>
                      <div className={'university-register__select-location'}>
                        <SelectCustom
                          id='district'
                          label='Quận/Huyện'
                          placeholder='Vui lòng chọn...'
                          options={districtList}
                          register={register}
                          requirementField={false}
                        >
                          {errors.district?.message}
                        </SelectCustom>
                      </div>
                    </div>
                    <div className='register__container__form--name'>
                      <CustomInput
                        label='Địa điểm làm việc'
                        id='addressCompany'
                        type='text'
                        placeholder='1164 Phạm Văn Đồng...'
                        register={register}
                        requirementField={false}
                      >
                        {errors.address?.message}
                      </CustomInput>
                    </div>
                  </>
                }
              />
            </>
          }
        />
      </Grid>
    </Grid>
  );
};

export default HRInfo;
