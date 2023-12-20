import style from "../../AdminMain.module.css"
import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";

import WhiteRoundBtn from '../../../../components/WhiteRoundBtn/WhiteRoundBtn';
import LoadingSpinnerMini from '../../../../components/LoadingSpinnerMini/LoadingSpinnerMini';

const NoticeBoardBox = () => {

    const [notice, setNotice] = useState([{}]);
    const [isServiceLoading, setServiceLoading] = useState(false);

    useEffect(() => {
        setServiceLoading(true);

        axios.get(`/api/admin/noticeBoardList`).then(resp => {
            setNotice(resp.data);
            setServiceLoading(false);
        }).catch(() => {
            setServiceLoading(false);
        });
    }, []);

    return (
        <div className={style.box}>
            <div className={style.componentTitle}>공지 게시판</div>
            <div className={style.componentBox}>
            {isServiceLoading ? (
                <LoadingSpinnerMini height={350} />
            ) : (
                <>
                <div className={style.componentSeeMore}>
                    <div></div>
                    <div className={style.componentSeeMoreBtn}>
                    <Link to="DetailNoticeBoard">
                        <WhiteRoundBtn title={"더보기"} activation={true}></WhiteRoundBtn>
                    </Link>
                    </div>
                </div>
                {notice.map((e, i) => {
                    return(
                        <div key={i} className={style.componentLine}>
                            <div className={style.componentItem}>{e.id}</div>
                            <div className={style.componentItem}>{e.title}</div>
                            <div className={style.componentItem}>{e.content}</div>
                            <div className={style.componentItem}>{e.writeDate ? new Date(e.writeDate).toLocaleString('en-US', { timeZone: 'Asia/Seoul' }) : null}</div>
                        </div>
                    );
                })}
                </>
            )}
            </div>
        </div>
    );
}

export default NoticeBoardBox;