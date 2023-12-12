import style from "./WhiteRectangleBtn.module.css";

const WhiteRectangleBtn = ({ title, width, heightPadding, onClick }) => {
  const widthStyle = {
    width: width + "px",
    paddingTop: heightPadding + "px",
    paddingBottom: heightPadding + "px",
  };

  return (
    <button
      className={style.whiteRectangleBtn}
      style={widthStyle}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default WhiteRectangleBtn;
