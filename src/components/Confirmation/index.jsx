import Button from "../Button";
import ButtonOutline from "../ButtonOutline";
import "./styles.scss";

const Confirmation = ({ text, dispatch, nameBtnYes, nameBtnNo, setOpen, func }) => {
  const handClose = () => setOpen(false);

  return (
    <div className="confirmation__wrapper">
      <p>{text}</p>
      <div className="confirmation__btns">
        <Button
          onClick={func}
          className="confirmation__btn-close"
          name="Đóng việc"
          fz="14px"
          outline="1.5px solid #DEDEDE"
        />
        <ButtonOutline
          className="confirmation__btn-cancel"
          onClick={handClose}
          name="Huỷ"
          bg="#F3F4F6"
          color="#111111"
          radius="4px"
          fz="14px"
          outline="1.5px solid #DEDEDE"
        />
      </div>
    </div>
  );
};

export default Confirmation;
