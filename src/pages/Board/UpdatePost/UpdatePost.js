import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./UpdatePost.module.css";
import { LoginContext } from "../../../App";
import QuillEditor from "../../../components/QuillEditor/QuillEditor";
import DOMPurify from "dompurify";

const UpdatePost = () => {

    const { postId } = useParams(); // URL에서 postId 추출
    const { loginId, loginNick, loginRole } = useContext(LoginContext);
    const navigate = useNavigate();

    const [titleLength, setTitleLength] = useState(0);
    const [contentLength, setContentLength] = useState(0);
    const [removeFileList, setRemoveFileList] = useState([]);
    const [submitData, setSubmitData] = useState({
        id: "",
        title: "",
        content: "",
        writeDate: "",
        viewCount: 0,
        isNotice: false,
        isFix: false,
        reviewGrade: 0,
        memberId: "",
        files: []
    });

    // 게시글 정보 로드
    useEffect(() => {
        axios.get(`/api/post/${postId}`)
            .then(response => {
                const postData = response.data;
                setTitleLength(postData.title.length);
                setContentLength(getTextLength(postData.content).length);
                setSubmitData({
                    ...submitData,
                    id: postData.id,
                    title: postData.title,
                    content: postData.content,
                    writeDate: postData.writeDate,
                    viewCount: postData.viewCount,
                    isNotice: postData.isNotice,
                    isFix: postData.isFix,
                    reviewGrade: postData.reviewGrade,
                    memberId: postData.member.id,
                    files: postData.files
                });

            })
            .catch(error => console.error("Error loading post data:", error));
    }, [postId]);

    useEffect(() => {
        if (loginId && submitData.memberId !== loginId) {
            setSubmitData({ ...submitData, memberId: loginId });
        }
    }, [loginId, submitData.memberId]);



    const handleTitleChange = (event) => {
        const title = event.target.value.replace(/[<>]/g, '');
        const cleanTitle = DOMPurify.sanitize(title);
        setTitleLength(cleanTitle.length);
        setSubmitData({ ...submitData, title: cleanTitle });
    };

    const handleContentChange = (content) => {
        const cleanContent = DOMPurify.sanitize(content); // 새니타이징 적용
        const textLength = getTextLength(cleanContent); // HTML 태그 제거 후 길이 계산
        setContentLength(textLength.length); // 내용 길이 업데이트
        setSubmitData({ ...submitData, content: cleanContent });
    };

    // HTML 태그를 제거하고 순수 텍스트 길이를 계산하는 함수
    const getTextLength = (htmlContent) => {
        const doc = new DOMParser().parseFromString(htmlContent, 'text/html');
        return doc.body.textContent || doc.body.innerText || "";
    };

    // 파일 상태를 추가
    const [fileNames, setFileNames] = useState([]);

    // 파일 추가 핸들러
    const handleFileChange = (event) => {
        const newFiles = event.target.files;
        if (newFiles) {
            const totalFileCount = submitData.files.length + newFiles.length;

            if (totalFileCount > 5) {
                alert("파일은 최대 5개까지만 업로드 가능합니다.");
                return;
            }

            const updatedFilesArray = Array.from(newFiles);
            const updatedFileNamesArray = updatedFilesArray.map(file => file.name);

            // 파일과 파일 이름 상태 업데이트
            setSubmitData(prev => ({ ...prev, files: [...prev.files, ...newFiles] }));
            setFileNames([...fileNames, ...updatedFileNamesArray]);
        }
    };

    // 파일 삭제 핸들러
    const handleRemoveFile = (file, fileIndex) => {
        // 파일 목록에서 선택된 파일을 제거
        const updatedFiles = submitData.files.filter((_, index) => index !== fileIndex);
        const updatedFileNames = fileNames.filter((_, index) => index !== fileIndex);

        // 파일 상태 업데이트
        setSubmitData({ ...submitData, files: updatedFiles });
        setFileNames(updatedFileNames);

        setRemoveFileList(prev => [...removeFileList, file.sysName])


        // 파일 입력 필드 초기화
        document.getElementById('file').value = '';
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

    // 바이트 수 계산 함수(제목 및 게시글의 바이트 수를 계산하기 위해 사용)
    // 제목의 경우 300바이트
    // 게시글의 경우 10000바이트까지 허용
    const calculateByteSize = (str) => {
        let size = 0;
        for (let i = 0; i < str.length; i++) {
            const charCode = str.charCodeAt(i);
            if (charCode < 0x80) {
                size += 1; // 1바이트
            } else if (charCode < 0x800) {
                size += 2; // 2바이트
            } else {
                size += 3; // 3바이트
            }
        }
        return size;
    };


    const handleUpdate = () => {

        const formData = new FormData();
        formData.append("id", submitData.id);
        formData.append("memberId", submitData.memberId);
        formData.append("title", submitData.title);
        formData.append("content", submitData.content)
        formData.append("writeDate", submitData.writeDate);
        formData.append("isNotice", submitData.isNotice);
        formData.append("isFix", submitData.isFix);
        formData.append("viewCount", submitData.viewCount ? submitData.viewCount.toString() : "0"); // Long 타입으로 변환
        formData.append("reviewGrade", submitData.reviewGrade ? submitData.reviewGrade.toString() : "0"); // Long 타입으로 변환


        const titleByteSize = calculateByteSize(submitData.title);
        const contentByteSize = calculateByteSize(submitData.content);

        submitData.files.forEach((file) => {
            formData.append('files', file);
        });

        if (titleLength > 90 || titleByteSize > 300) {
            alert("제목이 허용 글자 수나 바이트 수를 초과하였습니다. 확인 부탁드립니다.");
            return;
        }

        if (contentLength > 3000 || contentByteSize > 10000) {
            alert("게시글이 허용 글자 수나 바이트 수를 초과하였습니다. 확인 부탁드립니다.");
            return;
        }

        if (submitData.files.length > 5) {
            alert("게시글에는 최대 5개의 파일만 등록할 수 있습니다. 확인 부탁드립니다.");
            return;
        }

        axios.put(`/api/post/${submitData.id}`, formData)
            .then(response => {
                navigate(`/board/post/${submitData.id}`); // 수정된 게시글로 이동
            })
            .catch(error => console.error("Error updating post:", error));

        if (removeFileList) {
            axios.delete(`/api/post/file/delete`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(removeFileList)
            })
            .then(response => {
                // 파일 삭제 성공 처리
            })
            .catch(error => {
                // 에러 처리
            });
        }

    }


    const handleCancel = () => {
        const userResponse = window.confirm("정말 게시글 수정을 취소하시겠습니까? 모든 내용은 전부 지워집니다.");

        if (userResponse) {
            // 사용자가 '예'를 선택한 경우
            setRemoveFileList([]);
            navigate(`/board/post/${submitData.id}`);
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


    return (
        <div className={styles.board}>
            <div className={styles.post__container}>
                <h2 className={styles.post__title}>게시물 수정</h2>
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
                <div>제목에 최대 입력 가능한 글자 수 : {titleLength}/90</div> {/* 제목 글자 수 표시 */}
                <hr />
                <div className={styles.post__content}>
                    <QuillEditor
                        value={submitData.content}
                        onChange={handleContentChange}
                    />
                    <hr />
                    <div>게시글에 최대 입력 가능한 글자 수 : {contentLength}/3000</div> {/* 내용 글자 수 표시 */}
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
                <div>{`첨부된 파일 수: ${submitData.files.length}/5`}</div> {/* 현재 파일 수 표시 */}
                <div className={styles.post__fileDiv}>
                    <div className={styles.fileContainer}>
                        {submitData.files.length > 0 ? (
                            submitData.files.map((file, index) => (
                                <div key={index} className={styles.fileItem}>
                                    <span className={styles.fileName}>{file.oriName}</span>
                                    <button
                                        className={styles.removeFileButton}
                                        onClick={(event) => {
                                            event.stopPropagation(); // 이벤트 버블링 방지
                                            handleRemoveFile(file, index);
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
                        onClick={handleUpdate}
                        disabled={!submitData.title.trim() || !submitData.content.trim()}
                    >
                        게시물 수정
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

export default UpdatePost;
