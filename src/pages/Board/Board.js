import { createContext, useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styles from './Board.module.css'
import BoardCategories from './components/BoardCategory/BoardCategories';
import BoardMain from "./BoardMain/BoardMain";
import Review from './Review/Review';
import PopularPosts from './PopularPosts/PopularPosts';
import FreeBoard from './FreeBoard/FreeBoard';
import NoticeBoard from './NoticeBoard/NoticeBoard';
import WritePost from './WritePost/WritePost';
import UpdatePost from './UpdatePost/UpdatePost';
import Post from './Post/Post';
import FixedMenu from './components/FixedMenu/FixedMenu';

export const postMenuContext = createContext();

const Board = () => {

    const [menu, setMenu] = useState("");
    return (
        <postMenuContext.Provider value={{ menu, setMenu }}>
            <div className={styles.container}>
                <div>
                    <BoardCategories />
                </div>
                <Routes>
                    <Route path="/" element={<BoardMain />} />
                    <Route path="review" element={<Review />} />
                    <Route path="popularposts" element={<PopularPosts />} />
                    <Route path="freeboard" element={<FreeBoard />} />
                    <Route path="noticeboard" element={<NoticeBoard />} />
                    <Route path="writepost" element={<WritePost />} />
                    <Route path="updatepost" element={<UpdatePost />} />
                    <Route path="post/*" element={<Post />} />
                </Routes>
                <FixedMenu />
            </div>
        </postMenuContext.Provider>

    );
};

export default Board;
