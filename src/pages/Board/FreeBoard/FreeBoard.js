import BoardCategories from "../components/BoardCategory/BoardCategories";
import styles from "./FreeBoard.module.css"

const FreeBoard = () => {

    return(
        <div className={styles.board}> 
            <BoardCategories></BoardCategories>
            자유게시판 작성 중.....
        </div>
    );

}

export default FreeBoard;