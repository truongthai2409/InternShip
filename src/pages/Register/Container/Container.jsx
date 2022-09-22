import { Divider } from "@mui/material";
import ArrowButton from "src/components/ArrowButton/index";
import Button from "src/components/Button";
import CustomInput from "src/components/CustomInput/index";
import InputFile from "src/components/InputFile";
import SelectCustom from "src/components/Select";
import { TabTitle } from "src/utils/GeneralFunctions";

export default function Container({
  title,
  children,
  onClick,
  handleClick,
  err,
  setValue,
  register,
  errorMessage,
  genderList,
}) {
  TabTitle(`Đăng ký - ${title}`);

  return (
    <div className="reg-candidate">
      <p className="title-requirement">
        (<span className="field-requirment"> * </span>)Trường bắt buộc
      </p>
      <form
        onSubmit={handleClick}
        className="reg-candidate__form"
        autoComplete="off"
        encType="multipart/form-data"
      >
        <CustomInput
          label="Tài khoản"
          id="username"
          type="text"
          placeholder="Tài khoản..."
          register={register}
          subtitle="(Tên tài khoản ít nhất 6 - 32 kí tự, không dấu và kí tự đặc biệt)"
        >
          {err.username?.message}
          {errorMessage?.Username}
        </CustomInput>
        <CustomInput
          label="Email"
          id="email"
          type="email"
          placeholder="Email..."
          register={register}
          subtitle="(Email có dạng abc@gmail.com, abc@yahoo.com,...)"
        >
          {err.email?.message}
          {errorMessage?.Email}
        </CustomInput>
        <CustomInput
          label="Mật khẩu"
          id="password"
          type="password"
          placeholder="Mật khẩu"
          register={register}
          visibility={true}
          subtitle="(Mật khẩu ít nhất 6 - 32 kí tự, không dấu và kí tự đặc biệt, phải đồng thời chứa chữ hoa, chữ thường và số)"
        >
          {err.password?.message}
          {errorMessage?.Password}
        </CustomInput>
        <CustomInput
          label="Xác nhận mật khẩu"
          id="confirmPassword"
          type="password"
          placeholder="Xác nhận mật khẩu..."
          register={register}
          visibility={true}
          subtitle="(Xác nhận mật khẩu phải trùng với mật khẩu vừa nhập)"
        >
          {err.confirmPassword?.message}
        </CustomInput>
        <Divider style={{ marginTop: "2rem" }} />
        <div className="reg-candidate__form--name">
          <CustomInput
            label="Họ"
            id="lastname"
            type="text"
            placeholder="Họ..."
            register={register}
          >
            {err.lastname?.message}
          </CustomInput>
          <CustomInput
            label="Tên"
            id="firstname"
            type="text"
            placeholder="Tên..."
            register={register}
          >
            {err.firstname?.message}
          </CustomInput>
        </div>
        <CustomInput
          className="custom_req_can"
          label="Số điện thoại"
          id="phone"
          type="phone"
          placeholder="Số điện thoại..."
          register={register}
          subtitle="(Các đầu số 03, 05, 07, 08, 09 - ví dụ: 0981234567. Số có thể bắt đầu với +84, 84 - ví dụ: 84981234567)"
        >
          {err.phone?.message}
        </CustomInput>
        <SelectCustom
          label="Giới tính"
          placeholder="Vui lòng chọn..."
          options={genderList}
          id="gender"
          register={register}
        >
          {err.gender?.message}
        </SelectCustom>
        <InputFile
          label="Ảnh đại diện"
          requirementField={false}
          id="avatar"
          format="image"
          setValue={setValue}
          register={register}
        >
          {err.avatar?.message}
        </InputFile>
        {children}
        <div className="reg-candidate__btns">
          <div className="reg-candidate__btns--item" onClick={onClick}>
            <ArrowButton fontSize="16px" text="Trở lại" direction="left" />
          </div>
          <div className="reg-candidate__btns--item">
            <Button name="ĐĂNG KÝ" onClick={handleClick} />
          </div>
        </div>
      </form>
    </div>
  );
}
