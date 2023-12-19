import Modal from "react-modal";
import styles from "./VideoModal.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

Modal.setAppElement("#root");

const VideoModal = ({ isOpen, onRequestClose, contentLabel, width, height, video }) => {
    // 유튜브 비디오 URL에서 비디오 ID 추출
    const getYouTubeVideoId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);

        if (match && match[2].length === 11) {
            return match[2];
        } else {
            return null;
        }
    };

    const videoId = video ? getYouTubeVideoId(video.url) : null;
    const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}`;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel={contentLabel}
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: 10
                },
                content: {
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    width: width + "px",
                    height: height + "px",
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '20px',
                    zIndex: 10
                },
            }}
        >
            {video && (
                <div className={styles.modal__main}>
                    <h5 className={styles.modal__title}>{video.title}</h5>
                    <hr />
                    <iframe
                        width="100%"
                        height="350"
                        src={youtubeEmbedUrl}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                    <hr />
                    <div className={styles.modal__script}>
                        <div className={styles.modal__info}>
                            <span><FontAwesomeIcon icon={faEye} /> 조회수: {video.viewCount.toLocaleString()}회</span>
                            <span><FontAwesomeIcon icon={faThumbsUp} /> : {video.likeCount.toLocaleString()}</span>
                        </div>
                        <p className={styles.modal__description}>{video.description}</p>
                    </div>
                     
                </div>
            )}
        </Modal>
    );
};


export default VideoModal;
