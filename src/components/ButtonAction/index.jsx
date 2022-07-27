import CandidateList from "src/pages/Main/HR/CandidateList";
import Modal from "../Modal";
import "./styles.scss";

const ButtonAction = ({
  onClick,
  height,
  width,
  border,
  amount = "",
  name,
  icon,
  fontSize,
  color = "",
  open,
  setOpen,
}) => {
  return (
    <>
      <div
        onClick={onClick}
        style={{ width: width, height: height, border: border, color: color }}
        className="button-action__container"
      >
        {icon}
        <p
          className="button-action__name"
          style={{ fontSize: fontSize }}
        >{`${amount} ${name}`}</p>
      </div>
      <Modal
        modalTitle="Danh sách ứng viên đã ứng tuyển"
        open={open}
        setOpen={setOpen}
        children={<CandidateList />}
        name="list-candidate"
      />
    </>
  );
};

export default ButtonAction;
