import style from "./Header.module.css";
import PurpleRoundBtn from "../PurpleRoundBtn/PurpleRoundBtn";
import { Link } from "react-router-dom";
import { MenuContext } from "../../App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

const Header = () => {
  const [profileUrl, setProfileUrl] = useState("/assets/basicProfile.png");
  return (
    <div className={style.header}>
      <div className={style.header__pcSize}>
        <div className={style.header__logo}>
          M<span>I</span>NG<span>L</span>E
        </div>
        <div className={style.header__menu}>
          <div className={style.menu__navi}>
            <div className={style.navi__conf}>나의 파티</div>
            <div className={style.navi__conf}>파티 만들기</div>
            <div className={style.navi__conf}>파티 찾기</div>
            <div className={style.navi__conf}>게시판</div>
            <div className={style.navi__conf}>자주 묻는 질문</div>
            <Link to="login">
              <PurpleRoundBtn
                title={"로그인"}
                activation={true}
              ></PurpleRoundBtn>
            </Link>
          </div>

          {/* <div className={style.menu__user}>
            <FontAwesomeIcon icon={faBell} />
            <img src={profileUrl} alt="" className={style.profileImg} />
          </div> */}
        </div>
        <div className={style.loginBtn}>
          <Link to="login">
            <PurpleRoundBtn title={"로그인"} activation={true}></PurpleRoundBtn>
          </Link>
        </div>
      </div>

      <div className={style.menu__naviTabSize}>
        <div className={style.navi__conf}>나의 파티</div>
        <div className={style.navi__conf}>파티 만들기</div>
        <div className={style.navi__conf}>파티 찾기</div>
        <div className={style.navi__conf}>게시판</div>
        <div className={style.navi__conf}>자주 묻는 질문</div>
      </div>
    </div>
  );
};

export default Header;
