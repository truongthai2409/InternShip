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
  disabled = false,
  onMouseEnter,
}) => {
  return (
    <div
      className={`button-action__wrapper ${disabled ? "disabled" : ""}`}
      style={{ width: width, height: height, border: border, color: color }}
    >
      <div onMouseEnter={onMouseEnter} onClick={onClick} className="button-action__container">
        {icon}
        <p
          className="button-action__name"
          style={{ fontSize: fontSize }}
        >{`${amount} ${name}`}</p>
      </div>
    </div>
  );
};

export default ButtonAction;
