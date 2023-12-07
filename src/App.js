import "./App.css";

//컴포넌트 요소
import GrayRectangleBtn from "./components/GrayRectangleBtn/GrayRectangleBtn";
import PurpleRoundBtn from "./components/PurpleRoundBtn/PurpleRoundBtn";
import PurpleRectangleBtn from "./components/PurpleRectangleBtn/PurpleRectangleBtn";
import WhiteRectangleBtn from "./components/WhiteRectangleBtn/WhiteRectangleBtn";
import WhiteRoundBtn from "./components/WhiteRoundBtn/WhiteRoundBtn";
import Header from "./components/Header/Header";

import { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Main from "./pages/MainContents/Main/Main";
import Board from "./pages/Board/Board";

export const MenuContext = createContext();

function App() {
  const [selectedMenu, setSelectedMenu] = useState("");
  return (
    <MenuContext.Provider value={{ selectedMenu, setSelectedMenu }}>
      <>
        <Header></Header>
        <Router>
          <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/board" element={<Board></Board>}/>
          </Routes>
        </Router>
        <Footer></Footer>

      </>
    </MenuContext.Provider>
  );
}

export default App;
