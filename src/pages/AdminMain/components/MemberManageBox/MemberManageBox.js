import style from "../../AdminMain.module.css"
import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";

import WhiteRoundBtn from '../../../../components/WhiteRoundBtn/WhiteRoundBtn';

const MemberManageBox = () => {

    const [report, setReport] = useState([{}]);

    useEffect(() => {
        axios.get("/api/admin/reportList").then(resp => {
            setReport(resp.data);
        });
    }, []);

    return (
        <div className={style.box}>
            <div className={style.componentTitle}>신고된 회원 / 불량 회원 박스</div>
            <div className={style.componentBox}>
                <div className={style.componentSeeMore}>
                    <div></div>
                    <div className={style.componentSeeMoreBtn}>
                    <Link to="DetailMemberManage">
                        <WhiteRoundBtn title={"더보기"} activation={true}></WhiteRoundBtn>
                    </Link>
                    </div>
                </div>
                {report.map((e, i) => {
                    return(
                        <div className={style.componentLine}>
                            <div className={style.componentItem}>{e.id}</div>
                            <div className={style.componentItem}>{e.memberReporterId}</div>
                            <div className={style.componentItem}>{e.content}</div>
                            <div className={style.componentItem}>{e.reportDate ? new Date(e.reportDate).toLocaleString('en-US', { timeZone: 'Asia/Seoul' }) : null}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MemberManageBox;