import style from "./PurpleRectangleBtn.module.css";

const PurpleRectangleBtn = ({
  title,
  width,
  heightPadding,
  onClick,
  activation,
}) => {
  const widthStyle = {
    width: width + "px",
    paddingTop: heightPadding + "px",
    paddingBottom: heightPadding + "px",
    backgroundColor: activation ? "#7B61FF" : "#8787D0",
  };

  return (
    <button
      className={style.purpleRectangleBtn}
      style={widthStyle}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default PurpleRectangleBtn;
