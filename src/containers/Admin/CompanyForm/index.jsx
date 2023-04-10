import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Grid, Switch } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import './styles.scss';
import CustomInput from '../../../components/shared/CustomInput';
import CustomTextarea from '../../../components/shared/CustomTextarea';
import CustomSelect from '../../../components/shared/CustomSelect';
import Button from '../../../components/shared/Button';
import cameraLogo from '../../../assets/img/camera.png';
import { schema, renderControlAction } from './script.js';
import {
  addCompanyByAdmin,
  getCompanyDetail,
  updateCompanyInfo,
} from '../../../store/slices/Admin/company/companySlice';
import {
  getProvinceList,
  getDistrictList,
} from '../../../store/slices/location/locationSlice';
import CustomSelectLocation from 'src/components/shared/CustomSelectLocation';

const label = { inputProps: { 'aria-label': 'Switch demo' } };
const baseURL = process.env.REACT_APP_API;

export default function CompanyForm(props) {
  const { isAdd } = props;

  const { companyDetail, error } = useSelector((state) => state.company);
  const { provinceList, districtList } = useSelector((state) => state.location);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // local state
  const [image, setImage] = useState(cameraLogo);
  const [imageFile, setImageFile] = useState(null);
  const [isEdit, setIsEdit] = useState(isAdd);

  // const fileInput = useRef()
  const dispatch = useDispatch();

  // get company ID params from URL
  const { comid } = useParams();

  useEffect(() => {
    dispatch(getProvinceList());
  }, [dispatch]);

  useEffect(() => {
    if (!isAdd) {
      dispatch(getCompanyDetail(comid));
      // dispatch(getCompanyDetail(1));
    }
  }, [isAdd, dispatch, comid]);

  const getDistrict = (id) => {
    dispatch(getDistrictList(id));
  };
  useEffect(() => {
    if (!isAdd) {
      setImage(`${baseURL}${companyDetail.logo}`);
    }
    setValue('name', isAdd ? '' : companyDetail.name);
    setValue('description', isAdd ? '' : companyDetail.description);
    setValue('website', isAdd ? '' : companyDetail.website);
    setValue('email', isAdd ? '' : companyDetail.email);
    setValue('phone', isAdd ? '' : companyDetail.phone);
    setValue('tax', isAdd ? '' : companyDetail.tax);
    setValue(
      'province',
      isAdd ? '' : companyDetail?.locations?.[0]?.district?.province?.id
    );
    setValue(
      'district',
      isAdd ? '' : companyDetail?.locations?.[0]?.district?.id
    );
    setValue('address', isAdd ? '' : companyDetail?.locations?.[0]?.address);
    setValue('note', isAdd ? '' : companyDetail?.locations?.[0]?.note);
  }, [companyDetail, isAdd, setValue]);

  // show preview image
  const showPreviewImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setImageFile(imageFile);
        setImage(x.target.result);
      };
      reader.readAsDataURL(imageFile);
    }
  };

  // handle Submit form
  const onSubmit = (data) => {
    const companyData = {
      company: JSON.stringify({
        name: data.name,
        description: data.description,
        website: data.website,
        email: data.email,
        phone: data.phone,
        tax: data.tax,
        status: {
          id: 4,
        },
      }),
      fileLogo: data.logo[0],
      location: JSON.stringify({
        district: {
          id: data.district,
        },
        address: data.address,
        note: data.note,
      }),
    };

    if (isAdd) {
      dispatch(addCompanyByAdmin(companyData));
    } else {
      const updateData = {
        companyData: {
          company: JSON.stringify({
            name: data.name,
            description: data.description,
            website: data.website,
            email: data.email,
            phone: data.phone,
            tax: data.tax,
            status: {
              id: 4,
            },
          }),
          fileLogo: data.logo[0],
        },
        setIsEdit,
        comid,
      };
      dispatch(updateCompanyInfo(updateData));
    }
  };

  // Click to Edit
  const handleOnClickEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      // autoComplete="off"
      className='company-form'
    >
      <div className='company-form__container'>
        <Grid container>
          <Grid item md={3}>
            <div className='company-form__logo'>
              <Avatar
                src={image}
                // variant="rounded"
                alt='company-logo'
                className='company-form__avatar'
                // onClick={() => fileInput.current.click()}
              />
              {/* <h3>Company Name</h3> */}
              <input
                id='logo'
                type='file'
                name='logo'
                {...register('logo')}
                onChange={showPreviewImage}
                // ref={fileInput}
              />
              <p className='company-form__error'>{errors.logo?.message}</p>

              {!isAdd ? (
                <div className='company-form__control'>
                  <ul>{renderControlAction()}</ul>
                  <div className='company-form__block'>
                    <p>Khóa tài khoản</p>
                    <Switch {...label} defaultChecked />
                  </div>
                  <button
                    type='button'
                    className='company-form__button-edit'
                    onClick={handleOnClickEdit}
                  >
                    Sửa
                  </button>
                </div>
              ) : null}
            </div>
          </Grid>
          <Grid item md={9}>
            <Grid container>
              <Grid item md={6}>
                <div className='company-form__input'>
                  <CustomInput
                    label='Tên công ty'
                    id='name'
                    type='text'
                    placeholder='Tên công ty...'
                    setValue={setValue}
                    register={register}
                    check={!isEdit}
                  >
                    {errors.name?.message}
                    {error?.Name}
                  </CustomInput>
                  <CustomInput
                    label='Email'
                    id='email'
                    type='email'
                    placeholder='email...'
                    setValue={setValue}
                    register={register}
                    check={!isEdit}
                  >
                    {error?.Email}
                    {errors.email?.message}
                  </CustomInput>
                  <CustomInput
                    label='Số điện thoại'
                    id='phone'
                    type='tel'
                    placeholder='Số điện thoại...'
                    setValue={setValue}
                    register={register}
                    check={!isEdit}
                  >
                    {errors.phone?.message}
                  </CustomInput>
                  <CustomInput
                    label='Website'
                    id='website'
                    type='text'
                    placeholder='Website...'
                    setValue={setValue}
                    register={register}
                    check={!isEdit}
                  >
                    {error?.Website}
                    {errors.website?.message}
                  </CustomInput>
                </div>
              </Grid>
              <Grid item md={6}>
                <div className='company-form__input'>
                  <CustomInput
                    label='Mã số thuế'
                    id='tax'
                    type='text'
                    placeholder='Mã số thuế...'
                    setValue={setValue}
                    register={register}
                    check={!isEdit}
                  >
                    {errors.tax?.message}
                  </CustomInput>

                  <CustomSelectLocation
                    id='province'
                    className='user-form__input-item'
                    label='Tỉnh'
                    placeholder='Chọn tỉnh...'
                    options={provinceList}
                    register={register}
                    onChange={(id) => getDistrict(id)}
                  >
                    {errors.province?.message}
                  </CustomSelectLocation>
                  <CustomSelect
                    id='district'
                    className='user-form__input-item'
                    label='Quận/Huyện'
                    placeholder='Chọn quận/huyện...'
                    register={register}
                    options={districtList}
                  >
                    {errors.district?.message}
                  </CustomSelect>
                  <CustomInput
                    label='Địa chỉ'
                    id='address'
                    type='text'
                    placeholder='Địa chỉ...'
                    setValue={setValue}
                    register={register}
                    check={!isEdit}
                  >
                    {errors.address?.message}
                  </CustomInput>
                </div>
              </Grid>
              <Grid container item md={12}>
                <Grid item md={6}>
                  <div className='company-form__input'>
                    <CustomTextarea
                      label='Mô tả công ty'
                      id='description'
                      type='description'
                      placeholder='Mô tả công ty...'
                      register={register}
                      check={!isEdit}
                    >
                      {errors.description?.message}
                    </CustomTextarea>
                  </div>
                </Grid>
                <Grid item md={6}>
                  <div className='company-form__input'>
                    <CustomTextarea
                      label='Note'
                      id='note'
                      type='text'
                      placeholder='Note...'
                      setValue={setValue}
                      register={register}
                      check={!isEdit}
                    >
                      {errors.note?.message}
                    </CustomTextarea>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      {isAdd ? (
        <div className='company-form__submit'>
          <Button name='Thêm công ty' onClick={handleSubmit(onSubmit)} />
        </div>
      ) : null}

      {isEdit & !isAdd ? (
        <div className='company-form__submit'>
          <Button name='Cập nhật' onClick={handleSubmit(onSubmit)} />
        </div>
      ) : null}
    </form>
  );
}
