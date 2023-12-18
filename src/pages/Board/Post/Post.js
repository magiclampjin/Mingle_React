import styles from "./Post.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../../App";

const Post = () => {
    const { postId } = useParams();
    const { loginId } = useContext(LoginContext);
    const [post, setPost] = useState(null);

    useEffect(() => {
        axios.get(`/api/post/${postId}`)
            .then(resp => {
                setPost(resp.data);
            })
            .catch(error => {
                console.error("error", error);
            });
    }, [postId]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.board}>
            <div className={styles.postHeader}>
                <h1 className={styles.postTitle}>{post.title}</h1>
                <div className={styles.postInfo}>
                    <span>{post.author}</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
            <div className={styles.postContent}>
                <p>{post.content}</p>
            </div>
            {/* 추가적인 포스트 내용이나 기능들을 여기에 구현 */}
        </div>
    );
};

export default Post;
