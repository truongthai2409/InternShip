import "./styles.scss";

const ButtonAction = ({ onClick, height, width, border, amount = "", name, icon, fontSize, color = "" }) => {
    return (
        <div onClick={onClick} style={{ width: width, height: height, border: border, color: color }} className="button-action__container">
            {icon}
            <p className="button-action__name" style={{ fontSize: fontSize }}>{`${amount} ${name}`}</p>
        </div>
    );
};

export default ButtonAction;
