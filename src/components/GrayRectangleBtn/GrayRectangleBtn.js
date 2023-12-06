import style from "./GrayRectangleBtn.module.css";

const GrayRectangleBtn = ({ title, width, heightPadding, onClick }) => {
  const widthStyle = {
    width: width + "px",
    paddingTop: heightPadding + "px",
    paddingBottom: heightPadding + "px",
  };

  return (
    <button
      className={style.grayRectangleBtn}
      style={widthStyle}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default GrayRectangleBtn;
