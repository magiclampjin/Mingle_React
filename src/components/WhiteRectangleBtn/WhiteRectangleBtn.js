import style from "./WhiteRectangleBtn.module.css";

const WhiteRectangleBtn = ({ title, onClick }) => {
  return (
    <button className={style.whiteRectangleBtn} onClick={onClick}>
      {title}
    </button>
  );
};

export default WhiteRectangleBtn;
