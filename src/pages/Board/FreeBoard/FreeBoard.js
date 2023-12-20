import styles from "./FreeBoard.module.css"
import { useState,useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import RenderPost from "../components/RenderPost/RenderPost";

const FreeBoard = () => {

    const [freePosts, setFreePosts] = useState(null);

    useEffect(()=>{
        axios.get("/api/post/free").then(resp => {
            setFreePosts(resp.data);
        }).catch(error => {
            console.error("error : " + error);
        })

    },[])

    if(freePosts === null){
        return(
            <LoadingSpinner></LoadingSpinner>
        )
    }

    return(
        <div className={styles.board}>
            <RenderPost posts={freePosts} title={"자유게시판"}></RenderPost>
        </div>
    );

}

export default FreeBoard;