import "./styles.scss";
import WorkIcon from "@mui/icons-material/Work";
import CustomInput from "../../../components/CustomInput/index";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomTextarea from "../../../components/CustomTextarea";
import "./styles.scss";
import Button from "../../../components/Button";
import { schema } from "./handleForm";
import SelectCustom from "../../../components/Select";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getMajorList } from "src/store/slices/Admin/major/majorSlice";
import { getJobPositionList } from "src/store/slices/main/home/job/jobSlice";
import { useNavigate } from "react-router-dom";
import { addDemand } from "src/store/slices/main/home/demand/demandSlice";
import { format } from "date-fns";
import DescriptionForm from "src/components/DescriptionForm";
import { getPartnerByUserID } from "src/store/slices/Admin/university/unversitySlice";

const PostPartnerForm = (props) => {
  const { majorList } = useSelector((state) => state.major);
  const { jobPosition } = useSelector((state) => state.job);
  const { status } = useSelector((state) => state.demand);
  const { activeUser } = useSelector((state) => state.university);
  const [openForm, setOpenForm] = useState(false);

  console.log(status);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const idUser = JSON.parse(localStorage.getItem("userPresent")).idUser;

  useEffect(() => {
    dispatch(getMajorList());
    dispatch(getJobPositionList());
    dispatch(getPartnerByUserID(idUser));
  }, [idUser]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleToggle = () => {
    setOpenForm(!openForm);
  };

  const onSubmit = (data) => {
    const jobData = {
      demand: JSON.stringify({
        name: data.name,
        description: data.jobDescription,
        requirement: data.jobRequirement,
        ortherInfo: data.otherInfo,
        startStr: data.timeStart,
        endStr: data.timeEnd,
        partner: {
          id: parseInt(activeUser?.id),
        },
        major: {
          id: parseInt(data.major),
        },
        position: {
          id: parseInt(data.jobPosition),
        },
      }),
      fileSV: data.fileSV[0],
    };

    dispatch(addDemand(jobData));
  };

  if (status === "success") {
    navigate("/partner/post-list");
  }

  return (
    <>
      <div className="partner-post__container">
        <div className="form__container">
          <div className="partner-post__form">
            <div className="partner-post__heading">
              <WorkIcon style={{ margin: "5px 5px 0 0" }} />
              <h2>Đợt thực tập của trường</h2>
            </div>
            <p className="title-requirement">
              (<span className="field-requirment"> * </span>)Trường bắt buộc
            </p>
            <div className="partner-post-title">
              <CustomInput
                label="Chức danh"
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
                min={format(new Date(), "yyyy-MM-dd")}
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
            <div className="partner-post__textarea-description">
              <CustomTextarea
                label="Mô tả"
                id="jobDescription"
                type="description"
                placeholder="Nhập mô tả"
                register={register}
              >
                {errors.jobDescription?.message}
              </CustomTextarea>

              <div className="description-btn-post-partner-container">
                <button
                  className="description-btn-post-partner"
                  onClick={handleToggle}
                >
                  {openForm == false ? "(Xem mô tả mẫu)" : "(Đóng)"}
                </button>
              </div>
              {openForm && (
                <>
                  <DescriptionForm />
                </>
              )}
            </div>
            <div className="partner-post__textarea">
              <CustomTextarea
                label="Yêu cầu"
                id="jobRequirement"
                type="description"
                placeholder="Nhập yêu cầu"
                register={register}
                check={false}
              >
                {errors.jobRequirement?.message}
              </CustomTextarea>
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
            </div>
            <div className="partner-post__textarea">
              <CustomInput
                label="Danh sách sinh viên"
                id="fileSV"
                type="file"
                placeholder=""
                register={register}
              >
                {errors.fileSV?.message}
              </CustomInput>
            </div>
            <div className="partner-post__action">
              <Button onClick={handleSubmit(onSubmit)} name="Đăng tuyển" />
            </div>
          </div>
        </div>
      </div>

      <div className="description-btn-post-partner-container">
        <button className="description-btn-post-partner" onClick={handleToggle}>
          {openForm == false ? "(Xem mô tả mẫu)" : "(Đóng)"}
        </button>
      </div>
    </>
  );
};

export default PostPartnerForm;
