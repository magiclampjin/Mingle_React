
import style from "./ReportReply.module.css"
import { useEffect, useState } from "react";
import axios from "axios";

const ReportReply = () => {

    const [report, setReport] = useState([{}]);

    useEffect(() => {
        axios.get("/api/admin/reportReplyList").then(resp => {
            console.log(resp.data);
            setReport(resp.data);
        });
    }, []);

    return (
        <>
        <div className={style.body}>
            <div className={style.reportReplyTitle}>댓글 신고</div>
            <div className={style.reportReplyBox}>
                {report.map((e, i) => {
                    return(
                        <div key={i} className={style.reportReplyLine}>
                            <div className={style.reportReplyItem}>{e.id}</div>
                            <div className={style.reportReplyItem}>{e.memberReporterId}</div>
                            <div className={style.reportReplyItem}>{e.content}</div>
                            <div className={style.reportReplyItem}>{e.reportDate ? new Date(e.reportDate).toLocaleString('en-US', { timeZone: 'Asia/Seoul' }) : null}</div>
                        </div>
                    );
                })}
            </div>
        </div>
        </>
    );
}

export default ReportReply;