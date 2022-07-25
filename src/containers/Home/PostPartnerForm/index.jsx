import './styles.scss'
import WorkIcon from '@mui/icons-material/Work'
import CustomInput from '../../../components/CustomInput/index'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomTextarea from '../../../components/CustomTextarea'
import './styles.scss'
import Button from '../../../components/Button'
import { schema } from './handleForm'
import SelectCustom from '../../../components/Select'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getMajorList } from 'src/store/slices/Admin/major/majorSlice'
import { getJobPositionList } from 'src/store/slices/main/home/job/jobSlice'
import { getProvinceList } from 'src/store/slices/location/locationSlice'
import { useNavigate } from 'react-router-dom'
import { addDemand } from 'src/store/slices/Admin/demand/demandSlice'

const PostPartnerForm = props => {
  const { majorList } = useSelector(state => state.major)
  const { jobPosition, status } = useSelector(state => state.job)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const userPresent = JSON.parse(localStorage.getItem("userPresent"));

  useEffect(() => {
    dispatch(getMajorList())
    dispatch(getProvinceList())
    dispatch(getJobPositionList())
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    const jobData = {
      demand: JSON.stringify({
        name: data.name,
        description: data.jobDescription,
        requirement: data.jobRequirement,
        ortherInfo: data.otherInfo,
        startStr: data.timeStart,
        endStr: data.timeEnd,
        partner: {
          id: 1
        },
        major: {
          id: parseInt(data.major)
        },
        position: {
          id: parseInt(data.jobPosition)
        }
      }),
      fileSV: data.fileSV[0]
    }

    dispatch(addDemand(jobData))
  }

  if (status === 'success') {
    navigate('/partner/post/list')
  }

  return (
    <>
      <form
        className="postJob-form"
        autoComplete="off"
        encType="multipart/form-data"
      >
        <div className="partner-post__container">
          <div className="form__container">
            <div className="partner-post__form">
              <div className="partner-post__heading">
                <WorkIcon style={{ margin: '5px 5px 0 0' }} />
                <h2>Bản tin ứng tuyển</h2>
              </div>
              <p className="title-requirement">
                (<span className="field-requirment"> * </span>)Trường bắt buộc
              </p>
              <div className="partner-post-title">
                <CustomInput
                  label="Tên công việc"
                  id="name"
                  type="text"
                  placeholder="Vd. Thực tập thiết kế UI-UX"
                  register={register}
                >
                  {errors.name?.message}
                </CustomInput>
              </div>
              <div className="row-2-col">
                <div className="partner-post__select">
                  <SelectCustom
                    id="jobPosition"
                    label="Vị trí công việc"
                    placeholder="Vui lòng chọn"
                    options={jobPosition}
                    register={register}
                  >
                    {errors.jobPosition?.message}
                  </SelectCustom>
                </div>
                <div className="partner-post__select">
                  <SelectCustom
                    id="major"
                    label="Chuyên ngành"
                    placeholder="Vui lòng chọn"
                    options={majorList}
                    register={register}
                  >
                    {errors.major?.message}
                  </SelectCustom>
                </div>
              </div>
              <div className="row-2-col">
                <CustomInput
                  label="Ngày bắt đầu tuyển"
                  id="timeStart"
                  type="date"
                  placeholder=""
                  register={register}
                >
                  {errors.timeStart?.message}
                </CustomInput>
                <CustomInput
                  label="Ngày hết hạn tuyển"
                  id="timeEnd"
                  type="date"
                  placeholder=""
                  register={register}
                >
                  {errors.timeEnd?.message}
                </CustomInput>
              </div>
              <div className="partner-post__textarea">
                <CustomTextarea
                  label="Mô tả công việc"
                  id="jobDescription"
                  type="description"
                  placeholder="Nhập mô tả công việc"
                  register={register}
                >
                  {errors.jobDescription?.message}
                </CustomTextarea>
              </div>
              <div className="partner-post__textarea">
                <CustomTextarea
                  label="Yêu cầu công việc"
                  id="jobRequirement"
                  type="description"
                  placeholder="Nhập yêu cầu công việc"
                  register={register}
                  check={false}
                >
                  {errors.jobRequirement?.message}
                </CustomTextarea>
              </div>
              <div className="partner-post__textarea">
                <CustomTextarea
                  label="Thông tin khác"
                  id="otherInfo"
                  type="desciption"
                  placeholder="Thông tin khác"
                  register={register}
                  check={false}
                >
                  {errors.otherInfo?.message}
                </CustomTextarea>
              </div>
              <CustomInput
                label="Danh sách sinh viên"
                id="fileSV"
                type="file"
                placeholder=""
                register={register}
              >
                {errors.fileSV?.message}
              </CustomInput>
              <div className="partner-post__action">
                <Button onClick={handleSubmit(onSubmit)} name="Đăng tuyển" />
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default PostPartnerForm
