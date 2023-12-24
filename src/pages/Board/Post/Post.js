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
        axios.post(`/api/post/${postId}/like`, null, {
            params: { memberId: loginId }
        })
            .then(response => {
                if (response.data !== -1) {
                    setVote(response.data); // 서버에서 반환한 총 추천 수로 업데이트
                } else {
                    
                }
            })
            .catch(error => {
                alert("해당 게시글에 이미 투표를 완료하셨습니다.");
            });
    };

    // 싫어요 클릭 핸들러
    const handleDislike = () => {
        axios.post(`/api/post/${postId}/dislike`, null, {
            params: { memberId: loginId }
        })
            .then(response => {
                if (response.data !== -1) {
                    setVote(response.data); // 서버에서 반환한 총 추천 수로 업데이트
                } else {
                    alert("해당 게시글에 이미 투표를 완료하셨습니다.")
                }
            })
            .catch(error => {
                alert("해당 게시글에 이미 투표를 완료하셨습니다.");
            });
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
        alert("관련모달 작업 중...")
    }

    useEffect(() => {
        setIsLoading(true);

        const viewedPosts = sessionStorage.getItem('viewedPosts') ? JSON.parse(sessionStorage.getItem('viewedPosts')) : [];

        const fetchPostData = axios.get(`/api/post/${postId}`);
        const fetchVoteCount = axios.get(`/api/post/likes/${postId}`);

        Promise.all([fetchPostData, fetchVoteCount]).then(responses => {
            const [postDataResponse, voteCountResponse] = responses;

            console.log(voteCountResponse.data);

            setPost(postDataResponse.data);
            setVote(voteCountResponse.data);

            if (!viewedPosts.includes(postId)) {
                axios.put(`/api/post/updateViewCount/${postId}`).then(resp => {
                    console.log("조회수 증가 완료");
                    viewedPosts.push(postId);
                    sessionStorage.setItem('viewedPosts', JSON.stringify(viewedPosts));
                }).catch(error => {
                    console.error("error", error);
                });
            }

        }).catch(error => {
            console.error("error", error);
        }).finally(() => {
            setIsLoading(false);
        });

    }, [postId, loginId]);


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