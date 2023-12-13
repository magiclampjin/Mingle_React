import "./App.css";

//컴포넌트 요소
import Header from "./components/Header/Header";
import MemberLogin from "./pages/MemberLogin/MemberLogin";
import Footer from "./components/Footer/Footer";
import Main from "./pages/Main/Main";
import Denied from "./components/Denied/Denied";
import PartyCreate from "./pages/PartyCreate/PartyCreateMain";
import Board from "./pages/Board/Board";
import WritePost from "./pages/Board/WritePost/WritePost";
import UpdatePost from "./pages/Board/UpdatePost/UpdatePost";
import Review from "./pages/Board/Review/Review";
import FreeBoard from "./pages/Board/FreeBoard/FreeBoard";
import NoticeBoard from "./pages/Board/NoticeBoard/NoticeBoard";
import Post from "./pages/Board/Post/Post";
import PopularPosts from "./pages/Board/PopularPosts/PopularPosts";

import { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



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
              <Route path="/denied" element={<Denied />}></Route>
              <Route path="/board" element={<Board/>}/>
              <Route path="/board/review" element={<Review/>}/>
              <Route path="/board/popularposts" element={<PopularPosts/>}/>
              <Route path="/board/freeboard" element={<FreeBoard/>}/>
              <Route path="/board/noticeboard" element={<NoticeBoard/>}/>
              <Route path="/board/writepost" element={<WritePost/>}/>
              <Route path="/board/updatepost" element={<UpdatePost/>}/>
              <Route path="/board/post/*" element={<Post/>}/>
            </Routes>
            <Footer></Footer>
          </Router>
        </>
      </MenuContext.Provider>
    </LoginContext.Provider>
  );
}

export default App;
