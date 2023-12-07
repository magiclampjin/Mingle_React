import { useContext, useEffect, useState } from 'react';
import styles from './Board.module.css'
import axios from 'axios';
import PurpleRectangleBtn from '../../components/PurpleRectangleBtn/PurpleRectangleBtn';


const Board = () => {

    // 상태로 게시글 목록을 저장합니다.
    const [posts, setPosts] = useState([]);

    // 컴포넌트가 마운트될 때 데이터를 불러옵니다.
    useEffect(() => {
        // TODO: 실제 서버 API 호출로 변경하세요.
        // axios.get("/api/posts").then(resp => {
        //     setPosts(resp.data);
        // }).catch(error => {

        // });
        const fetchPosts = async () => {
            // 예를 들어, `fetch('/api/posts')`로 실제 API를 호출할 수 있습니다.
            const response = await fetch('/api/post/');
            const data = await response.json();
            setPosts(data);
        };

        fetchPosts();
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
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>{post.author}</td>
                            <td>{post.date}</td>
                            <td>{post.views}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {posts.length === 0 && <p className="no-posts">게시글이 없습니다.</p>}
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
                {renderTable(posts, "자유게시판")}
            </div>

            <div>
                {renderTable(posts, "공지게시판")}
            </div>
        </div>
    );
};

export default Board;
