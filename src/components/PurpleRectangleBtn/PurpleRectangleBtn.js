import style from "./PurpleRectangleBtn.module.css";

const PurpleRectangleBtn = ({ title, width, heightPadding, onClick }) => {
  const widthStyle = {
    width: width + "px",
    paddingTop: heightPadding + "px",
    paddingBottom: heightPadding + "px",
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
