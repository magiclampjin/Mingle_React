import style from "./Denied.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import GrayRectangleBtn from "../GrayRectangleBtn/GrayRectangleBtn";
import PurpleRectangleBtn from "../PurpleRectangleBtn/PurpleRectangleBtn";
import { MenuContext } from "../../App";

const Denied = () => {
  const [authenticate, setAuthenticate] = useState();
  const { setSelectedMenu } = useContext(MenuContext);

  useEffect(() => {
    setSelectedMenu("");
    axios.get("/api/member/isAuthenticated").then((resp) => {
      setAuthenticate(resp.data);
    });
  }, []);

  const navi = useNavigate();

  // 이전으로 돌아가기
  // const handleBackPage = () => {
  //   navi(-1);
  // };

  // 메인으로 돌아가기
  const handleMainPage = () => {
    navi("/");
  };

  // 로그인으로 가기
  const handleLoginPage = () => {
    navi("/member/login");
  };
  return (
    <div className={style.deniedBox}>
      <div className={style.icon}>
        <FontAwesomeIcon icon={faBan} />
      </div>

      <div className={style.title}>해당 페이지에 접근 권한이 없습니다.</div>
      {authenticate ? (
        // 로그인했을 때
        <div className={style.btns}>
          <GrayRectangleBtn
            title={"홈으로"}
            width={180}
            heightPadding={20}
            onClick={handleMainPage}
          ></GrayRectangleBtn>
        </div>
      ) : (
        // 로그인하지 않았을 때
        <div className={style.btns}>
          <GrayRectangleBtn
            title={"홈으로"}
            width={180}
            heightPadding={20}
            onClick={handleMainPage}
          ></GrayRectangleBtn>
          <PurpleRectangleBtn
            title={"로그인"}
            width={180}
            heightPadding={20}
            activation={true}
            onClick={handleLoginPage}
          ></PurpleRectangleBtn>
        </div>
      )}
    </div>
  );
};

export default Denied;
