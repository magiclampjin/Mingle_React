import { useContext, useEffect, useState } from 'react';
import styles from './Board.module.css'
import axios from 'axios';
import PurpleRectangleBtn from '../../components/PurpleRectangleBtn/PurpleRectangleBtn';


const Board = () => {

    // 상태로 게시글 목록을 저장합니다.
    const [posts, setPosts] = useState([]);
    const [freePosts, setFreePosts] = useState([]);
    const [noticePosts, setNoticePosts] = useState([]);

    // 컴포넌트가 마운트될 때 데이터를 불러옵니다.
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


    }, []);


    const renderTable = (posts, title) => (
        <>
            <p className={styles.board__title}>{title}</p>
            <table className={styles.board__table}>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                        <th>조회수</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post, index) => (
                        <tr key={index}>
                            <td>{post.rownum}</td>
                            <td>{post.title}</td>
                            <td>{post.memberNickname}</td>
                            <td>{post.writeDate}</td>
                            <td>{post.viewCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {posts.length === 0 && <p className={styles.no__posts}>게시글이 없습니다.</p>}
            <div className={styles.board__buttonContainer}>
                {title === "공지게시판" ?<></> :<PurpleRectangleBtn
                    title={"게시글 작성하기"}
                    width={150}
                    heightPadding={10}
                ></PurpleRectangleBtn> }
                <span className={styles.board__button}></span>
                <PurpleRectangleBtn
                    title={`${title}`}
                    width={150}
                    heightPadding={10}
                    className = {styles.board__button}
                ></PurpleRectangleBtn>
            </div>
        </>
    );

    return (
        <div className={styles.board}>
            <div className={styles.board__category}>
                게시판 카테고리
            </div>
            <div className={styles.board__freePosts}>
                {renderTable(freePosts, "자유게시판")}
            </div>

            <div>
                {renderTable(noticePosts, "공지게시판")}
            </div>
        </div>
    );
};

export default Board;
