import { useContext, useEffect, useState } from 'react';
import styles from './BoardMain.module.css'
import axios from 'axios';
import RenderTable from '../components/RenderTable/RenderTable';
import RenderNewVideo from '../components/RenderNewVideo/RenderNewVideo';

const BoardMain = () => {

    // 상태로 게시글 목록을 저장
    const [freePosts, setFreePosts] = useState([]);
    const [noticePosts, setNoticePosts] = useState([]);
    const [newVideoInfo, setNewVideoInfo] = useState([]);

    // 컴포넌트가 마운트될 때 데이터 로드
    useEffect(() => {
        axios.get("/api/post/freeTop10").then(resp => {
           console.log(resp.data);
           setFreePosts(resp.data);
        }).catch(error => {

        });

        axios.get("/api/post/noticeTop10").then(resp => {
            console.log(resp.data);
            setNoticePosts(resp.data);
        }).catch(error => {

        });

        axios.get("/api/external/youtube/latestvideo").then(resp => {
            console.log(resp.data);
            setNewVideoInfo(resp.data);
        })

    }, []);


    return (
        <div className={styles.board}>
            <div className={styles.board__layer}>
                <RenderTable posts={[]} title={`인기글`} />
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
                <RenderTable posts={[]} title={"리뷰"} />
            </div>
            <hr />
            <div className={styles.board__layer}>
                <RenderNewVideo newVideoInfo={newVideoInfo}/>
            </div>
        </div>
    );
};

export default BoardMain;
