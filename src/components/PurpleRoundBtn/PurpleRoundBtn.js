import style from "./PurpleRoundBtn.module.css";

const PurpleRoundBtn = ({ title, activation, onClick }) => {
  const activationColorStyle = {
    backgroundColor: activation ? "#7B61FF" : "#8787D0",
  };

  return (
    <button
      className={style.purpleBtn}
      style={activationColorStyle}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default PurpleRoundBtn;
