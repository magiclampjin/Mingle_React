import styles from "./NoticeBoard.module.css"
import { useState,useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import RenderPost from "../components/RenderPost/RenderPost";


const NoticeBoard = () => {

    const [noticePosts, setNoticePosts] = useState(null);

    useEffect(()=>{
        axios.get("/api/post/notice").then(resp => {
            setNoticePosts(resp.data);
        }).catch(error => {
            console.error("error : " + error);
        })

    },[])

    if(noticePosts === null){
        return(
            <LoadingSpinner></LoadingSpinner>
        )
    }

    return(
        <div className={styles.board}>
            <RenderPost posts={noticePosts} title={"공지게시판"}></RenderPost>
        </div>
    );
}

export default NoticeBoard;