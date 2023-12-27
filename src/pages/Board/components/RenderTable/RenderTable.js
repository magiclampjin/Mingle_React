import styles from "./RenderTable.module.css"
import { timeFormatter } from "../../../../components/TimeFormatter/TimeFormatter";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faThumbsUp, faClock } from "@fortawesome/free-solid-svg-icons";

const RenderTable = ({ posts, title }) => {

    const categories = [
        { name: "인기글", path: "/board/popularposts" },
        { name: "자유게시판", path: "/board/freeboard" },
        { name: "공지게시판", path: "/board/noticeboard" },
        { name: "리뷰", path: "/board/review" }
    ];

    const safePosts = Array.isArray(posts) ? posts : [];

    // title에 해당하는 카테고리의 경로를 찾습니다.
    const categoryPath = categories.find(category => category.name === title)?.path;

    return (
        <div className={styles.render}>
            <p className={styles.board__title}>{title}</p>
            <div className={styles.board__container}>
                {safePosts.map((post, index) => (
                    <Link to={`/board/post/${post.id}`} key={index}>
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
            {safePosts.length === 0 && <p className={styles.no__posts}>게시글이 없습니다.</p>}
            <div className={styles.board__buttonContainer}>
                {categoryPath && (
                    <Link to={categoryPath}>
                        <button className={styles.board__button}>
                            {title} 가기
                        </button>
                    </Link>
                )}

            </div>
        </div>
    );
}

export default RenderTable;
