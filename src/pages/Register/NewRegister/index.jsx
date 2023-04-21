import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from 'src/components/shared/Button';
import { useTranslation } from 'react-i18next';
import { TabTitle } from 'src/utils/GeneralFunctions';
import { registerNewHrThunk } from 'src/store/action/authenticate/authenticateAction';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import './styles.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import NewHR from 'src/pages/Register/NewHR';
import NewCompanyHR from 'src/pages/Register/NewCompanyHR';
import { schema } from './validate';
import registerImg from 'src/assets/img/registerHr.png';

export default function NewRegister() {
  const { t } = useTranslation('title');
  TabTitle(`${t('registerHRTL')}`);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(true);

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const onSubmit = async (data) => {
    dispatch(registerNewHrThunk(data)).then((res) => {
      if (res.error) {
        toast.error('Đăng ký không thành công!', {
          position: 'top-right',
          autoClose: 3000,
          theme: 'colored',
        });
      } else {
        toast.success('Đăng ký thành công!', {
          position: 'top-right',
          autoClose: 3000,
          theme: 'colored',
        });
        reset();
      }
    });
  };

  const handleShowForm = () => {
    setShowForm(!showForm);
  };
  return (
    <div className='registerhr-container'>
      {console.log('oke a cong')}
      <div className='registerhr-left-item'>
        <div className='registerhr-text'>ĐĂNG KÝ NHÀ TUYỂN DỤNG</div>
        <img
          src={registerImg}
          alt='rigisterImage'
          className='resgisterhr-image'
        />
      </div>
      <div className='registerhr-right-item'>
        <NewHR errors={errors} register={register} />
        <div className='company-info-text'>Thông tin công ty</div>
        <NewCompanyHR
          errors={errors}
          register={register}
          handleShowForm={handleShowForm}
          showForm={showForm}
        />
        <div className='term-and-policy'>
          <p>
            Bằng việc ấn vào nút “Đăng ký”, tôi đồng ý với{' '}
            <span style={{ color: '#00B074' }}>Thỏa thuận sử dụng </span> và{' '}
            <span style={{ color: '#00B074' }}>Quy định bảo mật </span>
            của Jobsit.vn
          </p>
        </div>
        <div className='bnt-submit-registerhr'>
          <Button
            onClick={handleSubmit(onSubmit)}
            className='bnt-submit-registerhr-item'
          >
            Đăng ký
          </Button>
        </div>
      </div>
    </div>
  );
}
