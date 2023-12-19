import style from "./Step3.module.css";
import PurpleRectangleBtn from "../../../../components/PurpleRectangleBtn/PurpleRectangleBtn";
import GrayRectangleBtn from "../../../../components/GrayRectangleBtn/GrayRectangleBtn";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { SignUpInfoContext } from "../SignUp";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const Step3 = () => {
  const { user, setUser } = useContext(SignUpInfoContext);
  const navi = useNavigate();

  // const handleAccount = () => {
  //   navi("/member/account");
  // };

  const handleHome = () => {
    navi("/");
  };

  const handleLogin = () => {
    navi("/member/login");
  };
  return (
    <>
      <div className={style.userWelcome}>
        <div className={style.userWelcomeInfo}>
          <div>
            <div className={style.backCircle}>
              <div className={style.mainCircle}>
                <FontAwesomeIcon icon={faCheck} />
              </div>
            </div>
          </div>
          <div className={style.userWelcome__title}>회원가입 완료</div>
          <div className={style.userWelcome__conf}>
            {user.name}님({user.id})의 회원가입이 성공적으로 완료되었습니다.
          </div>
          <div className={style.userWelcome__info}>
            입력한 회원 정보는 마이페이지에서 확인 및 수정이 가능합니다.
            <br></br>파티를 이용하시려면 계좌 정보를 등록해주세요.
          </div>
          {/* <div className={style.accountInfo} onClick={handleAccount}>
            계좌 정보 등록하기
          </div> */}
        </div>
      </div>
      <div className={style.stepBtns}>
        <GrayRectangleBtn
          title={"홈으로"}
          heightPadding={20}
          width={190}
          onClick={handleHome}
        ></GrayRectangleBtn>
        <PurpleRectangleBtn
          title={"로그인"}
          heightPadding={20}
          width={190}
          activation={true}
          onClick={handleLogin}
        ></PurpleRectangleBtn>
      </div>
    </>
  );
};

export default Step3;
