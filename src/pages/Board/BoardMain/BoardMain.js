import { useContext, useEffect, useState } from 'react';
import styles from './Board.module.css'
import axios from 'axios';
import BoardCategories from '../components/BoardCategory/BoardCategories';
import RenderTable from '../components/RenderTable/RenderTable';

const BoardMain = () => {

    // 상태로 게시글 목록을 저장
    const [freePosts, setFreePosts] = useState([]);
    const [noticePosts, setNoticePosts] = useState([]);

    // 컴포넌트가 마운트될 때 데이터 로드
    useEffect(() => {
        axios.get("/api/post/freeTop10").then(resp => {
           console.log(resp.data);
           setFreePosts(resp.data);
        }).catch(error => {

        });

        axios.get("/api/post/noticeTop10").then(resp => {
            console.log(resp.data);
            setNoticePosts(resp.data);
        }).catch(error => {

        });

        axios.get("/api/external/youtube/netflix").then(resp => {
            console.log(resp.data);
        }).catch(error => {

        });


    }, []);


    return (
        <div className={styles.board}>
            <BoardCategories></BoardCategories>
            <div className={styles.board__layer}>
                <p className={styles.board__title}>인기글</p>
            </div>

            <div className={styles.board__layer}>
                <RenderTable posts={freePosts} title={`자유게시판`} />
            </div>

            <div className={styles.board__layer}>
                <RenderTable posts={noticePosts} title={"공지게시판"} />
            </div>

            <div className={styles.board__layer}>
                <p className={styles.board__title}>리뷰</p>
            </div>

            <div className={styles.board__layer}>
                <p className={styles.board__title}>신작소개</p>
            </div>
        </div>
    );
};

export default BoardMain;
