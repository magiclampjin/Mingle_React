import BoardCategories from "../components/BoardCategory/BoardCategories";
import styles from "./NoticeBoard.module.css"

const NoticeBoard = () => {

    return(
        <div className={styles.board}> 
            <BoardCategories></BoardCategories>
            공지게시판 작성 중......
        </div>
    );
}

export default NoticeBoard;