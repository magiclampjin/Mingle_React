import style from "./Header.module.css";
import PurpleRoundBtn from "../PurpleRoundBtn/PurpleRoundBtn";
import ProfileModal from "./ProfileModal/ProfileModal";
import CustomModal from "../CustomModal/CustomModal";

import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faBell } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext, useEffect } from "react";
import { MenuContext } from "../../App";
import { LoginContext } from "../../App";
import axios from "axios";
import { Cookies } from "react-cookie";

const Header = () => {
  const [profileUrl, setProfileUrl] = useState("/assets/basicProfile.png");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { loginId, setLoginId } = useContext(LoginContext);
  const { loginNick, setLoginNick } = useContext(LoginContext);

  const navi = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    axios.get("/api/member/userBasicInfo").then((resp) => {
      const data = resp.data; // axios로 받아온 데이터

      // data가 Map과 유사한 경우
      if (typeof data === "object" && data !== null) {
        // Map의 값들 꺼내오기
        if (data.loginID !== undefined) {
          setLoginId(data.loginID);
        }
        if (data.loginNick !== undefined) {
          setLoginNick(data.loginNick);
        }
      } else {
        console.error("Received data is not in a Map-like format.");
      }
    });
  }, []);

  // 프로필 모달창 열기
  const openModal = () => {
    setModalIsOpen(true);
  };

  // 프로필 모달창 닫기
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleLogout = () => {
    console.log("로그아웃 클릭");
    axios.post("/api/member/logout").then((resp) => {
      setLoginId(null);
      // 아이디 기억하기 하지 않으면 쿠키에 저장된 아이디 지우기
      if (!cookies.get("rememberID")) {
        cookies.remove("loginID", { path: "/" });
      }
      closeModal();
      navi("/");
    });
  };

  return (
    <div className={style.header}>
      <div className={style.header__pcSize}>
        <Link to="/">
          <div className={style.header__logo}>
            M<span>I</span>NG<span>L</span>E
          </div>
        </Link>
        <div className={style.header__menu}>
          <div className={style.menu__navi}>
            <div className={style.navi__conf}>나의 파티</div>
            <div className={style.navi__conf}>파티 만들기</div>
            <div className={style.navi__conf}>파티 찾기</div>
            <div className={style.navi__conf}>게시판</div>
            <div className={style.navi__conf}>자주 묻는 질문</div>
            {loginId === "" || loginId === null ? (
              <Link to="login">
                <PurpleRoundBtn
                  title={"로그인"}
                  activation={true}
                ></PurpleRoundBtn>
              </Link>
            ) : (
              <>
                <div className={style.menu__user}>
                  <FontAwesomeIcon icon={faBell} />
                  <img
                    src={profileUrl}
                    alt=""
                    className={style.profileImg}
                    onClick={openModal}
                  />
                </div>

                <ProfileModal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  contentLabel="정보 모달"
                >
                  <div className={style.profileInner}>
                    <img
                      src={profileUrl}
                      alt=""
                      className={style.profileModalImg}
                    />
                    <div className={style.proffileModalInfo}>
                      <div>{loginNick}님</div>
                      <div>
                        마이페이지
                        <FontAwesomeIcon icon={faAngleRight} />
                      </div>
                    </div>
                  </div>
                  <button
                    className={style.transparentBtn}
                    onClick={handleLogout}
                  >
                    로그아웃
                  </button>
                </ProfileModal>
              </>
            )}
          </div>
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
