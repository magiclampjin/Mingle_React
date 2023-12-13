import styles from "./RenderTable.module.css"

const RenderTable = ({ posts, title }) => {

    return (
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
                {title === "공지게시판" ? <></> :

                    <button className={styles.board__button}>
                        게시글 작성하기
                    </button>
                }
                <button className={styles.board__button}>
                    {title}
                </button>

            </div>
        </>
    );

}

export default RenderTable