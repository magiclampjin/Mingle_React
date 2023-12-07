import "./App.css";

//컴포넌트 요소
import GrayRectangleBtn from "./components/GrayRectangleBtn/GrayRectangleBtn";
import PurpleRoundBtn from "./components/PurpleRoundBtn/PurpleRoundBtn";
import PurpleRectangleBtn from "./components/PurpleRectangleBtn/PurpleRectangleBtn";
import WhiteRectangleBtn from "./components/WhiteRectangleBtn/WhiteRectangleBtn";
import WhiteRoundBtn from "./components/WhiteRoundBtn/WhiteRoundBtn";
import Header from "./components/Header/Header";
import Login from "./pages/MemberLogin/Login";

import { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Main from "./pages/MainContents/Main/Main";
import PartyCreate from "./pages/MainContents/Party/PartyCreate/PartyCreate";

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
            <Route path="/login" element={<Login />}></Route>
            <Route path="/party" element={<PartyCreate />}></Route>
          </Routes>

          <Footer></Footer>
        </Router>
      </>
    </MenuContext.Provider>
  );
}

export default App;
