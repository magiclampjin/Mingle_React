import style from "./WhiteRoundBtn.module.css";

const WhiteRoundBtn = ({ title, onClick }) => {
  return (
    <button className={style.writeBtn} onClick={onClick}>
      {title}
    </button>
  );
};

export default WhiteRoundBtn;
