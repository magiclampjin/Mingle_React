import style from "./FindType.module.css";
import { useNavigate } from "react-router-dom";

const SelectType = () => {
  const navi = useNavigate();
  const handleFindId = () => {
    navi("/member/findInfo/id");
  };
  const handleFindPw = () => {
    navi("/member/findInfo/pw");
  };
  return (
    <div className={style.findInfoBox}>
      <div className={style.title}>회원 정보 찾기</div>

      <div className={style.btnBox}>
        <button className={style.whiteBtn} onClick={handleFindId}>
          아이디 찾기
        </button>
      </div>
      <div className={style.btnBox}>
        <button className={style.whiteBtn} onClick={handleFindPw}>
          비밀번호 찾기
        </button>
      </div>
    </div>
  );
};

export default SelectType;
