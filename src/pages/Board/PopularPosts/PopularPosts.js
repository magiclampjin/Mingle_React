import styles from "./PopularPosts.module.css";
import BoardCategories from "../components/BoardCategory/BoardCategories";


const PopularPosts = () => {

    return(
        <div className={styles.board}>
            <BoardCategories></BoardCategories>
            인기글 게시판 작성 중입니다. <br />
            좋아요, 싫어요 기능 구상중
        </div>
    );
}

export default PopularPosts;