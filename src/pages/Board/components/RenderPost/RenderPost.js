import styles from "./RenderPost.module.css"
import { timeFormatter } from "../../../../components/TimeFormatter/TimeFormatter";
import { Link,useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faThumbsUp,faClock } from "@fortawesome/free-solid-svg-icons";
import Pagination from "react-js-pagination";
import { useEffect,useState } from "react";

const RenderPost = ({ posts, title }) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const postsPerPage = 10;
    const currentPageFromUrl = Number(searchParams.get("page")) || 1;
    const [currentPage, setCurrentPage] = useState(currentPageFromUrl);

    useEffect(() => {
        if (!searchParams.get("page")) {
            setSearchParams({ page: currentPage.toString() });
        }
    }, [searchParams, setSearchParams, currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        setSearchParams({ page: pageNumber.toString() });
    };

    // 현재 페이지의 게시글 계산
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

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
                            <div className={styles[`post__item-date`]}><FontAwesomeIcon icon={faClock} />{` ${timeFormatter(post.writeDate)}`}</div>
                            <div className={styles[`post__item-viewcount`]}><FontAwesomeIcon icon={faEye} />{` ${post.viewCount}`}</div>
                            <div className={styles[`post__item-totalvotes`]}><FontAwesomeIcon icon={faThumbsUp} />{` ${post.totalVotes}`}</div>
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
