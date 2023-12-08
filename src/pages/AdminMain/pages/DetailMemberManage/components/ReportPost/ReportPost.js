
import style from "./ReportPost.module.css"
import { useEffect, useState } from "react";
import axios from "axios";

const ReportPost = () => {

    const [report, setReport] = useState([{}]);

    useEffect(() => {
        axios.get("/api/admin/reportPostList").then(resp => {
            console.log(resp.data);
            setReport(resp.data);
        });
    }, []);

    return (
        <>
        <div className={style.body}>
            <div className={style.reportPostTitle}>게시물 신고</div>
            <div className={style.reportPostBox}>
                {report.map((e, i) => {
                    return(
                        <div key={i} className={style.reportPostLine}>
                            <div className={style.reportPostItem}>{e.id}</div>
                            <div className={style.reportPostItem}>{e.memberReporterId}</div>
                            <div className={style.reportPostItem}>{e.content}</div>
                            <div className={style.reportPostItem}>{e.reportDate ? new Date(e.reportDate).toLocaleString('en-US', { timeZone: 'Asia/Seoul' }) : null}</div>
                        </div>
                    );
                })}
            </div>
        </div>
        </>
    );
}

export default ReportPost;