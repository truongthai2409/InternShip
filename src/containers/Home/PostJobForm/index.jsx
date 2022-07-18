import "./styles.scss";
import WorkIcon from "@mui/icons-material/Work";
import CustomInput from "../../../components/CustomInput/index";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomTextarea from "../../../components/CustomTextarea";
import "./styles.scss";
import SwitchButton from "../../../components/SwitchButton";
import Button from "../../../components/Button";
import { schema } from "./handleForm";
import SelectCustom from "../../../components/Select";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMajorList } from "src/store/slices/Admin/major/majorSlice";
import {
  addJob,
  getJobPositionList,
} from "src/store/slices/main/home/job/jobSlice";
import {
  getDistrictList,
  getProvinceList,
} from "src/store/slices/location/locationSlice";
import { useNavigate } from "react-router-dom";



const PostJobForm = (props) => {
  const { majorList } = useSelector((state) => state.major);
  const { provinceList, districtList } = useSelector((state) => state.location);
  const { jobPosition, status } = useSelector((state) => state.job);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userPresent = JSON.parse(localStorage.getItem("userPresent"));

  useEffect(() => {
    dispatch(getMajorList());
    dispatch(getProvinceList());
    dispatch(getJobPositionList());
  }, []);

  const jobTypeList = [
    {
      id: 1,
      name: "Full time",
    },
    {
      id: 2,
      name: "Part time",
    },
    {
      id: 3,
      name: "Remote",
    },
  ];

  const countryList = [
    {
      id: 84,
      name: "Việt Nam",
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const jobData = {
      name: data.name,
      hr: {
        id: userPresent.idUser,
      },
      desciption: data.jobDescription,
      major: {
        id: parseInt(data.major),
      },
      jobType: {
        id: parseInt(data.jobType),
      },
      amount: parseInt(data.amount),
      salaryMin: data.salaryMin,
      salaryMax: data.salaryMax,
      requirement: data.jobRequirement,
      otherInfo: data.benefits,
      timeStartStr: data.timeStart,
      timeEndStr: data.timeEnd,
      jobposition: {
        id: data.jobPosition
      },
      locationjob: {
        district: {
          id: data.district,
        },
        address: data.address,
        note: "Không có",
      },
    };
    dispatch(addJob(jobData));
  };

  if (status === "success") {
    navigate("/hr/post/list");
  }

  return (
    <>
      <form
        className="postJob-form"
        autoComplete="off"
        encType="multipart/form-data"
      >
        <div className="hr-post__container">
          <div className="form__container">
            <div className="hr-post__form">
              <div className="hr-post__heading">
                <WorkIcon style={{ margin: "5px 5px 0 0" }} />
                <h2>Mô tả công việc</h2>
              </div>
              <p className="title-requirement">(<span className="field-requirment"> * </span>)Trường bắt buộc</p>
              <div className="hr-post-title">
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
                <div className="hr-post__select">
                  <SelectCustom
                    id="jobType"
                    label="Hình thức làm việc"
                    placeholder="Vui lòng chọn"
                    options={jobTypeList}
                    register={register}
                  >
                    {errors.jobType?.message}
                  </SelectCustom>
                </div>
                <div className="hr-post__select">
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
                <div className="hr-post__select">
                  <SelectCustom
                    id="jobPosition"
                    label="Vị trí"
                    placeholder="Vui lòng chọn"
                    options={jobPosition}
                    register={register}
                  >
                    {errors.jobPosition?.message}
                  </SelectCustom>
                </div>
                <CustomInput
                  label="Số lượng cần tuyển"
                  id="amount"
                  type="number"
                  placeholder="Nhập số lượng"
                  register={register}
                >
                  {errors.amount?.message}
                </CustomInput>
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
              <div className={"row-3-col"}>
                <div className={"hr-post__select-location"}>
                  <SelectCustom
                    id="country"
                    label="Quốc gia"
                    placeholder="Vui lòng chọn"
                    options={countryList}
                    register={register}
                  >
                    {errors.country?.message}
                  </SelectCustom>
                </div>
                <div className={"hr-post__select-location"}>
                  <SelectCustom
                    id="province"
                    label="Tỉnh/Thành phố"
                    placeholder="Vui lòng chọn"
                    dispatch={dispatch}
                    action={getDistrictList}
                    options={provinceList}
                    register={register}
                  >
                    {errors.province?.message}
                  </SelectCustom>
                </div>
                <div className={"hr-post__select-location"}>
                  <SelectCustom
                    id="district"
                    label="Quận/Huyện"
                    placeholder="Vui lòng chọn"
                    options={districtList}
                    register={register}
                  >
                    {errors.district?.message}
                  </SelectCustom>
                </div>
              </div>
              <div className={"hr-post__select"}>
                <CustomInput
                  label="Địa chỉ"
                  id="address"
                  type="text"
                  placeholder="Vd. 254, Dương Đình Hội"
                  register={register}
                >
                  {errors.address?.message}
                </CustomInput>
              </div>
              <div className="hr-post__textarea">
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
              <div className="hr-post__textarea">
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
              <div className="hr-post__textarea">
                <CustomTextarea
                  label="Quyền lợi của ứng viên"
                  id="benefits"
                  type="desciption"
                  placeholder="Nhập quyền lợi của ứng viên"
                  register={register}
                  check={false}
                >
                  {errors.benefits?.message}
                </CustomTextarea>
              </div>
              <div className="hr-post__salary">
                <label htmlFor="">Trợ cấp<span className="field-requirment">*</span></label>
                <div className="hr-post__salary-range">
                  <CustomInput
                    id="salaryMin"
                    type="number"
                    placeholder="Nhập số tiền tối thiểu"
                    register={register}
                    requirementField={false}
                  >
                    {errors.salaryMin?.message}
                  </CustomInput>
                  <CustomInput
                    id="salaryMax"
                    type="number"
                    placeholder="Nhập số tiền tối đa"
                    register={register}
                    requirementField={false}
                  >
                    {errors.salaryMax?.message}
                  </CustomInput>
                </div>
                <SwitchButton label="Không có trợ cấp" fontSize="13px" />
              </div>
              <div className="hr-post__action">
                <Button onClick={handleSubmit(onSubmit)} name="Đăng tuyển" />
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default PostJobForm;
