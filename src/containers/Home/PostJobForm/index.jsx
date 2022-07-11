import "./styles.scss";
import WorkIcon from "@mui/icons-material/Work";
import CustomInput from "../../../components/CustomInput/index";
import CustomSelect from "../../../components/CustomSelect";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomTextarea from "../../../components/CustomTextarea";
import "./styles.scss";
import SwitchButton from "../../../components/SwitchButton";
import Button from "../../../components/Button";
import { schema } from "./handleForm";

const PostJobForm = (props) => {
    const majorOptions = [
        {
            id: 1,
            name: "Front-end",
        },
        {
            id: 2,
            name: "Back-end",
        },
    ];

    const locationJobOptions = [
        {
            id: 1,
            name: "HCM",
        },
        {
            id: 2,
            name: "HN",
        },
        {
            id: 3,
            name: "ĐN",
        },
    ];

    const jobTypeOptions = [
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

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        // const demandData = {};

        console.log(data)
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="demand-form">
                <div className="hr-post__container">
                    <div className="form__container">
                        <div className="hr-post__form">
                            <div className="hr-post__heading">
                                <WorkIcon style={{ margin: "5px 5px 0 0" }} />
                                <h2>Mô tả công việc</h2>
                            </div>
                            <div className="hr-post-title">
                                <CustomInput
                                    label="Chức danh"
                                    id="name"
                                    type="text"
                                    placeholder="Eg. Internship UX Design"
                                    register={register}
                                >
                                    {errors.name?.message}
                                </CustomInput>
                            </div>
                            <div className={"row-3-col"}>
                                <div className={"hr-post__select"}>
                                    <CustomSelect
                                        className="hr-post__select"
                                        id="workingFormat"
                                        name="Hình thức làm việc"
                                        label="Hình thức làm việc"
                                        getDistrictList={() => console.log("districtList")}
                                        selectOptions={jobTypeOptions}
                                    ></CustomSelect>
                                </div>
                                <div className={"hr-post__select"}>
                                    <CustomSelect
                                        className="hr-post__select"
                                        name="Chuyên ngành"
                                        label="Chuyên ngành"
                                        getDistrictList={() => console.log("districtList")}
                                        selectOptions={majorOptions}
                                    />
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
                            <div className={"row-2-col"}>
                                <CustomInput label="Ngày bắt đầu tuyển" id="timeStart" type="date" placeholder="" register={register} />
                                <CustomInput label="Ngày hết hạn tuyển" id="timeEnd" type="date" placeholder="" register={register} />
                            </div>
                            <div className={"hr-post__select"}>
                                <CustomSelect
                                    className="hr-post__select"
                                    name="location"
                                    label="Địa điểm làm việc"
                                    getDistrictList={() => console.log("districtList")}
                                    selectOptions={majorOptions}
                                    register={register}
                                />
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
                                <label htmlFor="">Mức lương</label>
                                <div className="hr-post__salary-range">
                                    <CustomInput id="salaryMin" type="text" placeholder="Nhập mức lương tối thiểu" register={register} />
                                    <CustomInput id="salaryMax" type="text" placeholder="Nhập mức lương tối đa" register={register} />
                                </div>
                                <SwitchButton label="Lương thỏa thuận" fontSize="13px" />
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
