import React, { useState, useEffect } from "react";
import styles from "./RenderNewVideo.module.css";
import OttCard from "../OttCard/OttCard";
import VideoModal from "../VideoModal/VideoModal";
import { Link } from "react-router-dom";

const RenderNewVideo = ({ newVideoInfo }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [modalSize, setModalSize] = useState({ width: 700, height: 600 });

    const handleCardClick = (video) => {
        setSelectedVideo(video); // 선택된 비디오 정보를 상태에 저장
        setIsModalOpen(true); // 모달 열기
    };


    useEffect(() => {
        function handleResize() {
            const width = window.innerWidth;
            if (width < 600) {
                setModalSize({ width: width - 40, height: 680 });
            } else if (width < 1024) {
                setModalSize({ width: 600, height: 660 });
            } else {
                setModalSize({ width: 700, height: 640 });
            }
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className={styles.render}>
            <p className={styles.board__title}>신작소개</p>
            <div className={styles.ott__container}>
                {newVideoInfo.map((video, index) => (
                    <OttCard
                        key={index}
                        ott={video.ott}
                        thumbnail={video.thumbnail}
                        title={video.title}
                        onClick={() => handleCardClick(video)} // 클릭 이벤트 핸들러에 비디오 정보 전달
                    />
                ))}
            </div>
            <VideoModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="video modal"
                width={modalSize.width}
                height={modalSize.height}
                video={selectedVideo}
            />
            <div className={styles.board__buttonContainer}>
                <Link to={"/board/intro"}>
                    <button className={styles.board__button}>
                        신작소개 가기
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default RenderNewVideo;
