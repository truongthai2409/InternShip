import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Button from 'src/components/shared/Button';
import CustomInput from 'src/components/shared/CustomInput';
import InputFile from 'src/components/shared/InputFile';

const FormModal = ({setOpen}) => {
  const { user } = useSelector((state) => state.profile);
  const {
    register,
    handleSubmit,
    // formState: { errors },
    setValue
  } = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    },
  });

  const onSubmit = (data) => {
    // e.prevenDefault();
  };
  const handleClose = (e)=>{
    e.preventDefault()
    setOpen(false)
  }
  return (
    <>
      <form className='formApply__modal'>
        <div className='formApply__modal__input'>
          <div>
            <CustomInput
              label='Tên'
              id='firstName'
              type='text'
              name='firstName'
              placeholder='Tên của bạn...'
              register={register}
              height='40px'
              width='310px'
              // check = {true}
            ></CustomInput>

            <CustomInput
              label='Email'
              id='email'
              type='email'
              name='email'
              placeholder='Email của bạn'
              register={register}
              height='40px'
              width='310px'
            >
              {/* {errors.confirmPassword?.message} */}
            </CustomInput>
          </div>

          <div>
            <CustomInput
              label='Họ và tên lót'
              id='lastName'
              type='text'
              name='lastName'
              placeholder='Họ và tên lót của bạn... '
              register={register}
              height='40px'
              width='310px'
            >
              {/* {errors.confirmPassword?.message} */}
            </CustomInput>
            <CustomInput
              label='Số điện thoại'
              id='phone'
              type='phone'
              name='phone'
              placeholder='Vui lòng nhập số điện thoại của bạn ...'
              register={register}
              height='40px'
              width='310px'
            >
              {/* {errors.confirmPassword?.message} */}
            </CustomInput>
          </div>
        </div>
        <div>
          <InputFile
            label='CV'
            requirementField={true}
            id='cv'
            format='pdf'
            register={register}
          ></InputFile>
        </div>

        <CustomInput
          label='Thư giới thiệu'
          id='letter'
          type='text'
          name='letter'
          placeholder='Thư giới thiệu..'
          register={register}
          requirementField={false}
          //   width='310px'
        ></CustomInput>

        <div className='formApply__modal__btn'>
          <Button
            name={'Nộp hồ sơ'}
            bwidth='140px'
            bheight='45px'
            bg='#00B074'
            fz='13px'
          ></Button>
          <Button
            name={'Đóng lại'}
            bwidth='140px'
            bheight='45px'
            bg='white'
            color='#7D7D7D'
            fz='13px'
            onClick={(e)=>handleClose(e)}
          ></Button>
        </div>
      </form>
    </>
  );
};

export default FormModal;
