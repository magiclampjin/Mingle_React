import style from "../../pages/MyPage/Mypage.module.css";
import MyPageSideBarLeft from "./components/MypageSidebarLeft/MypageSideBarLeft";
import Calculation from "./Calculation/Calculation";
import MypageSidebarRight from "./components/MypageSidebarRight/MypageSidebarRight";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import MypageMain from "./MypageMain/MypageMain";
import MemberInfoUpdate from "./MemberInfoUpdate/MemberInfoUpdate";
import PaymentManage from "./PaymentManage/PaymentManage";
import PaymentRecord from "./PaymentRecord/PaymentRecord";
import { createContext, useContext, useEffect, useState } from "react";
import MypageHam from "./components/MypageHam/MypageHam";
import { LoginContext, ModalContext, MenuContext } from "../../App";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Denied from "../../components/Denied/Denied";

// sidebar에서 사용하는 컨텍스트
export const mypageMenuContext = createContext();

const Mypage = () => {
  // 로그인 컨텍스트
  const { loginId, ,setLoginId } = useContext(LoginContext);

  // sidebar로 넘겨주는 State
  const [menu, setMenu] = useState("");

  // 드롭다운 메뉴 State (닫힘 :false, 열림: true)
  const [dropDown, setDropDown] = useState(true);

  const { loginStatus, setLoginStatus } = useContext(LoginContext);

  const navigate = useNavigate();

  // 선택된 메뉴 초기화
  const { setSelectedMenu } = useContext(MenuContext);
  useEffect(() => {
    setSelectedMenu("");
  }, []);

  // on,off
  const ondropDownHandle = () => {
    setDropDown(!dropDown);
  };

  return loginStatus === "loading" ? (
    <LoadingSpinner></LoadingSpinner>
  ) : loginId == "" ? (
    <Denied />
  ) : (
    <>
      <mypageMenuContext.Provider value={{ menu, setMenu }}>
        <div className={style.container}>
          <div className={style.dropDownNavi} onClick={ondropDownHandle}>
            <MypageHam></MypageHam>
          </div>
          <div
            className={`${style.container__inner} ${
              !dropDown ? style.hidden : ""
            }`}
          >
            <div>
              <MyPageSideBarLeft></MyPageSideBarLeft>
            </div>

            <div>
              <Routes>
                <Route path="/" element={<MypageMain />}></Route>
                <Route path="Calculation" element={<Calculation />}></Route>
                <Route
                  path="MemberInfoUpdate"
                  element={<MemberInfoUpdate />}
                ></Route>
                <Route path="PaymentManage" element={<PaymentManage />}></Route>
                <Route path="PaymentRecord" element={<PaymentRecord />}></Route>
              </Routes>
            </div>
            <div>
              <MypageSidebarRight></MypageSidebarRight>
            </div>
          </div>
        </div>
      </mypageMenuContext.Provider>
    </>
  );
};

export default Mypage;
