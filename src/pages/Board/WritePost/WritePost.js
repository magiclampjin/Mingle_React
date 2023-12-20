import React, { useState, useContext, useEffect } from "react";
import styles from "./WritePost.module.css";
import { LoginContext } from "../../../App";
import axios from "axios";
import QuillEditor from "../../../components/QuillEditor/QuillEditor";
import { useNavigate } from 'react-router-dom';

const WritePost = () => {

    const { loginId, loginNick, loginRole } = useContext(LoginContext);
    const navigate = useNavigate();

    const [submitData, setSubmitData] = useState({
        id: "",
        title: "",
        content: "",
        writeDate: new Date().toISOString(),
        viewCount: 0,
        isNotice: false,
        isFix: false,
        reviewGrade: 0,
        memberId: "",
        files: []
    })

    useEffect(() => {
        if (loginId) {
            setSubmitData({ ...submitData, memberId: loginId });
        }
    }, [loginId]);
    

    const handleTitleChange = (event) => {
        setSubmitData({ ...submitData, title: event.target.value });
    };

    const handleContentChange = (content) => {
        setSubmitData({ ...submitData, content: content });
    };

    // 파일 상태를 추가
    const [fileNames, setFileNames] = useState([]);

    // 파일 추가 핸들러
    const handleFileChange = (event) => {
        
        const newFiles = event.target.files;
        if (newFiles) {
            const updatedFilesArray = Array.from(newFiles);
            const updatedFileNamesArray = updatedFilesArray.map(file => file.name);

            // 파일과 파일 이름 상태 업데이트
            setSubmitData(prev=>({ ...prev, files: [...newFiles] }));
            setFileNames([...fileNames, ...updatedFileNamesArray]);
        }
    };

    // 파일 삭제 핸들러
    const handleRemoveFile = (fileIndex) => {
        // 파일 목록에서 선택된 파일을 제거
        const updatedFiles = submitData.files.filter((_, index) => index !== fileIndex);
        const updatedFileNames = fileNames.filter((_, index) => index !== fileIndex);

        // 파일 상태 업데이트
        setSubmitData({ ...submitData, files: updatedFiles });
        setFileNames(updatedFileNames);
    };
    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        const isNotice = selectedCategory === "공지게시판"; // 공지게시판일 때 true, 아니면 false

        setSubmitData({
            ...submitData,
            isNotice: isNotice
        });
        setCategory(selectedCategory);
    };

    const handleInsert = () => {

        const formData = new FormData();
        formData.append("memberId", submitData.memberId); 
        formData.append("title", submitData.title);
        formData.append("content", submitData.content)
        formData.append("writeDate", submitData.writeDate);
        formData.append("isNotice", submitData.isNotice);
        formData.append("isFix", submitData.isFix);
        formData.append("viewCount", submitData.viewCount ? submitData.viewCount.toString() : "0"); // Long 타입으로 변환
        formData.append("reviewGrade", submitData.reviewGrade ? submitData.reviewGrade.toString() : "0"); // Long 타입으로 변환

        submitData.files.forEach((file) => {
            formData.append('files', file);
          });

        axios.post("/api/post", formData).then(resp => {
            console.log(resp);
            navigate("/board");
        }).catch(error => {
            console.log("error : " + error);
        })
    }


    const handleCancel = () => {
        const userResponse = window.confirm("정말 게시글 작성을 취소하시겠습니까? 모든 내용은 전부 지워집니다.");


        if (userResponse) {
            // 사용자가 '예'를 선택한 경우
            navigate("/board");
        } else {
            // 사용자가 '아니오'를 선택한 경우
            return;
        }
    };

    const [category, setCategory] = useState("자유게시판");


    // 파일의 입력 및 출력상태를 추적
    useEffect(() => {
        const fileNamesList = submitData.files.map(file => file.name);
        setFileNames(fileNamesList);
    }, [submitData.files]);

    useEffect(() => {
        console.log(submitData.files);
    }, [submitData.files]);
      

    return (
        <div className={styles.board}>
            <div className={styles.post__container}>
                <h2 className={styles.post__title}>게시물 등록</h2>
                <hr />
                {loginRole === "ROLE_ADMIN" ?
                    <div className={styles.post__category}>
                        게시판 :&nbsp;&nbsp;
                        <select
                            value={category}
                            onChange={handleCategoryChange}
                        >
                            <option value="자유게시판">자유게시판</option>
                            <option value="공지게시판">공지게시판</option>
                        </select>
                    </div> :
                    <div className={styles.post__category}>
                        게시판 : 자유게시판
                    </div>
                }
                <hr />
                <div className={styles.post__header}>
                    <input
                        type="text"
                        value={submitData.title}
                        onChange={handleTitleChange}
                        placeholder="제목을 입력하세요"
                        className={styles.post__titleInput}
                    />
                    <div className={styles.post__author}>{`게시자 : ${loginNick}`}</div>
                </div>
                <hr />
                <div className={styles.post__content}>
                    <QuillEditor
                        value={submitData.content}
                        onChange={handleContentChange}
                    />
                </div>
                <hr />
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
                <div className={styles.post__fileDiv}>
                    <div className={styles.fileContainer}>
                        {submitData.files.length > 0 ? (
                            submitData.files.map((file, index) => (
                                <div key={index} className={styles.fileItem}>
                                    <span className={styles.fileName}>{file.name}</span>
                                    <button
                                        className={styles.removeFileButton}
                                        onClick={(event) => {
                                            event.stopPropagation(); // 이벤트 버블링 방지
                                            handleRemoveFile(index);
                                        }}
                                        aria-label="파일 삭제"
                                    >
                                        X
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className={styles.emptyFileMessage}>파일이 비어있습니다</div>
                        )}
                    </div>
                </div>
                <hr />
                <div className={styles.post__buttons}>
                    <button
                        className={
                            submitData.title.trim() && submitData.content.trim()
                                ? styles.post__button
                                : styles.post__buttonDisable
                        }
                        onClick={handleInsert}
                        disabled={!submitData.title.trim() || !submitData.content.trim()}
                    >
                        게시물 등록
                    </button>
                    <button
                        className={styles.post__button}
                        onClick={handleCancel}
                    >
                        취소
                    </button>
                </div>

            </div>

        </div>

    );
}

export default WritePost;
