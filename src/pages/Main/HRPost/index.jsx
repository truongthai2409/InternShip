import React from "react";
import HeaderWithHR from "../../../components/HeaderWithHR";
import WorkIcon from "@mui/icons-material/Work";
import CustomInput from "../../../components/CustomInput";
import CustomSelect from "../../../components/CustomSelect";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../Register/RegisterStep2/data";
import CustomTextarea from "../../../components/CustomTextarea";
import "./styles.scss";

const HRPost = () => {
  const selects = [
    {
      id: "select__title",
      label: "Chuyên ngành",
      name: "major",
      options: [
        {
          id: 1,
          name: "Front-end",
        },
        {
          id: 2,
          name: "Back-end",
        },
      ],
    },

    {
      id: "select__jobtypes",
      label: "Loại công việc",
      name: "jobtypes",
      options: [
        {
          id: 1,
          name: "Part-time",
        },
        {
          id: 2,
          name: "Full-time",
        },
      ],
    },

    {
      id: "select__locationjob",
      label: "Địa điểm làm việc",
      name: "locationjob",
      options: [
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
      ],
    },
  ];

  const textares = [
    {
      id: "job__description",
      label: "Mô tả",
      type: "description",
      placeholder: "Mô tả công việc",
    },
    {
      id: "job__requirement",
      label: "Yêu cầu công việc",
      type: "description",
      placeholder: "Yêu cầu công việc",
    },
  ];

  const salaryRanges = [
    {
      id: "min-salary",
      label: "",
      name: "Mức lương tối thiểu",
      options: [
        {
          id: 1,
          name: "1.000.000",
        },
        {
          id: 2,
          name: "2.000.000",
        },
      ],
    },
    {
      id: "max-salary",
      label: "",
      name: "Mức lương tối đa",
      options: [
        {
          id: 1,
          name: "3.000.000",
        },
        {
          id: 2,
          name: "4.000.000",
        },
      ],
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <>
      <HeaderWithHR />
      <div className="hr-post__container">
        <div className="form__container">
          <form className="hr-post__form">
            <div className="hr-post__heading">
              <WorkIcon style={{ margin: "5px 5px 0 0" }} />
              <h2>Mô tả công việc</h2>
            </div>
            <div className="hr-post-title">
              <CustomInput
                label="Chức danh"
                id="title"
                type="text"
                placeholder="Eg. Internship UX Design"
                register={register}
              />
            </div>
            {selects.map((label) => (
              <div className={`hr-post__${label.name}`}>
                <CustomSelect
                  className="hr-post__select"
                  key={label.id}
                  name={label.label}
                  label={label.label}
                  dispatch={() => console.log("abc")}
                  getDistrictList={() => console.log("districtList")}
                  selectOptions={label.options}
                  id={label.id}
                />
              </div>
            ))}
            {textares.map((label) => (
              <div key={label.id} className={`hr-post__${label.id}`}>
                <CustomTextarea
                  label={label.label}
                  id={label.id}
                  type={label.type}
                  placeholder={label.placeholder}
                  register={() => console.log("Ac")}
                  check={false}
                ></CustomTextarea>
              </div>
            ))}
            <div className="hr-post__salary">
              <label htmlFor="">Mức lương</label>
              <div className="hr-post__salary-range">
                {salaryRanges.map((range) => (
                  <div className="salary-select-field">
                    <CustomSelect
                      name={range.name}
                      label=""
                      dispatch={() => console.log("abc")}
                      getDistrictList={() => console.log("districtList")}
                      selectOptions={range.options}
                      id={range.id}
                    />
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default HRPost;
