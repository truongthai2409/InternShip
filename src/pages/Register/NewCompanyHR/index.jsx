import React from 'react';
import CustomInput from 'src/components/shared/CustomInput';
import './styles.scss';
import SelectCustom from 'src/components/shared/Select';
import Collap from 'src/components/Collaps/Collap';

export default function NewCompanyHR({
  register,
  errors,
  showForm,
  handleShowForm,
}) {
  return (
    <>
      <Collap
        open={showForm}
        handleClick={handleShowForm}
        title='Chưa có công ty của bạn? Đăng kí ngay'
        children={
          <>
            <div className='name-and-tax-companyhr'>
              <div className='name-and-tax-companyhr-name'>
                <CustomInput
                  id='companyDTOName'
                  type='text'
                  defaultValue='Công ty R2S'
                  label='Tên công ty'
                  placeholder='Nhập tên công ty'
                  register={register}
                  subtitle='Nhập tên công ty'
                >
                  {errors.companyDTOName?.message}
                </CustomInput>
              </div>
              <div className='name-and-tax-companyhr-tax'>
                <CustomInput
                  id='companyDTOTax'
                  type='text'
                  label='Mã số thuế công ty'
                  defaultValue='0315827097'
                  placeholder='Nhập mã số thuế công ty'
                  register={register}
                  subtitle='Nhập mã số thuế công ty'
                >
                  {errors.companyDTOTax?.message}
                </CustomInput>
              </div>
            </div>
            <div className='email-and-number-phone-companyhr'>
              <div className='email-and-number-phone-companyhr-email'>
                <CustomInput
                  id='companyDTOEmail'
                  type='email'
                  label='Nhập email công ty'
                  defaultValue='tuyendung@r2s.com.vn'
                  placeholder='Nhập email công ty'
                  register={register}
                  subtitle='Nhập email công ty'
                >
                  {errors.companyDTOEmail?.message}
                </CustomInput>
              </div>
              <div className='email-and-number-phone-companyhr-phone'>
                <CustomInput
                  id='companyDTOPhone'
                  type='text'
                  label='Số điện thoại công ty'
                  defaultValue='0855881889'
                  placeholder='Nhập số điện thoại công ty'
                  register={register}
                  subtitle='Nhập Số điện thoại công ty'
                >
                  {errors.companyDTOPhone?.message}
                </CustomInput>
              </div>
            </div>
            <div className='location-companyhr'>
              <div className='location-companyhr-country'>
                <SelectCustom
                  id='country'
                  label='Chọn Nước'
                  register={register}
                  placeholder='Chọn Quốc Gia'
                  requirementField={false}
                  options={[]}
                >
                  {/* {errors.country?.message} */}
                </SelectCustom>
              </div>
              <div className='location-companyhr-province'>
                <SelectCustom
                  id='province'
                  label='Chọn Tỉnh'
                  register={register}
                  placeholder='Chọn Tỉnh'
                  requirementField={false}
                  options={[]}
                ></SelectCustom>
              </div>
              <div className='location-companyhr-district'>
                <SelectCustom
                  id='district'
                  label='Chọn Quận/Huyện'
                  placeholder='Chọn Quận/Huyện'
                  requirementField={false}
                  register={register}
                  options={[]}
                ></SelectCustom>
              </div>
            </div>
            <CustomInput
              id='companyDTOAddress'
              type='text'
              label='Địa chỉ công ty'
              requirementField={false}
              placeholder='Nhập địa chỉ công ty'
              defaultValue='50 Kha Vạn Cân'
              register={register}
              subtitle='Nhập địa chỉ công ty'
            ></CustomInput>
          </>
        }
      />
    </>
  );
}
