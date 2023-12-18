import styles from "./Post.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState,useEffect, useContext } from "react";
import { LoginContext } from "../../../App";

const Post = () =>{

    const{postId} = useParams();
    const{loginId} = useContext(LoginContext);

    useEffect(()=>{
        axios.get(`/api/post/${postId}`).then(resp => {
            console.log(resp);
        }).catch(error=>{
            console.error("error",error);
        });

    }, [postId])

    

    return(

        <div className={styles.board}>
            작성중....
        </div>
    );
};

export default Post;