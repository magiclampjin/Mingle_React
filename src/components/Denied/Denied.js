import style from "./Denied.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import GrayRectangleBtn from "../GrayRectangleBtn/GrayRectangleBtn";
import PurpleRectangleBtn from "../PurpleRectangleBtn/PurpleRectangleBtn";

const Denied = () => {
  const navi = useNavigate();

  // 이전으로 돌아가기
  const handleBackPage = () => {
    navi(-1);
  };

  // 로그인으로 가기
  const handleLoginPage = () => {
    navi("/login");
  };
  return (
    <div className={style.deniedBox}>
      <div className={style.icon}>
        <FontAwesomeIcon icon={faBan} />
      </div>

      <div className={style.title}>해당 페이지에 접근 권한이 없습니다.</div>
      <div className={style.btns}>
        <GrayRectangleBtn
          title={"돌아가기"}
          width={180}
          heightPadding={20}
          onClick={handleBackPage}
        ></GrayRectangleBtn>
        <PurpleRectangleBtn
          title={"로그인"}
          width={180}
          heightPadding={20}
          activation={true}
          onClick={handleLoginPage}
        ></PurpleRectangleBtn>
      </div>
    </div>
  );
};

export default Denied;
