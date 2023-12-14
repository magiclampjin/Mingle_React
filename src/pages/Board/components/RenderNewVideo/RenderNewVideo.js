import styles from "./RenderNewVideo.module.css";
import OttCard from "../OttCard/OttCard";
import { useState } from "react";
import { useEffect } from "react";

const RenderNewVideo = ({newVideoInfo}) => {

    useEffect(()=> {

    },[])

    return (
        <div className={styles.render}>
            <p className={styles.board__title}>신작소개</p>
            <div className={styles.ott__container}>
                {newVideoInfo.map((service, index) => (
                    <OttCard key={index} ott={service.ott} thumbnail={service.thumbnail} title={service.title} />
                ))}
            </div>
            <div className={styles.board__buttonContainer}>
                <button className={styles.board__button}>
                    신작소개 가기
                </button>
            </div>

        </div>
    )
}

export default RenderNewVideo;