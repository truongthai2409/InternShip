import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Button from 'src/components/shared/Button';
import CustomInput from 'src/components/shared/CustomInput';
import InputFile from 'src/components/shared/InputFile';
import { applyJobThunk } from 'src/store/action/candidate/candidateAction';
import { getJobApplyListByCandidate } from 'src/store/slices/main/home/job/jobCandidateSlice';

const FormModal = ({ setOpen, jobId, setIsApply }) => {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    // formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    },
  });

  const onSubmit = (data) => {
    const formSubmit = {
      candidateApplication: JSON.stringify({
        jobDTO: { id: jobId },
        // candidate id
        candidateDTO: { id: user.id },
        referenceLetter: data.letter,
        email: data.email,
        phone: data.phone,
        fullName: data.firstName + ' ' + data.lastName,
      }),
      fileCV: data.cv,
    };

    dispatch(applyJobThunk(formSubmit)).then((res) => {
      setIsApply(true);
      toast.success('Nộp CV thành công', {
        position: 'top-right',
        autoClose: 3000,
        style: { color: '#00B074', backgroundColor: '#DEF2ED' },
      });
      setOpen(false);
      const userStorage =
        JSON.parse(sessionStorage.getItem('userPresent')) ||
        JSON.parse(localStorage.getItem('userPresent'));

      const page = {
        user: user,
        token: userStorage?.token,
        page: {
          no: 0,
          limit: 200,
        },
      };

      dispatch(getJobApplyListByCandidate(page));
    });
  };
  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };
  return (
    <>
      <form
        className='formApply__modal'
        onSubmit={handleSubmit(onSubmit)}
        encType='multipart/form-data'
      >
        {/* <div className='formApply__modal__input'>
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
              {errors.confirmPassword?.message}
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
              {errors.confirmPassword?.message}
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
              {errors.confirmPassword?.message}
            </CustomInput>
          </div>
        </div> */}
        <div>
          <InputFile
            label='CV'
            requirementField={true}
            id='cv'
            format='pdf'
            register={register}
            setValue={setValue}
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
          width='650px'
          height='150px'
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
            onClick={(e) => handleClose(e)}
          ></Button>
        </div>
      </form>
    </>
  );
};

export default FormModal;
