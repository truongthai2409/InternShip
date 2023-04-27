import React, { useEffect } from 'react';
import CustomInput from 'src/components/shared/CustomInput';
import './styles.scss';
import './responsive.scss';
import SelectCustom from 'src/components/shared/Select';

export default function NewHR({ errors, register }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className='register-hr-user'>
        <div className='resister-hr-account-info'>
          <div className='register-text'>ĐĂNG KÝ TÀI KHOẢN NHÀ TUYỂN DỤNG</div>
          <div className='accounthr-info'>Thông tin tài khoản</div>
          <div className='register-hr-email'>
            <CustomInput
              id='email'
              type='email'
              label='Email'
              placeholder='Nhập mật Email đăng ký'
              subtitle='Sử dụng email có thật để xác thực'
              register={register}
            >
              {errors.email?.message}
            </CustomInput>
          </div>
          <div className='register-hr-password'>
            <div className='register-password'>
              <CustomInput
                id='password'
                type='password'
                label='Mật khẩu'
                placeholder='Mật khẩu'
                visibility={true}
                register={register}
                subtitle='6 - 32 ký tự, chứa ít nhất một ký tự và một số'
              >
                {errors.password?.message}
              </CustomInput>
            </div>
            <div className='register-cfpassword'>
              <CustomInput
                id='confirmPassword'
                type='password'
                label='Xác nhận mật khẩu'
                placeholder='Xác nhận mật khẩu'
                visibility={true}
                register={register}
                subtitle='Xác nhận mật khẩu phải trùng với mật khẩu vừa nhập '
              >
                {errors.confirmPassword?.message}
              </CustomInput>
            </div>
          </div>
        </div>
        <div className='hr-user-info'>
          <div className='hr-user-info-text'>Thông tin liên hệ</div>
          <div className='hr-user-info-name'>
            <div className='hr-user-info-name-first'>
              <CustomInput
                id='firstName'
                type='text'
                label='Họ và tên lót'
                placeholder='Họ và tên lót'
                register={register}
                subtitle='Nhập họ và tên lót'
              >
                {errors.firstName?.message}
              </CustomInput>
            </div>
            <div className='hr-user-info-name-last'>
              <CustomInput
                id='lastName'
                type='text'
                label='Tên'
                placeholder='Tên'
                register={register}
                subtitle='Nhập Tên'
              >
                {errors.lastName?.message}
              </CustomInput>
            </div>
          </div>
          <div className='hr-user-info-individual'>
            <div className='hr-user-info-individual-phone'>
              <CustomInput
                id='phone'
                type='phone'
                label='Số điện thoại'
                placeholder='Số điện thoại'
                register={register}
                subtitle='Có thể bắt đầu với đầu số 03, 05, 07, 08, 09, 84, +84'
              >
                {errors.phone?.message}
              </CustomInput>
            </div>
            <div className='hr-user-info-individual-gender'>
              <SelectCustom
                id='gender'
                label='Nữ/Nam'
                placeholder='Chọn nữ/nam'
                register={register}
                requirementField={false}
                options={[
                  {
                    id: 1,
                    name: 'Nữ',
                  },
                  {
                    id: 0,
                    name: 'Nam',
                  },
                ]}
              >
                {errors.gender?.message}
              </SelectCustom>
            </div>
          </div>

          <CustomInput
            id='position'
            type='text'
            label='Chức vụ'
            placeholder='Chức vụ'
            register={register}
            subtitle='Nhập Chức vụ'
          >
            {errors.position?.message}
          </CustomInput>
        </div>
      </div>
    </>
  );
}
