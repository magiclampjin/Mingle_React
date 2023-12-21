import styles from "./Post.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../../App";
import Reply from "../components/Reply/Reply";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faEye, faClock } from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import ReadOnlyQuill from "../../../components/QuillEditor/ReadOnlyQuill";
import { useNavigate } from "react-router-dom";
import { timeFormatter } from "../../../components/TimeFormatter/TimeFormatter";

const Post = () => {

    const { postId } = useParams();
    const { loginId, loginRole } = useContext(LoginContext);
    const [post, setPost] = useState(null);
    // 좋아요와 싫어요 상태
    const [vote, setVote] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    // 좋아요 클릭 핸들러
    const handleLike = () => {
        setVote(vote + 1);
        // 서버에 업데이트 요청 보낼 예정... 
    };

    // 싫어요 클릭 핸들러
    const handleDislike = () => {
        setVote(vote - 1);
        // 서버에 업데이트 요청 보낼 예정
    };

    const handleDelete = () => {
        const userResponse = window.confirm("정말 게시글을 삭제하시겠습니까?");
        if (userResponse) {
            axios.delete(`/api/post/${postId}`).then(resp => {
                navigate("/board");
            }).catch(error => {
                alert("게시글 삭제에 실패했습니다.");
                console.error("error : " + error);
            })
        } else {
            return;
        }
    }

    const handleUpdate = () => {

    }



    useEffect(() => {
        setIsLoading(true);
        axios.get(`/api/post/${postId}`).then(resp => {
            console.log(resp.data);
            setPost(resp.data); // 데이터를 post 상태에 저장
            setIsLoading(false);
        }).catch(error => {
            console.error("error", error);
            setIsLoading(false);
        });

    }, [postId])

    let voteClass = '';
    if (vote > 0) {
        voteClass = styles.votePositive;
    } else if (vote < 0) {
        voteClass = styles.voteNegative;
    }

    if (isLoading) {
        return (
            <div>
                <LoadingSpinner></LoadingSpinner>
            </div>

        );

    }

    return (

        <div className={styles.board}>
            {post && (
                <div className={styles.post__container}>
                    <h1 className={styles.post__title}>{post.title}</h1>
                    <hr />
                    <div className={styles.post__header}>
                        <p className={styles.post__author}>작성자 : {post.member.nickname}</p>
                    </div>
                    <hr />
                    <div className={styles.infoDiv}>
                        <FontAwesomeIcon icon={faClock} className={styles.infoIcon} />
                        <span className={styles.infoText}>{`등록시간 : ${timeFormatter(post.writeDate)}`}</span> &nbsp;
                        <FontAwesomeIcon icon={faEye} className={styles.infoIcon} />
                        <span className={styles.infoText}>{`조회수 : ${post.viewCount}`}</span>
                    </div>
                    <div className={styles.post__content}>
                        <ReadOnlyQuill content={post.content}></ReadOnlyQuill>
                    </div>
                    {/* 좋아요와 싫어요 버튼 */}
                    <div className={styles.reactionButtons}>
                        <button onClick={handleLike} className={styles.likeButton}>
                            <FontAwesomeIcon icon={faThumbsUp} /> 좋아요
                        </button>
                        <div className={`${styles.voteCount} ${voteClass}`}>
                            {vote}
                        </div>
                        <button onClick={handleDislike} className={styles.dislikeButton}>
                            <FontAwesomeIcon icon={faThumbsDown} /> 싫어요
                        </button>
                    </div>
                    <div className={styles.post__replies}>
                        <Reply replies={post.replies} postId={postId} />
                    </div>
                </div>

            )}

            {
                post && (post.member.id === loginId || loginRole === "ROLE_ADMIN") && (
                    <div className={styles.buttonDiv}>
                        <button onClick={handleDelete} className={styles.deleteButton}>
                            게시글 삭제하기
                        </button>
                        <button onClick={handleUpdate} className={styles.updateButton}>
                            게시글 수정하기
                        </button>
                    </div>
                )
            }



        </div>
    );
};

export default Post;