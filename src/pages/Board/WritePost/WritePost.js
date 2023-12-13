import React, { useState } from "react";
import styles from "./WritePost.module.css";

const WritePost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [files, setFiles] = useState([]);
    const [category, setCategory] = useState("자유게시판");

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleFileChange = (event) => {
        setFiles(event.target.files);
    };

    return (
        <div className={styles.board}> 
            <div className={styles.post__container}>
            <h1 className={styles.post__title}>게시물 등록</h1>
            <div className={styles.post__header}>
                <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="제목을 입력하세요"
                    className={styles.post__titleInput} 
                />
                <p className={styles.post__author}>author</p>
            </div>

            <div className={styles.post__content}>
                <textarea
                    className={styles.post__content}
                    value={content}
                    onChange={handleContentChange}
                />
            </div>
            <div className={styles.post__file}>
                <label htmlFor="file" className={styles[`post__file-label`]}>
                    첨부 파일 선택
                </label>
                <input
                    type="file"
                    id="file"
                    className={styles[`post__file-input`]}
                    onChange={handleFileChange}
                    multiple
                />
            </div>
            <div className={styles.post__buttons}>
                <button
                    className={styles.post__button}
                    onClick={() => {
                        // 게시물 등록
                    }}
                >
                    게시물 등록
                </button>
                <button
                    className={styles.post__button}
                    onClick={() => {
                        // 게시글 목록으로 이동
                    }}
                >
                    취소
                </button>
            </div>
            <div className={styles.post__category}>
                <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                >
                    <option value="자유게시판">자유게시판</option>
                    <option value="공지게시판">공지게시판</option>
                    <option value="리뷰게시판">리뷰게시판</option>
                </select>
            </div>
        </div>

        </div>
        
    );
}

export default WritePost;
