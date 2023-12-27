import { useContext, useEffect, useState } from 'react';
import styles from './BoardMain.module.css'
import axios from 'axios';
import RenderTable from '../components/RenderTable/RenderTable';
import RenderNewVideo from '../components/RenderNewVideo/RenderNewVideo';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import { LoginContext } from '../../../App';

const BoardMain = () => {
    const {loginId} = useContext(LoginContext);

    // 초기 상태를 null로 설정하여 로드 전 상태 표시
    const [popularPosts, setPopularPosts] = useState(null);
    const [freePosts, setFreePosts] = useState(null);
    const [noticePosts, setNoticePosts] = useState(null);
    const [newVideoInfo, setNewVideoInfo] = useState(null);

    // 컴포넌트가 마운트될 때 데이터 로드
    useEffect(() => {

        axios.get("/api/post/popularTop10").then(resp => {
            setPopularPosts(resp.data);
        }).catch(error => {
            console.error("error reporting! : " + error);
        });
       
        axios.get("/api/post/freeTop10").then(resp => {
            setFreePosts(resp.data);
        }).catch(error => {
            console.error("error reporting! : " + error);
        });

        axios.get("/api/post/noticeTop10").then(resp => {
            setNoticePosts(resp.data);
        }).catch(error => {
            console.error("error reporting! : " + error);
        });

        axios.get("/api/external/youtube/latestvideo").then(resp => {
            setNewVideoInfo(resp.data);
        }).catch(error => {
            console.error("error reporting! : " + error);
        })
    }, []);

    // 모든 상태가 로드될 때까지 로딩 스피너 표시
    if (freePosts === null || noticePosts === null || newVideoInfo === null) {
        return <LoadingSpinner />;
    }


    return (
        <div className={styles.board}>
            <div className={styles.board__layer}>
                <RenderTable posts={popularPosts} title={`인기글`} />
            </div>
            <hr />
            <div className={styles.board__layer}>
                <RenderTable posts={freePosts} title={`자유게시판`} />
            </div>
            <hr />
            <div className={styles.board__layer}>
                <RenderTable posts={noticePosts} title={"공지게시판"} />
            </div>
            <hr />
            <div className={styles.board__layer}>
                <RenderNewVideo newVideoInfo={newVideoInfo} />
            </div>
        </div>
    );
};

export default BoardMain;
