import style from "./Header.module.css";
import PurpleRoundBtn from "../PurpleRoundBtn/PurpleRoundBtn";
import ProfileModal from "./ProfileModal/ProfileModal";

import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faBell } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext, useEffect, useRef } from "react";
import { MenuContext } from "../../App";
import { LoginContext } from "../../App";
import axios from "axios";
import { Cookies } from "react-cookie";

const Header = () => {
  const [profileUrl, setProfileUrl] = useState("/assets/basicProfile.png");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { loginId, setLoginId } = useContext(LoginContext);
  const { loginNick, setLoginNick } = useContext(LoginContext);
  const { loginRole, setLoginRole } = useContext(LoginContext);
  const { selectedMenu, setSelectedMenu } = useContext(MenuContext);
  const scrollPosition = useRef(0);

  const {loginStatus,setLoginStatus} = useContext(LoginContext);

  const navi = useNavigate();
  const cookies = new Cookies();

  // 선택한 메뉴 아래부분 border
  const borderStyle = {
    borderBottom: "2px solid #7b61ff",
  };

  useEffect(() => {
    if (modalIsOpen) {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;

        // 현재 스크롤 위치가 특정 위치보다 아래로 10px 내려갔을 때 이벤트 실행
        // 스크롤을 한번만 내려도 헤더가 안보이기 때문에 10px로 설정함 ( 현재 모니터에서 기준으로 한번 스크롤시 99px까지 내려감 -> 10px만 움직여도 사라지게 하는것이 자연스럽다고 판단함 )
        // 다른 사양의 모니터에서도 확인이 필요
        // 아래 방향으로 내려갈 때 최 상단 위치보다 10px 아래로 내려갔을 때만 이벤트 실행 (감지 범위를 10~20으로 설정)
        if (currentScrollY > scrollPosition.current && currentScrollY > 10) {
          // 모달을 닫는 로직 추가
          setModalIsOpen(false);
        }

        // 현재 스크롤 위치를 업데이트
        scrollPosition.current = currentScrollY;
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [scrollPosition, modalIsOpen]);


  useEffect(() => {
    // setLoading(true);
    axios.get("/api/member/userBasicInfo").then((resp) => {
      const data = resp.data; // axios로 받아온 데이터
      // data가 Map과 유사한 경우
      // Map의 값들 꺼내오기
      
      if (data.loginID !== undefined) {
        setLoginId(data.loginID);
        // setLoading(false);
      }
      if (data.loginNick !== undefined) {
        setLoginNick(data.loginNick);
        // setLoading(false);
      }
      if (data.loginRole !== undefined) {
        setLoginRole(data.loginRole);
      }
    }).finally(()=>{
      setLoginStatus("confirm");
    })
  }, [loginId, modalIsOpen]);

  // 프로필 모달창 열기
  const openModal = () => {
    setModalIsOpen(true);
  };

  // 프로필 모달창 닫기
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleLogout = () => {
    axios.post("/api/member/logout").then((resp) => {
      setLoginId("");
      // 아이디 기억하기 하지 않으면 쿠키에 저장된 아이디 지우기
      if (!cookies.get("rememberID")) {
        cookies.remove("loginID", { path: "/" });
      }
      closeModal();
    });
  };

  // 자주 묻는 질문으로 이동
  const handleFAQClick = () => {
    setSelectedMenu("자주 묻는 질문");
    window.location.href =
      "https://impossible-log-6dc.notion.site/4ac5ec788ca04f6ab7304dbb71891974?pvs=4";
  };

  // 로그인하기
  const handleGoLogin = () => {
    setSelectedMenu("");
    navi("/member/login");
  };

  // 각 메뉴 클릭했을 때 선택한 메뉴 초기화
  const handleMenuClick = (path, label) => {
    setSelectedMenu(label);
    navi(path);
  };

  // 홈으로 가기
  const handleHome = () => {
    setSelectedMenu("");
    navi("/");
  };

  const menuItems = [
    { label: "나의 파티", path: "/party/myParty" },
    { label: "파티 만들기", path: "/party/partycreate" },
    { label: "파티 찾기", path: "/party/partyJoin" },
    { label: "게시판", path: "/board" },
    { label: "자주 묻는 질문", handle: handleFAQClick },
  ];

  return (
    <div className={style.header}>
      <div className={style.header__pcSize}>
        <div className={style.header__logo} onClick={handleHome}>
          M<span>I</span>NG<span>L</span>E
        </div>

        <div className={style.header__menu}>
          <div className={style.menu__navi}>
            {menuItems.map((menuItem, index) => {
              return (
                <div
                  key={index}
                  className={style.navi__conf}
                  onClick={() =>
                    menuItem.handle
                      ? menuItem.handle()
                      : handleMenuClick(menuItem.path, menuItem.label)
                  }
                  style={{
                    borderBottom:
                      selectedMenu === menuItem.label
                        ? "2px solid #7b61ff"
                        : "2px solid transparent",
                  }}
                >
                  {menuItem.label}
                </div>
              );
            })}
            {loginId === "" || loginId === null ? (
              <PurpleRoundBtn
                title={"로그인"}
                activation={true}
                onClick={handleGoLogin}
              ></PurpleRoundBtn>
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

                      <Link to="/Mypage">
                        <div>
                          마이페이지
                          <FontAwesomeIcon icon={faAngleRight} />
                        </div>
                      </Link>
                    </div>
                  </div>
                  {loginRole === "ROLE_ADMIN" && (
                    <div className={style.profileModalAdminInfo}>
                      <Link to="/Admin">
                        <div>관리자</div>
                      </Link>
                    </div>
                  )}
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
          {loginId === "" || loginId === null ? (
            <Link to="member/login">
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
                    <Link to="/Mypage">
                      <div className={style.mypageBtn} onClick={closeModal}>
                        마이페이지
                        <FontAwesomeIcon icon={faAngleRight} />
                      </div>
                    </Link>
                  </div>
                </div>
                {loginRole === "ROLE_ADMIN" && (
                  <div className={style.profileModalAdminInfo}>
                    <Link to="/Admin">
                      <div>관리자</div>
                    </Link>
                  </div>
                )}
                <button className={style.transparentBtn} onClick={handleLogout}>
                  로그아웃
                </button>
              </ProfileModal>
            </>
          )}
        </div>
      </div>

      <div className={style.menu__naviTabSize}>
        {menuItems.map((menuItem, index) => {
          return (
            <div
              key={index}
              className={style.navi__conf}
              onClick={() =>
                menuItem.handle
                  ? menuItem.handle()
                  : handleMenuClick(menuItem.path, menuItem.label)
              }
              style={{
                borderBottom:
                  selectedMenu === menuItem.label
                    ? "2px solid #7b61ff"
                    : "2px solid transparent",
              }}
            >
              {menuItem.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
