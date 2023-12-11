import style from '../../../../../../../AdminMain/AdminMain.module.css'
import { useEffect, useState } from "react";
import axios from "axios";

const ReportPartyReplyBox = () => {

    const [report, setReport] = useState([{}]);

    useEffect(() => {
        axios.get("/api/admin/reportPartyReplyList").then(resp => {
            console.log(resp.data);
            setReport(resp.data);
        });
    }, []);

    return (
        <div className={style.box}>
            <div className={style.componentTitle}>파티 댓글 신고</div>
            <div className={style.componentBox}>
                <div className={style.componentSeeMore}>
                    <div></div>
                    <div className={style.componentSeeMoreBtn}>

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

export default ReportPartyReplyBox;