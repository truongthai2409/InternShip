/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CustomInput from 'src/components/shared/CustomInput';
import './styles.scss';
import './responsive.scss';
import CustomSelect from 'src/components/shared/CustomSelect';
import Collap from 'src/components/Collaps/Collap';
import { getAllCompany } from '../../../store/slices/Admin/company/companySlice';
import {
  getProvinceList,
  getDistrictList,
} from '../../../store/slices/location/locationSlice';
import { cloneDeep } from 'lodash';
export default function NewCompanyHR({
  register,
  errors,
  showForm,
  handleShowForm,
  setValue,
  reset,
}) {
  const [countryId, setCountryId] = useState();
  const [provinceId, setProvinceId] = useState();
  const dispatch = useDispatch();
  const companyList = useSelector((state) => state.company.companyList);
  const provinceList = useSelector((state) => state.location.provinceList);
  const districtList = useSelector((state) => state.location.districtList);
  useEffect(() => {
    dispatch(getAllCompany());
  }, []);
  useEffect(() => {
    console.log('featch', countryId);
    dispatch(getProvinceList(countryId));
  }, [countryId]);
  useEffect(() => {
    dispatch(getDistrictList(provinceId));
  }, [provinceId]);
  useEffect(() => {
    reset({
      companyDTOName: '',
      companyDTOTax: '',
    });
  }, [showForm]);
  let taxList = [];
  const getCompanyTax = (companyList) => {
    let cloneCompanyList = cloneDeep(companyList);
    let data;
    cloneCompanyList.forEach((item) => {
      data = {
        id: item.id,
        name: item.tax,
      };
      taxList.push(data);
    });
  };
  const countryList = [
    {
      id: 231,
      name: 'Vietnam',
      areaCode: 'VNM',
    },
  ];
  getCompanyTax(companyList);
  const handleSetValue = (item) => {
    setValue('companyDTOTax', item);
    setValue('companyDTOName', item);
  };
  const handleSetCountryId = (item) => {
    setCountryId(item);
    console.log(item);
  };
  const handleSetProvinceId = (item) => {
    setProvinceId(item);
    console.log(item);
  };
  return (
    <>
      {!showForm && (
        <div className='companyDTO-info'>
          <div className='companyDTO-info-name'>
            <CustomSelect
              id='companyDTOName'
              label='Tên công ty'
              placeholder='Tên công ty'
              handleOnChange={handleSetValue}
              options={companyList}
              register={register}
              subtitle='Nhập tên công ty theo giấy phép đăng ký'
            >
              {errors.companyDTOName?.message}
            </CustomSelect>
          </div>
          <div className='companyDTO-info-tax'>
            <CustomSelect
              id='companyDTOTax'
              label='Mã số thuế'
              placeholder='Mã số thuế'
              handleOnChange={handleSetValue}
              options={taxList}
              register={register}
              subtitle='Nhập tên công ty theo giấy phép đăng ký'
            >
              {errors.companyDTOTax?.message}
            </CustomSelect>
          </div>
        </div>
      )}
      <Collap
        open={showForm}
        handleClick={handleShowForm}
        title='Chưa có công ty của bạn? Đăng kí ngay'
        children={
          <>
            <div className='name-and-tax-companyhr'>
              <div className='name-and-tax-companyhr-name'>
                <CustomInput
                  id='companyDTONameNew'
                  type='text'
                  label='Tên công ty'
                  placeholder='Nhập tên công ty'
                  register={register}
                  subtitle='Nhập tên công ty'
                >
                  {errors.companyDTONameNew?.message}
                </CustomInput>
              </div>
              <div className='name-and-tax-companyhr-tax'>
                <CustomInput
                  id='companyDTOTaxNew'
                  type='text'
                  label='Mã số thuế công ty'
                  placeholder='Nhập mã số thuế công ty'
                  register={register}
                  subtitle='Nhập mã số thuế công ty'
                >
                  {errors.companyDTOTaxNew?.message}
                </CustomInput>
              </div>
            </div>
            <div className='email-and-number-phone-companyhr'>
              <div className='email-and-number-phone-companyhr-email'>
                <CustomInput
                  id='companyDTOEmail'
                  type='email'
                  label='Nhập email công ty'
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
                <CustomSelect
                  id='country'
                  label='Chọn Nước'
                  register={register}
                  placeholder='Chọn Quốc Gia'
                  requirementField={false}
                  options={countryList}
                  subtitle='Chọn quốc gia'
                  handleOnChange={handleSetCountryId}
                ></CustomSelect>
              </div>
              <div className='location-companyhr-province'>
                <CustomSelect
                  id='province'
                  label='Chọn Tỉnh'
                  register={register}
                  placeholder='Chọn Tỉnh'
                  subtitle='Chọn tỉnh/ thành phố'
                  requirementField={false}
                  options={provinceList}
                  handleOnChange={handleSetProvinceId}
                ></CustomSelect>
              </div>
              <div className='location-companyhr-district'>
                <CustomSelect
                  id='district'
                  label='Chọn Quận/Huyện'
                  placeholder='Chọn Quận/Huyện'
                  requirementField={false}
                  register={register}
                  options={districtList}
                  subtitle='Chọn quận/ huyện'
                ></CustomSelect>
              </div>
            </div>
            <CustomInput
              id='companyDTOAddress'
              type='text'
              label='Địa chỉ công ty'
              requirementField={false}
              placeholder='Nhập địa chỉ công ty'
              register={register}
              subtitle='Nhập địa chỉ công ty'
            ></CustomInput>
          </>
        }
      />
    </>
  );
}
