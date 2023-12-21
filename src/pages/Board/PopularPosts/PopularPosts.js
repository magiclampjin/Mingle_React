import { useEffect, useState } from "react";
import styles from "./PopularPosts.module.css";
import axios from "axios";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import RenderPost from "../components/RenderPost/RenderPost";


const PopularPosts = () => {

    const [popularPosts, setPopularPosts] = useState(null);

    useEffect(()=>{
        axios.get("/api/post/popular").then(resp => {
            setPopularPosts(resp.data);
        }).catch(error => {
            console.error("error : " + error);
        })

    },[])

    if(popularPosts === null){
        return(
            <LoadingSpinner></LoadingSpinner>
        )
    }

    return(
        <div className={styles.board}>
            <RenderPost posts={popularPosts} title={"인기글"}></RenderPost>
        </div>
    );
}

export default PopularPosts;