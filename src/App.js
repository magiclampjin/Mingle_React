import "./App.css";

//컴포넌트 요소
import Header from "./components/Header/Header";
import MemberLogin from "./pages/MemberLogin/MemberLogin";

import { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Main from "./pages/MainContents/Main/Main";
import PartyCreate from "./pages/MainContents/Party/PartyCreate/PartyCreate";
import Board from "./pages/Board/Board";


export const MenuContext = createContext();

function App() {
  const [selectedMenu, setSelectedMenu] = useState("");
  return (
    <MenuContext.Provider value={{ selectedMenu, setSelectedMenu }}>
      <>
        <Router>
          <Header></Header>

          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />}></Route>
            <Route path="/party" element={<PartyCreate />}></Route>
            <Route path="/board" element={<Board></Board>}/>
7
          </Routes>
          <Footer></Footer>
        </Router>
      </>
    </MenuContext.Provider>
  );
}

export default App;
