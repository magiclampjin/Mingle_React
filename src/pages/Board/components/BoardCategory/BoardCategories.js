import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "./BoardCategories.module.css";

const BoardCategories = ({setBoardState}) => {

    const categories = [
        { name: "전체", path: "/board" },
        { name: "인기글", path: "/board/PopularPosts" },
        { name: "자유게시판", path: "/board/FreeBoard" },
        { name: "공지게시판", path: "/board/NoticeBoard" },
        { name: "리뷰", path: "/board/ReviewPosts" },
        { name: "신작 소개", path: "/board/IntroPosts" }
    ];

    return (
        <div className={styles.category__bar}>
            {categories.map((category, index) => (
                <Link
                  to={category.path}
                  key={index}
                  className={styles.category__item}
                  onClick={() => setBoardState(category.name)}
                >
                    {category.name}
                </Link>
            ))}
        </div>
    );
}

export default BoardCategories;
