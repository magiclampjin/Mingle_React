import BoardCategories from "../components/BoardCategory/BoardCategories";
import styles from "./Review.module.css"

const Review = () => {

    return(
        <div className={styles.board}> 
            <BoardCategories></BoardCategories>
            리뷰작성 중입니다.....
        </div>
    );
}

export default Review;
