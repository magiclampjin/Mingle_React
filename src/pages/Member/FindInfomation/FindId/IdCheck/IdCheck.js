import style from "./IdCheck.module.css";
import PurpleRectangleBtn from "../../../../../components/PurpleRectangleBtn/PurpleRectangleBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const IdCheck = () => {
  return (
    <div className={style.idChek}>
      <div className={style.title}>아이디 찾기</div>
      <div className={style.idCheckBox}>
        {/* <div> */}
        <div className={style.backCircle}>
          <div className={style.mainCircle}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
        </div>
        {/* </div> */}
        {/* <div className={style.icon}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div> */}
        <div className={style.id}>김서영님 아이디는 test1111 입니다.</div>
        <PurpleRectangleBtn
          title={"로그인"}
          width={300}
          heightPadding={10}
          activation={true}
        ></PurpleRectangleBtn>
        <div className={style.findpw}>비밀번호 찾기</div>
      </div>
    </div>
  );
};

export default IdCheck;
