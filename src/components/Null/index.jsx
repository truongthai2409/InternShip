import "./styles.scss";

const Null = ({ text, height, fs, fw }) => {
  return (
    <div
      style={{
        height: height ? height : "",
        fontSize: fs ? fs : "",
      }}
      className="null__wrapper"
    >
      <h1 style={{ fontWeight: fw ? fw : "" }}>{text}</h1>
    </div>
  );
};

export default Null;
