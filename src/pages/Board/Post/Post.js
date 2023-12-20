import styles from "./Post.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../../App";
import Reply from "../components/Reply/Reply";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import ReadOnlyQuill from "../../../components/QuillEditor/ReadOnlyQuill";

const Post = () => {

    const { postId } = useParams();
    const { loginId } = useContext(LoginContext);
    const [post, setPost] = useState(null);
    console.log(postId)
    // 좋아요와 싫어요 상태
    const [vote, setVote] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

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
                    <div className={styles.post__header}>
                        <p className={styles.post__author}>{post.member.nickname}</p>
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

        </div>
    );
};

export default Post;