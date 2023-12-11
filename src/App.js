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
import DetailReportParty from './pages/AdminMain/pages/DetailMemberManage/pages/DetailReportParty/DetailReportParty';
import ReportReadForm from "./pages/AdminMain/pages/ReportReadForm/ReportReadForm";

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
            <Route path="/admin/ReportReadForm" element={<ReportReadForm />}/>
            <Route path="/admin/DetailMemberManage" element={<DetailMemberManage />}/>
            <Route path="/admin/DetailMemberManage/DetailReportParty" element={<DetailReportParty />}/>
          </Routes>
          <Footer></Footer>
        </Router>
      </>
    </MenuContext.Provider>
  );
}

export default App;
