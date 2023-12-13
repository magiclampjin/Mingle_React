import { useContext, useEffect, useState } from 'react';
import styles from './Board.module.css'
import axios from 'axios';
import PurpleRectangleBtn from '../../components/PurpleRectangleBtn/PurpleRectangleBtn';
import BoardCategories from './components/BoardCategory/BoardCategories';


const Board = () => {

    // 상태로 게시글 목록을 저장
    const [boardState, setBoardState] = useState("전체");
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
        })

        axios.get("/api/post/test").then(resp => {
            console.log(resp.data)
        })


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
                {title === "공지게시판" ?<></> :
                
                <button className={styles.board__button}>
                    게시글 작성하기
                </button>
                // <PurpleRectangleBtn
                //     title={"게시글 작성하기"}
                //     width={150}
                //     heightPadding={10}
                // ></PurpleRectangleBtn> 
            }
                <button className={styles.board__button}>
                    {title}
                </button>
                
            </div>
        </>
    );

    return (
        <div className={styles.board}>
            <BoardCategories></BoardCategories>
            <div className={styles.board__layer}>
                <p className={styles.board__title}>인기글</p>
            </div>

            <div className={styles.board__layer}>
                {renderTable(freePosts, "자유게시판")}
            </div>

            <div className={styles.board__layer}>
                {renderTable(noticePosts, "공지게시판")}
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

export default Board;
