import "./App.css";

//컴포넌트 요소
import Header from "./components/Header/Header";
// import MemberLogin from "./pages/MemberLogin/MemberLogin";
import Member from "./pages/Member/Member";
import Footer from "./components/Footer/Footer";
import Main from "./pages/Main/Main";
import Denied from "./components/Denied/Denied";
import Party from "./pages/Party/PartyMain";
import Board from "./pages/Board/Board";
import Mypage from "./pages/MyPage/Mypage";
import AdminMain from "./pages/AdminMain/AdminMain";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";

import { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export const MenuContext = createContext();
export const LoginContext = createContext();
export const CreatePartyContext = createContext();
export const JoinPartyContext = createContext();

function App() {
  const [selectedMenu, setSelectedMenu] = useState("");
  const [loginId, setLoginId] = useState("");
  const [loginNick, setLoginNick] = useState("");
  const [loginRole, setLoginRole] = useState("");
  const [loginStatus, setLoginStatus] = useState("loading");
  // 파티생성
  const [service, setService] = useState(null);
  // 파티 가입
  const [selectParty, setSelectParty] = useState(null);
  const [selectService, setSelectService] = useState("");
  // const [service, setService] = useState(null);
  return (
    <LoginContext.Provider
      value={{
        loginId,
        setLoginId,
        loginNick,
        setLoginNick,
        loginRole,
        setLoginRole,
        loginStatus,
        setLoginStatus,
      }}
    >
      <MenuContext.Provider value={{ selectedMenu, setSelectedMenu }}>
        <CreatePartyContext.Provider
          value={{
            service,
            setService,
          }}
        >
          <JoinPartyContext.Provider
            value={{
              selectParty,
              setSelectParty,
              service,
              setService,
              selectService,
              setSelectService,
            }}
          >
            <>
              <Router>
                <Header></Header>
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/member/*" element={<Member />}></Route>
                  <Route path="/party/*" element={<Party />}></Route>
                  <Route path="/Mypage/*" element={<Mypage />}></Route>
                  <Route path="/denied" element={<Denied />}></Route>
                  <Route path="/admin/*" element={<AdminMain />} />
                  <Route path="/board/*" element={<Board />} />
                </Routes>
                <Footer></Footer>
              </Router>
            </>
          </JoinPartyContext.Provider>
        </CreatePartyContext.Provider>
      </MenuContext.Provider>
    </LoginContext.Provider>
  );
}

export default App;
