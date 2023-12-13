import "./App.css";

//컴포넌트 요소
import Header from "./components/Header/Header";
import MemberLogin from "./pages/MemberLogin/MemberLogin";
import Footer from "./components/Footer/Footer";
import Main from "./pages/Main/Main";
import Denied from "./components/Denied/Denied";
import PartyCreate from "./pages/PartyCreate/PartyCreateMain";
import Mypage from "./pages/MyPage/Mypage";

import { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 관리자
import AdminMain from './pages/AdminMain/AdminMain';

export const MenuContext = createContext();
export const LoginContext = createContext();

function App() {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [loginId, setLoginId] = useState("");
  const [loginNick, setLoginNick] = useState("");

  return (
    <LoginContext.Provider
      value={{ loginId, setLoginId, loginNick, setLoginNick }}
    >
      <MenuContext.Provider value={{ selectedMenu, setSelectedMenu }}>
        <>
          <Router>
            <Header></Header>

            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login/*" element={<MemberLogin />}></Route>
              <Route path="/party/*" element={<PartyCreate />}></Route>
              <Route path="/Mypage/*" element={<Mypage/>}></Route>
              <Route path="/denied" element={<Denied />}></Route>

              {/* 관리자 */}
              <Route path="/admin/*" element={<AdminMain />}/>
            </Routes>
            <Footer></Footer>
          </Router>
        </>
      </MenuContext.Provider>
    </LoginContext.Provider>
  );
}

export default App;
