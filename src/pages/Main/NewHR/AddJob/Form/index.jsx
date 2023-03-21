import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FilterSelect from 'src/components/HR/FilterSelect';
import CustomInput from 'src/components/shared/CustomInput';
import Textarea from 'src/components/shared/Textarea';

const HrForm = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
    setValue,
  } = useForm();
  //   {
  //     defaultValues: {
  //       firstName: user.firstName,
  //       lastName: user.lastName,
  //       email: user.email,
  //       phone: user.phone,
  //     },
  //   }
  const onSubmit = (data) => {};

  const [countryId, setCountryId] = useState(null);
  const country_list = [
    { id: 1, name: 'VN' },
    { id: 2, name: 'USA' },
  ];
  let provice_list =
    countryId == 1
      ? [
          { id: 1, name: 'HCM' },
          { id: 2, name: 'HN' },
        ]
      : countryId == 2
      ? [
          { id: 3, name: 'LOS' },
          { id: 4, name: 'CALI' },
        ]
      : [];

  const handleSetCountryId = (countryId) => {
    setCountryId(countryId);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <CustomInput
            label='Tiêu đề công việc'
            id='firstName'
            type='text'
            name='firstName'
            placeholder='Tên của bạn...'
            register={register}
            height='40px'
            width='100%'
          ></CustomInput>
          <div style={{ display: 'flex', gap: '6%' }}>
            <CustomInput
              label='Vị trí làm việc'
              id='firstName'
              type='text'
              name='firstName'
              placeholder='Tên của bạn...'
              register={register}
              height='40px'
              width='47%'
            ></CustomInput>
            <CustomInput
              label='Chuyên ngành'
              id='firstName'
              type='text'
              name='firstName'
              placeholder='Tên của bạn...'
              register={register}
              height='40px'
              width='47%'
            ></CustomInput>
          </div>
          <div style={{ display: 'flex', gap: '6%' }}>
            <CustomInput
              label='Ngày đăng tuyển'
              id='firstName'
              type='text'
              name='firstName'
              placeholder='Tên của bạn...'
              register={register}
              height='40px'
              width='47%'
            ></CustomInput>
            <CustomInput
              label='Hạn nộp hồ sơ'
              id='firstName'
              type='text'
              name='firstName'
              placeholder='Tên của bạn...'
              register={register}
              height='40px'
              width='47%'
            ></CustomInput>
          </div>
          <div style={{ display: 'flex', gap: '6%' }}>
            <CustomInput
              label='Trợ cấp tối thiểu'
              id='firstName'
              type='text'
              name='firstName'
              placeholder='Tên của bạn...'
              register={register}
              height='40px'
              width='47%'
            ></CustomInput>
            <CustomInput
              label='Trợ cấp tối đa'
              id='firstName'
              type='text'
              name='firstName'
              placeholder='Tên của bạn...'
              register={register}
              height='40px'
              width='47%'
            ></CustomInput>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <FilterSelect
              list={country_list}
              label={'Country'}
              handleSetCountryId={handleSetCountryId}
            />

            <FilterSelect list={provice_list} label={'Provice'} />
            <FilterSelect list={provice_list} label={'Provice'} />
          </div>

          <CustomInput
            label='Địa điểm làm việc'
            id='firstName'
            type='text'
            name='firstName'
            placeholder='Tên của bạn...'
            register={register}
            height='40px'
            width='100%'
          ></CustomInput>

          <Textarea
            label='Mô tả công việc'
            id='benefits'
            placeholder='Nhập thông tin cho vị trí công việc yêu cầu, trách nhiệm mà ứng viên có thể đảm nhận khi làm ở công ty.'
            register={register}
            setValue={setValue}
            check={false}
            subtitle={'(Tối đa 1500 ký tự)'}
          ></Textarea>

          <Textarea
            label='Yêu cầu công việc'
            id='benefits'
            placeholder='Nhập thông tin cho vị trí công việc yêu cầu, trách nhiệm mà ứng viên có thể đảm nhận khi làm ở công ty.'
            register={register}
            setValue={setValue}
            check={false}
            subtitle={'(Tối đa 1500 ký tự)'}
          ></Textarea>

          <Textarea
            label='Chế độ phúc lợi '
            id='benefits'
            placeholder='Nhập thông tin cho vị trí công việc yêu cầu, trách nhiệm mà ứng viên có thể đảm nhận khi làm ở công ty.'
            register={register}
            setValue={setValue}
            check={false}
            subtitle={'(Tối đa 1500 ký tự)'}
          ></Textarea>
        </div>
      </form>
    </>
  );
};

export default HrForm;
