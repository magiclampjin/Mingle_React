import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./RenderVideo.module.css";
import OttCard from "../OttCard/OttCard";
import VideoModal from "../VideoModal/VideoModal";
import Pagination from "react-js-pagination";


const RenderVideo = ({ newVideoInfo }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [modalSize, setModalSize] = useState({ width: 700, height: 600 });

    const handleCardClick = (video) => {
        setSelectedVideo(video); // 선택된 비디오 정보를 상태에 저장
        setIsModalOpen(true); // 모달 열기
    };

    

    const [currentPage, setCurrentPage] = useState(1);
    const [videosPerPage] = useState(12); // 한 페이지에 표시할 비디오 수

    const [currentVideos, setCurrentVideos] = useState([]);

    const [selectedOtt, setSelectedOtt] = useState('전체'); // 선택된 OTT 카테고리

    const ottCategories = ['전체', '넷플릭스', '왓챠', '웨이브', '티빙'];



    // OTT 카테고리 변경 핸들러
    const handleOttChange = (ott) => {
        setSelectedOtt(ott);
        setCurrentPage(1); // 카테고리 변경 시 현재 페이지를 1로 초기화
    };

    // 필터링된 비디오 목록
    const [filteredVideos, setFilteredVideos] = useState([]);

    useEffect(() => {
        const filtered = selectedOtt === '전체'
            ? newVideoInfo
            : newVideoInfo.filter(video => video.ott === selectedOtt);
        setFilteredVideos(filtered);
        setCurrentPage(1); // 필터링 후 첫 페이지로 이동
    }, [selectedOtt, newVideoInfo]);
    
    useEffect(() => {
        const indexOfLastVideo = currentPage * videosPerPage;
        const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
        setCurrentVideos(filteredVideos.slice(indexOfFirstVideo, indexOfLastVideo));
    }, [currentPage, videosPerPage, filteredVideos]);
    
    

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
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
            <div className={styles.ott__categories}>
                {ottCategories.map(ott => (
                    <button
                        key={ott}
                        className={`${styles.ott__category} ${selectedOtt === ott ? styles.active : ''}`}
                        onClick={() => handleOttChange(ott)}
                    >
                        {ott}
                    </button>
                ))}
            </div>
            <div className={styles.ott__container}>
                {currentVideos.map((video, index) => (
                    <OttCard
                        key={index}
                        ott={video.ott}
                        thumbnail={video.thumbnail}
                        title={video.title}
                        onClick={() => handleCardClick(video)}
                    />
                ))}
            </div>

            <Pagination
                activePage={currentPage}
                itemsCountPerPage={videosPerPage}
                totalItemsCount={filteredVideos.length} // filteredVideos의 길이 사용
                pageRangeDisplayed={5}
                onChange={handlePageChange}
            />
            <VideoModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="video modal"
                width={modalSize.width}
                height={modalSize.height}
                video={selectedVideo}
            />
        </div>
    );
};

export default RenderVideo;
