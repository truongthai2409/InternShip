import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { } from 'src/components/shared/CustomInput/components';
import InputFile from 'src/components/shared/InputFile';
import { registerCandidate } from 'src/store/slices/main/register/registerSlice';
import { TabTitle } from 'src/utils/GeneralFunctions';
import { genderList, schema } from './data';
import SelectCustom from '../../../components/shared/Select';
// import { getMajorList } from "../../../store/slices/Admin/major/majorSlice";
import { getMajorListThunk } from 'src/store/action/company/companyAction';
import Container from '../Container';
import './styles.scss';
import { useTranslation } from 'react-i18next';
const CandidateInfo = () => {
  const { t } = useTranslation('title')
  TabTitle(t("registerCandidateTL"));

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { majorList } = useSelector((state) => state.major);
  const errorMessage = useSelector((state) => state.register.error);

  useEffect(() => {
    dispatch(getMajorListThunk([1, 20]));
  }, [dispatch]);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });
  const handleBackClick = (e) => {
    e.preventDefault();
    navigate(-1, { replace: true });
  };
  const onSubmit = async (data) => {
    const userData = {
      fileCV: data.cv || null,
      fileAvatar: data.avatar || null,
      candidate: JSON.stringify({
        createUser: {
          username: data.username,
          password: data.password,
          confirmPassword: data.confirmPassword,
          gender: parseInt(data.gender),
          lastName: data.lastName,
          firstName: data.firstName,
          phone: data.phone,
          email: data.email,
        },
        major: {
          id: parseInt(data.major),
        },
      }),
    };

    dispatch(registerCandidate(userData))
      .then((res) => {
        if (res.payload.status === 200 || res.payload.status === 201) {
          navigate('/login');
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <Container
      title='Ứng Viên'
      onClick={handleBackClick}
      handleClick={handleSubmit(onSubmit)}
      err={errors}
      errorMessage={errorMessage}
      genderList={genderList}
      register={register}
      setValue={setValue}
      children={
        <>
          <SelectCustom
            label='Chuyên ngành'
            placeholder='Vui lòng chọn...'
            options={majorList}
            id='major'
            register={register}
          >
            {errors.major?.message}
          </SelectCustom>
          <InputFile
            label='CV'
            requirementField={false}
            id='cv'
            format='pdf'
            setValue={setValue}
            register={register}
          >
            {errors.cv?.message}
          </InputFile>
        </>
      }
    />
  );
};
export default CandidateInfo;
