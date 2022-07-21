import './styles.scss'
import Button from 'src/components/Button'
import ButtonOutline from 'src/components/ButtonOutline'
import CustomInput from 'src/components/CustomInput'
import { useForm } from 'react-hook-form'
import { schema } from './validateForm'
import { yupResolver } from '@hookform/resolvers/yup'
import SelectCustom from 'src/components/Select'

const ProfileForm = ({ onClick }) => {
  const options = [{ id: 1, name: 'chê' }]
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = data => {}

  return (
    <>
      <form className="profile-form__wrapper" autoComplete="off">
        <div className="profile-form__content">
          <div className="profile-form__content-item">
            <CustomInput
              register={register}
              id="lastName"
              label="Họ"
              requirementField={false}
              className="profile-form__input"
            >
              {errors?.lastName.message}
            </CustomInput>
          </div>
          <div className="profile-form__content-item">
            <CustomInput
              register={register}
              id="firstName"
              label="Tên"
              requirementField={false}
              className="profile-form__input"
            />
          </div>
          <div className="profile-form__content-item">
            <SelectCustom
              register={register}
              id="gender"
              label="Giới tính"
              requirementField={false}
              options={options}
            />
          </div>
          <div className="profile-form__content-item">
            <CustomInput
              register={register}
              id="phone"
              type="number"
              label="Số điện thoại"
              requirementField={false}
              className="profile-form__input"
            />
          </div>
        </div>
        <div className="profile-form__action">
          <Button
            name="Lưu"
            onClick={handleSubmit(onSubmit)}
            fz="14px"
            outline="1.5px solid #DEDEDE"
            className="profile-form__action-btn"
          />
          <span style={{ margin: '0 4px' }}></span>
          <ButtonOutline
            name="Hủy"
            onClick={onClick}
            bg="#F3F4F6"
            outline="1.5px solid #DEDEDE"
            color="#111111"
            fz="14px"
            className="profile-form__action-btn"
          />
        </div>
      </form>
    </>
  )
}

export default ProfileForm
