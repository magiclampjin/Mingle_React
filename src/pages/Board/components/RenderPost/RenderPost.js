import styles from "./RenderPost.module.css"
import { timeFormatter } from "../../../../components/TimeFormatter/TimeFormatter";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import Pagination from "react-js-pagination";
import { useState } from "react";

const RenderPost = ({ posts, title }) => {

    // 페이지 상태 관리
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;

    // 현재 페이지의 게시글 계산
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    return (
        <div className={styles.render}>
            <p className={styles.board__title}>{title}</p>
            <div className={styles.board__container}>
                {currentPosts.map((post, index) => (
                    <Link to={`/board/post/${post.id}`} key={post.id}>
                        <div className={styles.post__item}>
                            <div className={styles[`post__item-rownum`]}>{post.rownum}</div>
                            <div className={styles[`post__item-title`]}>{post.title}</div>
                            <div className={styles[`post__item-nickname`]}>{post.memberNickname}</div>
                            <div className={styles[`post__item-date`]}>{timeFormatter(post.writeDate)}</div>
                            <div className={styles[`post__item-viewcount`]}><FontAwesomeIcon icon={faEye} />{` ${post.viewCount}`}</div>
                        </div>
                    </Link>
                ))}
            </div>
            {currentPosts.length === 0 && <p className={styles.no__posts}>게시글이 없습니다.</p>}

            {/* 페이지네이션 컴포넌트 */}
            {currentPosts.length !== 0 &&
                <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={postsPerPage}
                    totalItemsCount={posts.length}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}
                />
            }

        </div>
    );
}

export default RenderPost;
