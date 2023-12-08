import "./App.css";

//컴포넌트 요소
import Header from "./components/Header/Header";
import MemberLogin from "./pages/MemberLogin/MemberLogin";

import { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Main from "./pages/Main/Main";

// 관리자
import AdminMain from './pages/AdminMain/AdminMain';
import DetailMemberManage from "./pages/AdminMain/pages/DetailMemberManage/DetailMemberManage";

export const MenuContext = createContext();

function App() {
  const [selectedMenu, setSelectedMenu] = useState("");
  return (
    <MenuContext.Provider value={{ setSelectedMenu }}>
      <>
        <Router>
          <Header></Header>

          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login/*" element={<MemberLogin />}></Route>

            <Route path="/admin" element={<AdminMain />}/>
            <Route path="/admin/DetailMemberManage" element={<DetailMemberManage />}/>
          </Routes>
          <Footer></Footer>
        </Router>
      </>
    </MenuContext.Provider>
  );
}

export default App;
