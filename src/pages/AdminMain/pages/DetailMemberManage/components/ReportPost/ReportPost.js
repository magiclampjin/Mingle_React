import parentStyle from "../../../../AdminMain.module.css";
import style from "../../DetailMemberManage.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ReportPost = () => {

    const [report, setReport] = useState([{}]);

    useEffect(() => {
        axios.get("/api/admin/reportPostList").then(resp => {
            setReport(resp.data);
        });
    }, []);

    return (
        <>
        <div className={parentStyle.box}>
            <div className={parentStyle.componentTitle}>게시물 신고</div>
            <div className={style.componentBox}>
                {report.map((e, i) => {
                    return(
                        <Link to="/admin/ReportReadForm" state={{id : e.id, category: "게시글"}}>
                            <div key={e.id} className={style.componentLine}>
                                <div className={parentStyle.componentItem}>{e.id}</div>
                                <div className={parentStyle.componentItem}>{e.memberReporterId}</div>
                                <div className={parentStyle.componentItem}>{e.content}</div>
                                <div className={parentStyle.componentItem}>{e.reportDate ? new Date(e.reportDate).toLocaleString('en-US', { timeZone: 'Asia/Seoul' }) : null}</div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
        </>
    );
}

export default ReportPost;