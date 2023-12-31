import { createContext, useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import styles from "./Board.module.css";
import BoardCategories from "./components/BoardCategory/BoardCategories";
import BoardMain from "./BoardMain/BoardMain";
import PopularPosts from "./PopularPosts/PopularPosts";
import FreeBoard from "./FreeBoard/FreeBoard";
import NoticeBoard from "./NoticeBoard/NoticeBoard";
import WritePost from "./WritePost/WritePost";
import UpdatePost from "./UpdatePost/UpdatePost";
import Post from "./Post/Post";
import FixedMenu from "./components/FixedMenu/FixedMenu";
import Intro from "./Intro/Intro";
import { LoginContext } from "../../App";
import { MenuContext } from "../../App";

export const postMenuContext = createContext();

const Board = () => {
  // 선택된 메뉴 초기화
  const { loginId } = useContext(LoginContext);
  const { setSelectedMenu } = useContext(MenuContext);
  const location = useLocation(); // 현재 위치 정보 가져오기

  useEffect(() => {
    setSelectedMenu("게시판");
  }, []);
  // const navigate = useNavigate();

  // useEffect(() => {
  //     if (!loginId) {
  //         navigate('/denied');
  //     }
  // }, [loginId, navigate]);

  const [menu, setMenu] = useState("");
  return (
    <postMenuContext.Provider value={{ menu, setMenu }}>
      <div className={styles.container}>
        <div>
          <BoardCategories />
        </div>
        <Routes>
          <Route path="/" element={<BoardMain />} />
          <Route path="intro" element={<Intro />} />
          <Route path="popularposts" element={<PopularPosts />} />
          <Route path="freeboard" element={<FreeBoard />} />
          <Route path="noticeboard" element={<NoticeBoard />} />
          <Route path="writepost" element={<WritePost />} />
          <Route path="/updatepost/:postId" element={<UpdatePost />} />
          <Route path="/post/:postId" element={<Post />} />
        </Routes>
        {location.pathname !== "/board/writepost" && <FixedMenu />}
      </div>
    </postMenuContext.Provider>
  );
};

export default Board;
