import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Button from 'src/components/shared/Button';
import CustomInput from 'src/components/shared/CustomInput';
import InputFile from 'src/components/shared/InputFile';
import { applyJobThunk } from 'src/store/action/candidate/candidateAction';
import { getJobApplyListByCandidate } from 'src/store/slices/main/home/job/jobCandidateSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema';

const FormModal = ({ setOpen, jobId, setIsApply }) => {
  const { user, others } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });
  console.log(errors);
  const onSubmit = (data) => {
    const formSubmit = {
      candidateApplication: JSON.stringify({
        jobDTO: { id: jobId },
        // candidate id
        candidateDTO: { id: user.id },
        referenceLetter: data.letter,
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
        <div>
          <InputFile
            label='CV'
            requirementField={true}
            id='cv'
            format='pdf'
            register={register}
            setValue={setValue}
          >
            {errors.cv?.message}
          </InputFile>
        </div>

        <CustomInput
          label='Thư giới thiệu'
          id='letter'
          type='text'
          name='letter'
          placeholder='Thư giới thiệu..'
          register={register}
          requirementField={false}
          width='600px'
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
