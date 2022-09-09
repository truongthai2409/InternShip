import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { } from 'src/components/CustomInput/components'
import InputFile from 'src/components/InputFile'
import { errorSelector } from 'src/store/selectors/main/registerSelectors'
import { registerCandidate } from 'src/store/slices/main/register/registerSlice'
import { TabTitle } from 'src/utils/GeneralFunctions'
import { genderList, schema } from 'src/utils/yupValidate'
import SelectCustom from '../../../../components/Select'
import { getMajorList } from '../../../../store/slices/Admin/major/majorSlice'
import Container from '../../Container/Container'
import './styles.scss'
const CandidateInfo = () => {

  TabTitle("Đăng ký - Ứng viên");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { majorList } = useSelector((state) => state.major);
  const errorMessage = useSelector(errorSelector);
  const handleBackClick = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getMajorList([1, 20]));
  }, [dispatch]);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    const userData = {
      fileCV: data.cv[0] || null,
      fileAvatar: data.avatar[0] || null,
      candidate: JSON.stringify({
        createUser: {
          username: data.username,
          password: data.password,
          confirmPassword: data.confirmPassword,
          gender: parseInt(data.gender),
          lastName: data.lastname,
          firstName: data.firstname,
          phone: data.phone,
          email: data.email,
        },
        major: {
          id: parseInt(data.major),
        },
      }),
    };

    try {
      const res = await dispatch(registerCandidate(userData));
      if (res.payload.status === 200) {
        toast.success("Đăng ký tài khoản thành công");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Container
      title="Ứng Viên"
      onClick={handleBackClick}
      handleClick={handleSubmit(onSubmit)}
      err={errors}
      setValue={setValue}
      register={register}
      errorMessage={errorMessage}
      genderList={genderList}
    >
      <SelectCustom
        label="Chuyên ngành"
        placeholder="Vui lòng chọn..."
        options={majorList}
        id="major"
        register={register}
      >
        {errors.major?.message}
      </SelectCustom>
      <InputFile
        label="CV"
        requirementField={false}
        id="cv"
        format="pdf"
        setValue={setValue}
        register={register}
      >
        {errors.cv?.message}
      </InputFile>
    </Container>
  );
};
export default CandidateInfo;
