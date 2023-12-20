import { createContext, useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import styles from './Board.module.css'
import BoardCategories from './components/BoardCategory/BoardCategories';
import BoardMain from "./BoardMain/BoardMain";
import PopularPosts from './PopularPosts/PopularPosts';
import FreeBoard from './FreeBoard/FreeBoard';
import NoticeBoard from './NoticeBoard/NoticeBoard';
import WritePost from './WritePost/WritePost';
import UpdatePost from './UpdatePost/UpdatePost';
import Post from './Post/Post';
import FixedMenu from './components/FixedMenu/FixedMenu';
import Intro from './Intro/Intro';
import { LoginContext } from '../../App';

export const postMenuContext = createContext();

const Board = () => {
    const {loginId} = useContext(LoginContext);
    // const navigate = useNavigate();

    // useEffect(() => {
    //     if (!loginId) {
    //         navigate('/denied');
    //     }
    // }, [loginId, navigate]); // 의존성 배열에 loginId와 navigate를 넣어줍니다.

    const [menu, setMenu] = useState("");
    return (
        <postMenuContext.Provider value={{ menu, setMenu }}>
            <div className={styles.container}>
                <div>
                    <BoardCategories />
                </div>
                <Routes>
                    <Route path="/" element={<BoardMain />} />
                    <Route path="intro" element={<Intro/>}/>
                    <Route path="popularposts" element={<PopularPosts />} />
                    <Route path="freeboard" element={<FreeBoard />} />
                    <Route path="noticeboard" element={<NoticeBoard />} />
                    <Route path="writepost" element={<WritePost />} />
                    <Route path="updatepost/*" element={<UpdatePost />} />
                    <Route path="/post/:postId" element={<Post />} />
                </Routes>
                <FixedMenu />
            </div>
        </postMenuContext.Provider>

    );
};

export default Board;
